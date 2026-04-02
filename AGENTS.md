# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 16** portfolio site (App Router, TypeScript, Tailwind CSS 4).

### Services

| Service | Command | Notes |
|---------|---------|-------|
| Dev server | `npm run dev` | Runs on port 3000. Hot reloads on file changes. |

### Standard commands

- **Install deps**: `npm install`
- **Dev server**: `npm run dev`
- **Lint**: `npm run lint`
- **Build**: `npm run build`

### Architecture

- `src/lib/data.ts` — Fallback demo project data used at build time and as initial state.
- `src/lib/DataProvider.tsx` — Client-side data provider. Fetches from Google Sheets on page load, falls back to demo data.
- `src/lib/types.ts` — TypeScript interfaces for `Project` and `SiteConfig`.
- `src/components/` — Reusable UI components (Navigation, HeroCarousel, ProjectGrid, ContactSection, Footer).
- `src/app/` — Next.js App Router pages (home, archive, project detail).
- `next.config.ts` — Configured for static export (`output: "export"`) and external image domains.

### Non-obvious notes

- The site is a **static export** (`output: "export"` in next.config.ts). `npm run build` produces an `out/` folder with plain HTML/CSS/JS — no Node.js server required on Cloudways.
- Data fetching is **client-side** via DataProvider. Google Sheets data is fetched in the browser on every page load. No rebuild needed when you update the spreadsheet.
- The `[id]` route uses `generateStaticParams` to pre-render demo project pages. Projects added later via Google Sheets are still accessible — the client-side DataProvider handles routing.
- Images use `unoptimized` prop because they come from external URLs (Unsplash, Google Drive).
- The pre-commit hook may fail if injected secret names contain spaces (e.g. "CloudWays URL"). Use `--no-verify` if this happens — it's an env config issue, not a code issue.
- Contact form uses `mailto:` link — no backend needed.
- `.github/workflows/deploy.yml` auto-deploys to Cloudways via rsync on push to `main` (requires GitHub secrets configured).
