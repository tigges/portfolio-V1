# Portfolio V1

A minimal, image-first portfolio for art, architecture, and product design — powered by **Google Sheets** as a headless CMS.

## How It Works

1. **Google Sheets as CMS** — Add projects to a published Google Sheet. The site fetches data client-side on every page load — instant updates, no rebuild needed.
2. **Hero Carousel** — Featured projects rotate in a full-bleed carousel.
3. **Project Grid** — All work displayed in a clean grid with hover effects.
4. **Archive** — Filterable, switchable grid/list view of every project.
5. **Contact** — Email form + social links.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site works immediately with built-in demo projects. To connect your own content, see below.

## Google Sheets Setup

1. Create a new Google Sheet with two tabs: **Projects** and **Config**.

2. **Projects tab** columns:

   | id | title | category | year | description | thumbnail | images | featured |
   |---|---|---|---|---|---|---|---|
   | my-project | My Project | Art | 2024 | Description here | https://... | url1, url2 | true |

3. **Config tab** columns:

   | key | value |
   |---|---|
   | name | Your Name |
   | tagline | Art / Architecture / Design |
   | email | you@email.com |
   | instagram | your_handle |
   | linkedin | your_handle |

4. Publish the sheet: **File → Share → Publish to Web → Entire Document**

5. Copy the spreadsheet ID from the URL and add it to `.env.local`:

   ```
   NEXT_PUBLIC_GOOGLE_SHEET_ID=your_spreadsheet_id_here
   ```

## Using Google Drive Images

### Automated: Google Drive → Sheet → Site (recommended)

Set up automatic syncing so you just drop images into Drive folders and the site updates:

1. Create a **"Portfolio"** folder in Google Drive
2. Add project subfolders with images (and optional `info.txt` files)
3. Install the Google Apps Script from `google-apps-script/sync-portfolio.gs`
4. Set a 5-minute auto-sync trigger

**→ Full setup guide: [docs/GOOGLE_DRIVE_SETUP.md](docs/GOOGLE_DRIVE_SETUP.md)**

```
📁 Google Drive "Portfolio/"       →  📊 Google Sheet (auto-populated)  →  🌐 Live Site
├── 📁 My Project/                     id | title | thumbnail | ...        (fetches on load)
│   ├── 🖼 hero.jpg
│   ├── 🖼 detail.jpg
│   └── 📄 info.txt
```

### Manual: Direct image URLs

For images stored in Google Drive without automation:
1. Upload images to a Google Drive folder
2. Right-click → Share → "Anyone with the link"
3. Use `https://drive.google.com/thumbnail?id=FILE_ID&sz=w1200` as the image URL in the sheet

## Deployment on Cloudways

The site builds as a **static export** (`out/` folder) — no Node.js server required on Cloudways.

### Manual Deploy

```bash
npm run build
# Upload the contents of the `out/` folder to your Cloudways public_html via SFTP
```

### Automated Deploy (GitHub Actions)

A GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys on push to `main`. Add these secrets to your GitHub repo:

| Secret | Value |
|--------|-------|
| `CLOUDWAYS_SSH_HOST` | Your server IP (from Cloudways → Server → Master Credentials) |
| `CLOUDWAYS_SSH_USER` | SSH username |
| `CLOUDWAYS_SSH_KEY` | Private SSH key (generate in Cloudways → SSH Keys) |
| `CLOUDWAYS_APP_PATH` | Application path, e.g. `/home/master/applications/abc123` |

### .htaccess for Clean URLs

Add this to `public_html/.htaccess` on Cloudways:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /$1.html [L]
```

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **TypeScript**
- **Google Sheets** via [opensheet](https://opensheet.elk.sh) (no API key needed)
