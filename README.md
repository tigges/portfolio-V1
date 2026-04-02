# Portfolio V1

A minimal, image-first portfolio for art, architecture, and product design — powered by **Google Sheets** as a headless CMS.

## How It Works

1. **Google Sheets as CMS** — Add projects to a published Google Sheet. The site auto-updates every 60 seconds.
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

For images stored in Google Drive:
1. Upload images to a Google Drive folder
2. Right-click → Share → "Anyone with the link"
3. Use the share URL as the `thumbnail` or `images` value

## Deployment on Cloudways

Build the production version:

```bash
npm run build
npm start
```

Or deploy as a static export by adding `output: 'export'` to `next.config.ts`.

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **TypeScript**
- **Google Sheets** via [opensheet](https://opensheet.elk.sh) (no API key needed)
