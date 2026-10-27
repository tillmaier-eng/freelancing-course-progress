# Freelancing Course Progress

Static HTML/CSS/JavaScript website with Simple and Detailed course-progress views.

## Files
- `index.html` — Simple version
- `detailed.html` — Detailed version
- `css/index.css`, `css/detailed.css` — page-specific styles
- `js/index.js`, `js/detailed.js` — page-specific behavior
- `js/progress-sync.js` — shared unit-completion sync between versions

## Run locally
Open `index.html` in a browser. For a more realistic local web-server test, use VS Code Live Server.

## Deploy to Vercel
Import this repository into Vercel and use the project root as the deployment root. No build command or framework is required; this is a static site.

## Progress storage
Progress is stored in the browser's `localStorage` on the current browser/device and site origin. Existing `fcp` / `fcp2` progress keys are read for migration. Since the two versions have different topic granularity, topic-level checklists remain version-specific; completing or clearing an entire unit syncs that unit between versions.
