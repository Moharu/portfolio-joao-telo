# João Teló — portfolio

React and TypeScript developer portfolio, built with Next.js App Router, strict TypeScript and Tailwind CSS. Dark mode is the default; a small isolated Client Component switches themes and remembers the visitor's choice. Portfolio content is rendered into HTML at build time.

- Repository: https://github.com/Moharu/portfolio-joao-telo
- GitHub Pages: https://moharu.github.io/portfolio-joao-telo/

## Development and local preview

Use Node.js 24 LTS and npm. Dependencies are pinned in package-lock.json.

```bash
npm ci
npm run dev
```

For a root-path static preview:

```bash
npm run build
npm start
```

Open http://localhost:3000/. `npm start` serves the exported `out/` directory, rather than starting a Next.js server. Stop with Ctrl+C. Local builds default to noindex.

To reproduce GitHub Pages paths and metadata locally:

```bash
SITE_URL=https://moharu.github.io/portfolio-joao-telo/ SITE_INDEXABLE=true NEXT_PUBLIC_BASE_PATH=/portfolio-joao-telo npm run build
NEXT_PUBLIC_BASE_PATH=/portfolio-joao-telo npm start
```

Open http://localhost:3000/portfolio-joao-telo/. Do not change environment variables between production build and preview except for the local test URL. The base path is compiled into asset links.

## Deployment

`.github/workflows/pages.yml` builds and deploys on pushes to `main`, and supports manual runs under GitHub Actions. It installs from the lockfile, runs lint and strict type checking, exports the site and deploys `out/` using the official GitHub Pages actions. The repository's Pages source must be **GitHub Actions** (Settings → Pages).

The workflow reads the actual Pages URL and base path from `actions/configure-pages` and sets:

- `SITE_URL`: complete HTTPS public site URL, **including the repository path and trailing slash**.
- `NEXT_PUBLIC_BASE_PATH`: repository path, e.g. `/portfolio-joao-telo`; empty for a custom domain or account-root site.
- `SITE_INDEXABLE=true`: production robots and page metadata allow indexing.

Canonical, sitemap, social preview, favicon, screenshot and résumé links account for the Pages path. If you configure a custom domain later, update GitHub Pages settings and rerun the workflow; inspect the resulting canonical, sitemap and asset URLs.

GitHub Pages cannot run a Next.js server or its on-demand image optimizer. `next.config.ts` uses `output: "export"`, trailing slashes and unoptimized images. The genuine ~93KB WebP screenshot is served directly. Server Components still execute at build time; initial content and navigation work without JavaScript. There are no API routes, databases, external fonts or runtime rendering dependencies. Webpack is selected because this environment blocks Turbopack worker ports.

## Content and résumé updates

Edit `content/portfolio.ts` for profile, projects, skills and experience. Supporting copy and layout live in `components/portfolio.tsx`; design and theme tokens are in `app/globals.css`. Keep the visible assistance disclosures and the distinction between professional experience and personal projects.

**The résumé is hosted with the site. No separate upload or storage service is needed.** Its tracked file is `public/resume/joao-telo-resume.pdf` and its public URL is:

https://moharu.github.io/portfolio-joao-telo/resume/joao-telo-resume.pdf

To replace it, overwrite that file, commit and push to `main`; the workflow publishes it along with the site. Review its selectable text, hyperlinks, layout and time-sensitive availability wording before replacing it. The original supplied root-level PDF and planning documents remain local and ignored; only the public copy is tracked. The supplied PDF has not been rewritten.

Project capture provenance is in `public/projects/README.md`. No product screenshots or test results are fabricated. The testing panel lists scope, not pass counts. `public/social.png` is an original typographic preview; `app/icon.svg` is the favicon.

## Checks and evidence

```bash
npm run lint
npm run typecheck
npm run build
npm start
# In another terminal:
npm test
```

On a new machine install test browsers first with `npx playwright install --with-deps`. For a repository-path preview use `TEST_BASE_URL=http://localhost:3000/portfolio-joao-telo/ npm test`. The same variable can point the suite at the live Pages URL. The suite covers navigation, public destinations, résumé response, accessibility in both themes, responsive overflow, text enlargement, keyboard controls, persisted theme and no-JavaScript access across Chromium, Firefox and WebKit.

With a server running, `TEST_BASE_URL=... node scripts/audit.mjs` records three mobile Lighthouse runs, cold-load transfers and viewport screenshots. `scripts/review.mjs` inspects external destinations; `scripts/capture.mjs` reproduces the genuine public gameplay image; `scripts/pdf-review.mjs` renders the supplied PDF and extracts its hyperlink information. The PDF review script reads the tracked public résumé; the asset-generation script also reads the original ignored root PDF. Browser scripts require locally installed browsers and appropriate network access.

`VALIDATION.md` records results and limitations. Raw browser and Lighthouse artifacts are ignored under `artifacts/`, `test-results/` and `playwright-report/`. The live Pages deployment was measured separately; see the live-deployment results in VALIDATION.md. Lab scores do not establish real-user Core Web Vitals.
