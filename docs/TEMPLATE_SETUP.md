# Portfolio V1 Template Setup (Multi-Project / Multi-App)

Use this project as a reusable template for different clients, brands, or Cloudways applications.

## 1) Create a new project from the template

1. Create a new repository from this codebase (GitHub template repo or clone-and-push).
2. In the new repo, configure GitHub Actions secrets (below).
3. Add a `.env.local` based on `.env.example`.
4. Connect a new Google Sheet + Drive folder for the new project.

## 2) Configure repository variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set at minimum:

- `NEXT_PUBLIC_GOOGLE_SHEET_ID`
- `NEXT_PUBLIC_PROJECTS_TAB` (default `Projects`)
- `NEXT_PUBLIC_CONFIG_TAB` (default `Config`)

## 3) Configure Cloudways deploy secrets (GitHub)

In GitHub: **Settings → Secrets and variables → Actions**.

Required:

- `CLOUDWAYS_SSH_HOST` (server IP)
- `CLOUDWAYS_SSH_USER` (master/app SSH user)
- `CLOUDWAYS_SSH_KEY` (private key)
- `CLOUDWAYS_APP_PATH` (example: `/home/master/applications/abc123`)

Required for Varnish purge host header (one of):

- `CLOUDWAYS_VARNISH_HOST` (recommended explicit host)
- `CLOUDWAYS_PRIMARY_DOMAIN` (fallback if VARNISH_HOST is not set)

Optional:

- `CLOUDWAYS_VARNISH_PURGE_COMMAND`  
  Use this if your server needs a custom purge routine.  
  Example:
  ```bash
  curl -fsS -X PURGE http://127.0.0.1/ -H "Host: example.com"
  ```

## 4) Use GitHub Environments for multiple Cloudways apps

For running multiple deployments from one repo:

1. Create environments (for example: `staging`, `production-client-a`, `production-client-b`).
2. Store each app's secrets in its matching environment.
3. Update `environment:` in `.github/workflows/deploy.yml` when targeting another app/environment.

This keeps one shared workflow with per-app credentials and domains.

## 5) Google Sheet + Drive bootstrap for each project

1. Create a new Google Sheet (Projects + Config).
2. Install `google-apps-script/sync-portfolio.gs`.
3. Set `PORTFOLIO_FOLDER_NAME` if needed.
4. Publish the sheet to web.
5. Set Apps Script trigger (every 5-15 min).

Detailed guide: `docs/GOOGLE_DRIVE_SETUP.md`

## 6) Deployment flow

The workflow deploys on push to `main`:

1. `npm ci`
2. `npm run build` (static export to `out/`)
3. `rsync` to `public_html/`
4. purge Varnish cache over SSH

No Node.js runtime is required on Cloudways for serving this site.

## 7) Recommended "template hygiene"

- Keep brand-specific content in the Google Sheet `Config` tab.
- Keep project content in Drive folders (`info.txt` + images).
- Keep infra/app specifics in GitHub secrets only.
- Avoid hardcoding client names/domains in code.
