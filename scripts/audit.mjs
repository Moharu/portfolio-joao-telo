const siteUrl = process.env.TEST_BASE_URL ?? "http://localhost:3000/";
import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  args: ["--remote-debugging-port=9222"],
});
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
});
const client = await page.context().newCDPSession(page);
await client.send("Network.enable");
await client.send("Network.setCacheDisabled", { cacheDisabled: true });
const resources = [];
client.on("Network.responseReceived", ({ requestId, response, type }) =>
  resources.push({
    requestId,
    url: response.url,
    type,
    headers: response.headers,
  }),
);
const sizes = {};
client.on(
  "Network.loadingFinished",
  (e) => (sizes[e.requestId] = e.encodedDataLength),
);
await page.goto(siteUrl, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const rows = resources.map((x) => ({ ...x, bytes: sizes[x.requestId] || 0 }));
const totals = {};
for (const r of rows) totals[r.type] = (totals[r.type] || 0) + r.bytes;
await fs.writeFile(
  "artifacts/transfers.json",
  JSON.stringify(
    { viewport: "390x844", coldCache: true, totals, resources: rows },
    null,
    2,
  ),
);
for (const [width, height] of [
  [320, 800],
  [390, 844],
  [768, 1024],
  [1024, 768],
  [1440, 1000],
  [667, 375],
]) {
  await page.setViewportSize({ width, height });
  await page.goto(siteUrl);
  await page.screenshot({
    path: `artifacts/portfolio-${width}.png`,
    fullPage: true,
  });
}
const reports = [];
for (let i = 1; i <= 3; i++) {
  const result = await lighthouse(siteUrl, {
    port: 9222,
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  await fs.writeFile(`artifacts/lighthouse-${i}.json`, result.report);
  const l = result.lhr;
  reports.push({
    run: i,
    version: l.lighthouseVersion,
    fetchTime: l.fetchTime,
    settings: l.configSettings,
    scores: Object.fromEntries(
      Object.entries(l.categories).map(([k, v]) => [k, v.score * 100]),
    ),
    metrics: Object.fromEntries(
      [
        "largest-contentful-paint",
        "cumulative-layout-shift",
        "total-blocking-time",
      ].map((k) => [k, l.audits[k].numericValue]),
    ),
  });
  console.log(reports.at(-1));
}
await fs.writeFile(
  "artifacts/performance-summary.json",
  JSON.stringify(reports, null, 2),
);
await browser.close();
