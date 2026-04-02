import { readdirSync, copyFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";

const outDir = join(process.cwd(), "out");

function copyHtmlToIndexFiles(dir) {
  if (!existsSync(dir)) return;

  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_")) continue;

    const dirPath = join(dir, entry.name);
    const htmlFile = join(dir, `${entry.name}.html`);
    const indexFile = join(dirPath, "index.html");

    if (existsSync(htmlFile) && !existsSync(indexFile)) {
      copyFileSync(htmlFile, indexFile);
    }

    copyHtmlToIndexFiles(dirPath);
  }
}

copyHtmlToIndexFiles(outDir);

// Fetch project IDs from Google Sheet and create directories for client-side routing.
// This ensures Nginx can serve the page even for IDs that weren't known at build time.
async function createDynamicProjectPages() {
  const projectDir = join(outDir, "project");
  const templatePage = join(projectDir, "concrete-horizon.html");

  if (!existsSync(templatePage)) {
    console.log("Postbuild: no template page found, skipping dynamic pages");
    return;
  }

  const templateHtml = readFileSync(templatePage, "utf-8");

  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  if (!sheetId) {
    console.log("Postbuild: no GOOGLE_SHEET_ID, skipping dynamic project pages");
    return;
  }

  const tab = process.env.NEXT_PUBLIC_PROJECTS_TAB || "Projects";
  try {
    const res = await fetch(
      `https://opensheet.elk.sh/${sheetId}/${encodeURIComponent(tab)}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const projects = await res.json();

    let created = 0;
    for (const p of projects) {
      const id = p.id;
      if (!id) continue;

      const dir = join(projectDir, id);
      const indexFile = join(dir, "index.html");
      const htmlFile = join(projectDir, `${id}.html`);

      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      if (!existsSync(indexFile)) {
        copyFileSync(templatePage, indexFile);
        created++;
      }
      if (!existsSync(htmlFile)) {
        copyFileSync(templatePage, htmlFile);
      }
    }
    console.log(`Postbuild: created ${created} dynamic project pages from sheet`);
  } catch (err) {
    console.log(`Postbuild: could not fetch sheet data: ${err.message}`);
  }
}

await createDynamicProjectPages();
console.log("Postbuild: done");
