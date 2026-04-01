# AGENTS.md

## Cursor Cloud specific instructions

This repository (`portfolio-V1`) is a newly initialized project with no application code, dependencies, or build tooling yet.

### Current state
- The repo contains only a `README.md`.
- No package manager, framework, or language runtime has been chosen yet.
- There are no services to run, no tests to execute, and no linting configured.

### When the project is scaffolded
Once the project owner adds application code (e.g. a Next.js, Astro, or other portfolio framework), future agents should:
1. Re-run dependency discovery to identify the package manager and lockfile.
2. Update the VM update script accordingly (e.g. `npm install`, `pnpm install`).
3. Add framework-specific dev/build/test/lint commands to this section.
