import { chromium } from "@playwright/test";
import sharp from "sharp";
import fs from "node:fs/promises";
import { PDFParse } from "pdf-parse";
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#faf9f6"/><path d="M72 152H1128" stroke="#dce1e7"/><g fill="#172033" font-family="Arial,sans-serif"><text x="72" y="108" font-size="32" font-weight="700">João Teló<tspan fill="#1d4ed8">.</tspan></text><text x="72" y="265" font-size="18" fill="#1d4ed8">REACT · TYPESCRIPT · FRONT-END DEVELOPMENT</text><text x="72" y="365" font-size="64" font-weight="700">I build interfaces.</text><text x="72" y="445" font-size="54" fill="#647084">And pay attention to the details.</text><text x="72" y="550" font-size="22">joaovtelo@gmail.com</text></g></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/social.png");
const pdf = new PDFParse({ data: await fs.readFile("Joao_Telo_Resume.pdf") });
const text = await pdf.getText();
await fs.writeFile("artifacts/resume-text.txt", text.text);
console.log("PDF selectable text characters:", text.text.length);
await pdf.destroy();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
try {
  await page.goto("https://ffxiv-pull-review.vercel.app/", {
    waitUntil: "networkidle",
    timeout: 45000,
  });
  console.log((await page.locator("body").innerText()).slice(0, 12000));
  await page.screenshot({ path: "artifacts/demo-initial.png" });
} catch (e) {
  console.log(String(e));
}
await browser.close();
