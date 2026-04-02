/**
 * Portfolio Auto-Sync — Google Apps Script
 *
 * Scans your Google Drive "Portfolio" folder for project subfolders,
 * reads images + an optional info.txt, and writes everything to a
 * Google Sheet that the portfolio website reads automatically.
 *
 * FOLDER STRUCTURE:
 *   📁 Portfolio/
 *   ├── 📁 Concrete Horizon/
 *   │   ├── 🖼 hero.jpg          (first image = thumbnail)
 *   │   ├── 🖼 detail-1.jpg
 *   │   ├── 🖼 detail-2.jpg
 *   │   └── 📄 info.txt          (optional metadata)
 *   ├── 📁 Lumina Series/
 *   │   ├── 🖼 cover.png
 *   │   └── 📄 info.txt
 *   └── ...
 *
 * info.txt format (all fields optional, one per line):
 *   category: Architecture
 *   year: 2025
 *   description: A residential complex that dissolves...
 *   featured: true
 *
 * SETUP:
 *   1. Create a Google Sheet
 *   2. Extensions → Apps Script → paste this code
 *   3. Set PORTFOLIO_FOLDER_NAME below (or use the default "Portfolio")
 *   4. Run syncPortfolio() once manually to authorize
 *   5. Set a time trigger: Triggers → Add → syncPortfolio → every 5/15 min
 */

// ────────────────────────────────────────────────────────────
// CONFIG — change these to match your setup
// ────────────────────────────────────────────────────────────
var PORTFOLIO_FOLDER_NAME = "Portfolio";
var PROJECTS_SHEET_NAME = "Projects";
var CONFIG_SHEET_NAME = "Config";

// ────────────────────────────────────────────────────────────
// MAIN SYNC FUNCTION
// ────────────────────────────────────────────────────────────
function syncPortfolio() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(PROJECTS_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(PROJECTS_SHEET_NAME);
  }

  // Ensure Config sheet exists with defaults
  ensureConfigSheet(ss);

  // Find the Portfolio folder
  var folders = DriveApp.getFoldersByName(PORTFOLIO_FOLDER_NAME);
  if (!folders.hasNext()) {
    Logger.log("Folder '" + PORTFOLIO_FOLDER_NAME + "' not found. Create it in Google Drive and add project subfolders.");
    return;
  }

  var portfolioFolder = folders.next();
  var projectFolders = portfolioFolder.getFolders();
  var projects = [];

  while (projectFolders.hasNext()) {
    var folder = projectFolders.next();
    var project = processProjectFolder(folder);
    if (project) {
      projects.push(project);
    }
  }

  // Sort: featured first, then by year descending, then by name
  projects.sort(function (a, b) {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.year !== b.year) return b.year.localeCompare(a.year);
    return a.title.localeCompare(b.title);
  });

  // Write to sheet
  writeProjectsToSheet(sheet, projects);

  Logger.log("Synced " + projects.length + " projects from Google Drive.");
}

// ────────────────────────────────────────────────────────────
// PROCESS A SINGLE PROJECT FOLDER
// ────────────────────────────────────────────────────────────
function processProjectFolder(folder) {
  var folderName = folder.getName();

  // Skip folders starting with _ or .
  if (folderName.charAt(0) === "_" || folderName.charAt(0) === ".") {
    return null;
  }

  // Get all image files
  var files = folder.getFiles();
  var images = [];
  var infoText = "";

  while (files.hasNext()) {
    var file = files.next();
    var mime = file.getMimeType();
    var name = file.getName().toLowerCase();

    if (mime.indexOf("image/") === 0) {
      images.push({
        name: file.getName(),
        id: file.getId(),
        url: getPublicImageUrl(file),
      });
    } else if (name === "info.txt") {
      infoText = file.getBlob().getDataAsString();
    }
  }

  if (images.length === 0) {
    return null;
  }

  // Sort images: files starting with "hero", "cover", "thumb", or "00" come first
  images.sort(function (a, b) {
    var aName = a.name.toLowerCase();
    var bName = b.name.toLowerCase();
    var aPriority = isPriorityImage(aName) ? 0 : 1;
    var bPriority = isPriorityImage(bName) ? 0 : 1;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return aName.localeCompare(bName);
  });

  // Parse info.txt
  var info = parseInfoText(infoText);

  // Generate slug from folder name
  var id = slugify(folderName);

  return {
    id: id,
    title: folderName,
    category: info.category || "Other",
    year: info.year || new Date().getFullYear().toString(),
    description: info.description || "",
    thumbnail: images[0].url,
    images: images.map(function (img) { return img.url; }).join(", "),
    featured: info.featured || "false",
  };
}

// ────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────

function getPublicImageUrl(file) {
  // Make file publicly accessible
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {
    Logger.log("Could not set sharing for " + file.getName() + ": " + e.message);
  }

  // Use the thumbnail endpoint which is most reliable for web embedding
  return "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w1200";
}

function isPriorityImage(name) {
  return name.indexOf("hero") === 0 ||
    name.indexOf("cover") === 0 ||
    name.indexOf("thumb") === 0 ||
    name.indexOf("00") === 0 ||
    name.indexOf("main") === 0;
}

function parseInfoText(text) {
  var info = {};
  if (!text) return info;

  var lines = text.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    var colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      var key = line.substring(0, colonIndex).trim().toLowerCase();
      var value = line.substring(colonIndex + 1).trim();
      info[key] = value;
    }
  }
  return info;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function writeProjectsToSheet(sheet, projects) {
  // Clear existing data
  sheet.clear();

  // Write header
  var headers = ["id", "title", "category", "year", "description", "thumbnail", "images", "featured"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");

  if (projects.length === 0) return;

  // Write data
  var data = projects.map(function (p) {
    return [p.id, p.title, p.category, p.year, p.description, p.thumbnail, p.images, p.featured];
  });
  sheet.getRange(2, 1, data.length, headers.length).setValues(data);

  // Auto-resize columns
  for (var i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
}

function ensureConfigSheet(ss) {
  var sheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  if (sheet) return;

  sheet = ss.insertSheet(CONFIG_SHEET_NAME);
  var defaults = [
    ["key", "value"],
    ["name", "Portfolio"],
    ["tagline", "Art / Architecture / Design"],
    ["email", "hello@example.com"],
    ["instagram", ""],
    ["linkedin", ""],
  ];
  sheet.getRange(1, 1, defaults.length, 2).setValues(defaults);
  sheet.getRange(1, 1, 1, 2).setFontWeight("bold");
  sheet.autoResizeColumn(1);
  sheet.autoResizeColumn(2);
}

// ────────────────────────────────────────────────────────────
// MENU — adds a "Portfolio" menu to the Sheet toolbar
// ────────────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Portfolio")
    .addItem("Sync from Drive now", "syncPortfolio")
    .addToUi();
}
