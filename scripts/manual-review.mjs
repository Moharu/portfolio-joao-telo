import { chromium } from "@playwright/test";
import { PDFParse } from "pdf-parse";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("requestfailed", (r) =>
  errors.push(r.url() + ": " + r.failure()?.errorText),
);
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
const focused = [];
for (let i = 0; i < 35; i++) {
  await page.keyboard.press("Tab");
  const state = await page.evaluate(() => ({
    text: document.activeElement?.textContent,
    tag: document.activeElement?.tagName,
    outline: getComputedStyle(document.activeElement).outline,
  }));
  focused.push(state);
  if (i === 0) await page.screenshot({ path: "artifacts/keyboard-focus.png" });
}
await page.setViewportSize({ width: 320, height: 800 });
await page.addStyleTag({ content: "html{font-size:200%}" });
await page.screenshot({
  path: "artifacts/text-200-percent.png",
  fullPage: true,
});
const variants = [];
for (const width of [320, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("http://localhost:3000");
  const img = page.locator("#projects img");
  await img.scrollIntoViewIfNeeded();
  await img.evaluate(async (x) => {
    if (!x.complete)
      await new Promise((r) => x.addEventListener("load", r, { once: true }));
  });
  const source = await img.evaluate((x) => x.currentSrc);
  const response = await page.request.get(source);
  variants.push({
    width,
    url: source,
    bytes: (await response.body()).length,
    status: response.status(),
  });
}
const pdf = new PDFParse({
  data: await fs.readFile("public/resume/joao-telo-resume.pdf"),
});
const info = await pdf.getInfo({ parsePageInfo: true });
await pdf.destroy();
await fs.writeFile(
  "artifacts/manual-review.json",
  JSON.stringify(
    { errors, focused, variants, pdfLinks: info.pages.map((x) => x.links) },
    null,
    2,
  ),
);
console.log({ errors, variants, pdfLinks: info.pages.map((x) => x.links) });
await browser.close();
