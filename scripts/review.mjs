import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const results = [];
for (const url of [
  "https://github.com/Moharu/support-ticket-dashboard-exercise",
  "https://github.com/Moharu/ffxiv-pull-review",
  "https://github.com/Moharu/practice-playwright",
  "https://github.com/Moharu",
  "https://www.linkedin.com/in/joaotelo/",
]) {
  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    results.push({
      url,
      status: response.status(),
      title: await page.title(),
      body: (await page.locator("body").innerText()).slice(-14000),
    });
  } catch (e) {
    results.push({ url, error: String(e) });
  }
}
await fs.writeFile(
  "artifacts/external-review.json",
  JSON.stringify(results, null, 2),
);
console.log(
  results.map((x) => ({
    url: x.url,
    status: x.status,
    title: x.title,
    error: x.error,
  })),
);
await browser.close();
