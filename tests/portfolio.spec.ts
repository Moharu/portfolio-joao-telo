import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const siteUrl = process.env.TEST_BASE_URL ?? "http://localhost:3000/";
const basePath = new URL(siteUrl).pathname.replace(/\/$/, "");
test("navigation, destinations, PDF, keyboard and accessibility", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(siteUrl);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  for (const name of ["Projects", "Experience", "About", "Contact"]) {
    await page
      .getByRole("navigation")
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page.locator(`#${name.toLowerCase()}`)).toBeInViewport();
  }
  await expect(
    page.getByRole("link", { name: "Try live demo" }),
  ).toHaveAttribute("href", "https://ffxiv-pull-review.vercel.app/");
  await expect(page.getByRole("link", { name: "View source" })).toHaveAttribute(
    "href",
    "https://github.com/Moharu/ffxiv-pull-review",
  );
  await expect(
    page.getByRole("link", { name: "Explore tests and documentation" }),
  ).toHaveAttribute("href", "https://github.com/Moharu/practice-playwright");
  await expect(
    page.getByRole("link", {
      name: "View dashboard source and development notes",
    }),
  ).toHaveAttribute(
    "href",
    "https://github.com/Moharu/support-ticket-dashboard-exercise",
  );
  await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/joaotelo/",
  );
  await expect(
    page.getByRole("link", { name: "GitHub", exact: true }),
  ).toHaveAttribute("href", "https://github.com/Moharu");
  for (const a of await page.locator('a[href^="mailto:"]').all())
    await expect(a).toHaveAttribute("href", "mailto:joaovtelo@gmail.com");
  const pdf = await request.get(`${basePath}/resume/joao-telo-resume.pdf`);
  expect(pdf.ok()).toBeTruthy();
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
  await page.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details")).toHaveAttribute("open", "");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(errors).toEqual([]);
});
test("responsive reflow and 200 percent text", async ({ page }) => {
  for (const [width, height] of [
    [320, 800],
    [375, 812],
    [390, 844],
    [768, 1024],
    [1024, 768],
    [1440, 1000],
    [667, 375],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(siteUrl);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await page.setViewportSize({ width: 320, height: 800 });
  await page.addStyleTag({ content: "html{font-size:200%}" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
test("core journey with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(siteUrl);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "View my work" }).click();
  await expect(page.locator("#projects")).toBeInViewport();
  await page.locator("summary").click();
  await expect(page.locator("details")).toHaveAttribute("open", "");
  await expect(page.locator("#contact")).toContainText("joaovtelo@gmail.com");
  await context.close();
});

test("dark default, keyboard theme switch, persistence and light contrast", async ({
  page,
}) => {
  await page.goto(siteUrl);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const toggle = page.getByRole("button", { name: "Switch to light mode" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
