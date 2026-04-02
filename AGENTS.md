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

- `src/lib/data.ts` — Data layer. Fetches from Google Sheets via opensheet API, falls back to built-in demo projects when `NEXT_PUBLIC_GOOGLE_SHEET_ID` is not set.
- `src/lib/types.ts` — TypeScript interfaces for `Project` and `SiteConfig`.
- `src/components/` — Reusable UI components (Navigation, HeroCarousel, ProjectGrid, ContactSection, Footer).
- `src/app/` — Next.js App Router pages (home, archive, project detail).
- `next.config.ts` — Configured for Unsplash and Google Drive image domains.

### Non-obvious notes

- The site works without any environment variables — demo data is hardcoded in `src/lib/data.ts`.
- Images use `unoptimized` prop because they come from external URLs (Unsplash, Google Drive).
- The pre-commit hook may fail if injected secret names contain spaces (e.g. "CloudWays URL"). Use `--no-verify` if this happens — it's an env config issue, not a code issue.
- Contact form uses `mailto:` link — no backend needed.
- Data revalidates every 60 seconds (`revalidate = 60` on pages).
