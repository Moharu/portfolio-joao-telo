# João Teló — portfolio

Local-only Next.js App Router portfolio. No deployment has been created.

## Run

Node.js 24 LTS and npm 11 were used. Install with `npm ci`, then `npm run dev` for development. Production preview: `npm run build` followed by `npm start`, then open http://localhost:3000. Stop with Ctrl+C.

The production build uses webpack because this environment blocks Turbopack's CSS worker port. This does not change the page's rendering model. All routes are prerendered at build time. There are no custom Client Components, runtime APIs, external fonts, analytics, or third-party rendering dependencies. Next.js still ships its framework JavaScript; it is included in measured budgets.

Exact installed versions are recorded in package-lock.json. Core versions: Next.js 16.4.3, React / React DOM 19.3.1, Tailwind CSS / PostCSS integration 4.3.3. Strict TypeScript is enabled.

## Content and assets

Edit `content/portfolio.ts` for profile, project and employment facts. Section presentation and supporting copy are in `components/portfolio.tsx`; design tokens and responsive styles are in `app/globals.css`. No client-side content fetching is used. The supplied English copy, career-break distinction, original role titles and visible AI-assistance statement are preserved. The system font stack is an allowed specification choice.

The supplied PDF is copied byte-for-byte to `public/resume/joao-telo-resume.pdf`, served at `/resume/joao-telo-resume.pdf`. Replace that file with an approved public résumé, then rebuild and verify selectable text, hyperlinks and layout. The source PDF remains untouched. Its availability wording is time-sensitive.

Project capture provenance and permission review: `public/projects/README.md`. The gameplay image is a real public demo capture, served with next/image, accurate dimensions and responsive sizes. The Playwright project uses the specification's permitted typographic category panel, verified against its repository README; it is not a fabricated test report. No development placeholders are required.

`public/social.png` is an original static typographic social preview; `app/icon.svg` is the favicon. No stock or generated product imagery is used.

## Deployment configuration — future action

Do not publish until requested. No production domain has been assumed. Set `SITE_URL` to the confirmed HTTPS origin (no path) before building. This supplies canonical metadata, metadataBase, sitemap and social-image origin. Set `SITE_INDEXABLE=true` only for the production build; previews must retain false. Apply hosting-level preview noindex protection too. These values are read at build time, so rebuild after changes.

Without an origin, canonical metadata is omitted and sitemap is empty. Next.js warns and uses localhost for social-image resolution during local builds; this is intentional for local work and must be resolved before launch. Production should support Next.js image optimization and serve the static route through its cache/CDN. Verify production canonical, sitemap, robots and indexing after deployment.

## Validation

Run `npm run lint`, `npm run typecheck`, `npm run build`; start the production server; then `npm test`. The Playwright suite uses installed Chromium, Firefox and WebKit. On another machine install browsers using `npx playwright install --with-deps` first.

`node scripts/audit.mjs` runs three Lighthouse mobile audits and a cold-load transfer measurement, and saves full-page responsive screenshots. Requires a running production server and Chromium. `node scripts/capture.mjs` reproduces the public gameplay capture (requires network); replacing an image should use a new asset filename to avoid stale optimized-image caches. `node scripts/review.mjs` records public link inspections. `node scripts/assets.mjs` generates the social card, extracts PDF text, and inspects the initial demo screen.

See `VALIDATION.md` for measured results, limitations and launch decisions. Raw audit/browser outputs are local ignored files in `artifacts/`, `test-results/` and `playwright-report/`. They are evidence from this implementation, not claims about the featured projects' current test results.
