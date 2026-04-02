# Google Drive → Portfolio Auto-Sync Setup

This guide sets up **automatic syncing** from your Google Drive to your portfolio website. Drop images into folders → site updates automatically.

---

## How It Works

```
📁 Google Drive "Portfolio" folder
    ↓ (Google Apps Script syncs every 5-15 min)
📊 Google Sheet (auto-populated)
    ↓ (site fetches on every page load)
🌐 Live Portfolio Website
```

You just manage folders and images. Everything else is automatic.

---

## Step 1: Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) → **Blank spreadsheet**
2. Name it **"Portfolio CMS"** (or anything you like)
3. Note the **spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SPREADSHEET_ID/edit
   ```

## Step 2: Set Up the Drive Folder Structure

Create this folder structure in your Google Drive:

```
📁 Portfolio/
├── 📁 Concrete Horizon/
│   ├── 🖼 hero.jpg              ← first image = thumbnail
│   ├── 🖼 detail-01.jpg
│   ├── 🖼 detail-02.jpg
│   └── 📄 info.txt              ← optional metadata
├── 📁 Lumina Series/
│   ├── 🖼 cover.png
│   ├── 🖼 studio-shot.jpg
│   └── 📄 info.txt
└── 📁 Form & Function/
    ├── 🖼 main.jpg
    └── 🖼 closeup.jpg
```

### Rules:
- **Folder name** = project title
- **First image** = thumbnail (files named `hero`, `cover`, `thumb`, `main`, or starting with `00` are prioritized)
- **info.txt** is optional — if omitted, defaults are used
- Folders starting with `_` or `.` are ignored (use `_Archive` to hide projects)

### info.txt format

Create a plain text file called `info.txt` inside each project folder:

```
category: Architecture
year: 2025
description: A residential complex that dissolves the boundary between landscape and structure.
featured: true
```

All fields are optional:
| Field | Default | Options |
|-------|---------|---------|
| `category` | Other | Art, Architecture, Product Design, etc. |
| `year` | Current year | Any year |
| `description` | *(empty)* | Any text |
| `featured` | false | `true` = appears in hero carousel |

## Step 3: Add the Apps Script

1. Open your **Portfolio CMS** Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete any existing code in the editor
4. Copy the entire contents of [`google-apps-script/sync-portfolio.gs`](../google-apps-script/sync-portfolio.gs) and paste it
5. Click **💾 Save** (or Ctrl+S)
6. Click **▶ Run** (select `syncPortfolio` from the dropdown)
7. Google will ask you to **authorize** the script — click through the prompts:
   - "This app isn't verified" → Click **Advanced** → **Go to Portfolio Sync (unsafe)**
   - Grant access to Drive and Sheets

After running, check your sheet — it should now have a **Projects** tab and a **Config** tab populated with your Drive folder data.

## Step 4: Set Up Auto-Sync (Trigger)

1. In the Apps Script editor, click the **⏰ Triggers** icon (left sidebar, clock icon)
2. Click **+ Add Trigger**
3. Configure:
   - **Function**: `syncPortfolio`
   - **Event source**: Time-driven
   - **Type**: Minutes timer
   - **Interval**: Every 5 minutes (or 15 minutes)
4. Click **Save**

Now your sheet auto-updates every 5 minutes when you add/change files in Drive.

## Step 5: Publish the Sheet

1. In your Google Sheet, go to **File → Share → Publish to web**
2. Select **Entire Document**
3. Click **Publish**
4. Close the dialog

## Step 6: Connect to the Website

Add the spreadsheet ID to your `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_SHEET_ID=your_spreadsheet_id_here
```

Rebuild and redeploy:

```bash
npm run build
# Then rsync or SFTP the out/ folder to Cloudways
```

---

## Step 7: Edit Your Site Info (Config Tab)

In the **Config** tab of your Google Sheet, edit these values:

| key | value |
|-----|-------|
| name | Your Name |
| tagline | Art / Architecture / Design |
| email | you@email.com |
| instagram | your_handle |
| linkedin | your_handle |

These update on the live site automatically (on next page load).

---

## Workflow After Setup

### Adding a new project:
1. Create a folder in `Portfolio/` in Google Drive
2. Drop images in
3. Optionally add `info.txt`
4. Wait 5 minutes (or click **Portfolio → Sync from Drive now** in the Sheet)
5. Site updates automatically

### Removing a project:
- Rename the folder to start with `_` (e.g., `_Old Project`) — it will be hidden
- Or simply delete the folder

### Reordering:
- Featured projects appear first, then sorted by year (newest first)
- Set `featured: true` in `info.txt` to promote projects to the hero carousel

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Images not loading | Make sure files are shared as "Anyone with the link" (the script does this automatically) |
| Sheet not updating | Check Triggers in Apps Script — make sure the trigger is active |
| New folder not appearing | Folder name must not start with `_` or `.`, and must contain at least one image |
| Wrong thumbnail | Name your preferred thumbnail `hero.jpg`, `cover.png`, `main.jpg`, or start with `00` |
