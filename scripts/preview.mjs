const siteUrl = process.env.TEST_BASE_URL ?? "http://localhost:3000/";
import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage();
for (const width of [320, 768, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(siteUrl);
  await page
    .locator(".compact-project")
    .screenshot({ path: `artifacts/dashboard-entry-${width}.png` });
}
await browser.close();
