# Validation — 24 October 2026

Local production URL: http://localhost:3000. Date uses America/Sao_Paulo (raw reports use 25 October UTC). Nothing has been published.

## Implementation and functional checks

- `npm run lint`: passed without warnings; strict `npm run typecheck`: passed; `npm run build`: passed using webpack. Build output marks `/`, robots and sitemap as static prerendered routes.
- Nine Playwright tests passed: three journeys in Chromium, Firefox and WebKit. Verified anchor destinations, exact project/social/mail links, successful PDF response and signature, skip link, keyboard-operated native disclosure, automated axe WCAG 2/2.1/2.2 A/AA scans, responsive overflow, enlarged text, and navigation/content with JavaScript disabled.
- Core content exists in returned HTML. No custom Client Components or per-request content fetching.
- Tested widths 320, 375, 390, 768, 1024, 1440, plus 667 × 375 landscape. No horizontal page overflow detected. Reviewed saved desktop, tablet, phone and landscape screenshots. Header wraps rather than hiding links. Project reading order on phones is title → media → description → links.
- Tested 200% root text sizing at 320 CSS pixels in all three engines. The first test revealed fixed typography; converted font sizes to rem and verified the correction. Enlarged text wraps, including long words, without clipping. This stress check combines text enlargement and narrow reflow; it is not a physical-browser zoom-control test.
- Reviewed keyboard focus order and saved focused skip-link evidence. Focus has a 3px blue outline and 5px offset; native anchors and details work without JavaScript. No focus trap. Main CTAs and navigation links have at least 44px height. Automated accessibility scans found no violations in tested states; this is not a WCAG certification.
- Contrast reviewed for text and interaction colors. Main text and secondary text exceed AA; muted heading text #647084 on #faf9f6 is suitable for large text, and white on the #1d4ed8 primary action exceeds 4.5:1. Focus ring contrasts against the light surfaces. Hover primary background is darker. Information is conveyed with words, not just colors.
- Chromium console/network inspection found no errors or failed requests in the tested portfolio journey. Optimized screenshot responses succeeded. Image is lazy-loaded and has explicit 1440 × 1000 dimensions and responsive sizes. Lazy loading can still fetch nearby below-fold images; actual fetched bytes are included below.

## Production mobile Lighthouse lab measurements

Lighthouse 13.5.0 via its Node API, installed Playwright Chromium; Node 24.22.0. Three sequential runs against the production server, default Lighthouse mobile simulation: 412 × 823 CSS pixels, DPR 1.75, mobile user agent, simulated throttling, 150ms RTT, 1638.4 Kbps throughput, 4× CPU slowdown. Storage reset enabled per run. Full configuration and timings are in `artifacts/performance-summary.json` and the three raw reports.

| Metric         |  Run 1 |  Run 2 |  Run 3 |            Target |
| -------------- | -----: | -----: | -----: | ----------------: |
| Performance    |    100 |    100 |     99 |        median ≥95 |
| Accessibility  |    100 |    100 |    100 |               ≥95 |
| Best Practices |    100 |    100 |    100 |               ≥95 |
| SEO            |     66 |     66 |     66 | ≥95 before launch |
| LCP            | 1.505s | 1.656s | 1.974s |             ≤2.5s |
| CLS            |      0 |      0 |      0 |              ≤0.1 |
| TBT            | 19.5ms |   19ms | 16.5ms |            ≤200ms |

Median Performance: **100**. SEO target is **not met in the preview**: indexing is deliberately blocked by robots and page metadata. The failed SEO audit is `is-crawlable`. Keep preview protection; after the origin is confirmed, build production with indexing enabled and rerun the SEO audit. No production SEO score is claimed.

These are local lab scores, not real-user Core Web Vitals. There is no field LCP/INP/CLS dataset. TBT does not establish INP compliance. Local-server lab results do not include production CDN latency or physical-device performance.

## Cold-load transfer budgets

Chromium, 390 × 844 CSS pixels, DPR 1, fresh page/context, CDP browser cache disabled, production server, no scrolling until capture completed. Counts use CDP encoded response bytes, including framework code, preloads and fetched nearby media. HTTP header overhead is included; compression is confirmed by response headers for HTML/JS/CSS. No PDF request occurs until selected. No external runtime requests or font downloads.

| Resource                        |      Measured |            Budget |
| ------------------------------- | ------------: | ----------------: |
| JavaScript                      | 141,832 bytes |          ≤150,000 |
| CSS                             |   4,448 bytes |           ≤30,000 |
| Fonts                           |       0 bytes |          ≤100,000 |
| Document                        |   7,538 bytes | included in total |
| Images fetched before scrolling |  11,493 bytes | included in total |
| Total                           | 165,311 bytes |          ≤700,000 |

Raw resource URLs, response headers and encoded lengths: `artifacts/transfers.json`. The genuine WebP source is approximately 93KB. Sampled optimized 640px screenshot responses were 31,792 bytes (direct Playwright request); browser Accept negotiation can choose a smaller format. Both are below the 150KB aim. Full-page evidence screenshots are QA artifacts, not assets delivered by the site.

## Public destinations, PDF and factual integrity

- Opened the live gameplay demo in a fresh Chromium context, entered its demo mode, saw video playback, two sample feedback timestamps, category filter and edit controls. Sought and paused at 1:07 and captured that public sample state. This is a focused inspection, not a full audit of the external application.
- Opened both project repositories and the GitHub profile in the browser; expected titles and content loaded. Verified testing categories against practice-playwright's README; no passing test counts or CI claims added to this portfolio beyond supplied feature descriptions. Did not execute the featured repositories' own test suites.
- LinkedIn returned HTTP 999 and an empty page to automation. Its exact supplied URL is preserved; confirm manually in an ordinary browser before launch.
- Supplied résumé copied byte-for-byte. Extracted 4,638 text characters; rendered and visually reviewed both pages with no visible clipping. Six PDF hyperlinks point to the supplied email, LinkedIn, GitHub and project destinations. Did not rewrite its contents. Public résumé includes time-sensitive “available immediately” wording that should be reviewed by João before publication.
- Public sample gameplay capture includes game/player/stream overlays. It contains no private local review data. Final republication rights/privacy approval remains João's launch decision.
- AI-assistance disclosure remains visible. Employment, personal projects and career break remain distinct. No invented achievements, clients, professional QA employment, proficiency meters or performance claims were added to public copy.

## Limits and launch decisions

1. Confirm actual production origin and configure SITE_URL. Enable indexing only for the production build; verify canonical, social URLs, sitemap, robots and SEO afterward. Local Next.js social metadata warning is expected until then.
2. Review final résumé, especially availability wording, and confirm screenshot republication/privacy permissions. No missing-asset placeholders remain.
3. Manually confirm the LinkedIn destination, blocked to automation.
4. No physical phone, assistive-technology/screen-reader session, native browser zoom UI, real-user measurements or deployed/CDN checks were performed. Automated WebKit is not a test on physical Safari/iOS. Browser engines and responsive emulation were tested locally.

Evidence is retained under ignored `artifacts/`, `test-results/` and `playwright-report/`. Reproduce using README commands. Supplied planning inputs remain local and are excluded from the implementation commit.
