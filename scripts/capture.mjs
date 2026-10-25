import { chromium } from "@playwright/test";
import sharp from "sharp";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("https://ffxiv-pull-review.vercel.app/");
await page.getByRole("button", { name: "Try demo recording" }).click();
await page.waitForTimeout(4000);
console.log((await page.locator("body").innerText()).slice(0, 14000));
await page.locator("video").evaluate((v) => {
  v.currentTime = 67;
  v.pause();
});
await page
  .getByText("Filter by category", { exact: true })
  .scrollIntoViewIfNeeded();
await page
  .getByText("Filter by category", { exact: true })
  .evaluate((el) =>
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 550),
  );
await page.waitForTimeout(1500);
await page.screenshot({ path: "artifacts/demo-active.png" });
await sharp("artifacts/demo-active.png")
  .webp({ quality: 80 })
  .toFile("public/projects/gameplay-review-2026-10-25.webp");
await browser.close();
