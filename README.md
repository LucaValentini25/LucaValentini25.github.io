# Luca Valentini — Portfolio

**🟢 LIVE: https://lucavalentini25.github.io** (GitHub Pages, repo `LucaValentini25.github.io`, desde 2026-07-27).
Este es el link público que se comparte con reclutadores. Cambios: editar el `.md` fuente → sincronizar → push al repo.

Static portfolio site (HTML/CSS/JS, no build step). Content is derived from a single
source of truth: **`../Datos Portfolio Web.md`**.

## Golden rule

Edit content in **`Datos Portfolio Web.md`** first, then sync it into `index.html`.
Never hand-edit the site without reflecting the change in the `.md` — otherwise drift returns.
(Run `/portfolio-site` in `sync` mode to re-sync.)

## Files

Multi-page static site — shared `styles.css` + `main.js` across all pages.

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, what I do, selected work, CTA |
| `work.html` | Tools & Solutions — detailed case studies with media |
| `projects.html` | Projects — KYKUYO, Waxy, Brain App with media |
| `about.html` | About + Experience timeline + Skills |
| `contact.html` | Contact |
| `styles.css` | Dark game-dev theme, responsive |
| `main.js` | Nav (active state), mobile menu, scroll-reveal, media fallback |
| `assets/` | Images & videos — see `assets/README.md` for filenames |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Media

Case studies and projects reference images/videos in `assets/work/` and `assets/projects/`.
Until a file exists, the site shows a labeled placeholder — so it looks intentional even empty.
See **`assets/README.md`** for the exact filenames to drop in.

## Preview locally

Just open `index.html` in a browser, or:

```bash
# from this folder
python -m http.server 8000
# → http://localhost:8000
```

## Deploy to GitHub Pages

> ✅ **Ya desplegado con la Opción A.** Los pasos de abajo quedan como referencia / para redeploy.
> Para publicar cambios: commit + push a `main` en el repo `LucaValentini25.github.io`; Pages actualiza en ~1 min.

**Option A — dedicated user site (recommended, gives `lucavalentini25.github.io`):**

1. Create a public repo named exactly `LucaValentini25.github.io`.
2. Push the **contents of this `site/` folder** to the repo root (not the `site/` folder itself):
   ```bash
   cd "Portfolio/site"
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/LucaValentini25/LucaValentini25.github.io.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source: Deploy from branch → `main` / root**.
4. Live at **https://lucavalentini25.github.io** in ~1 minute.

**Option B — project site under an existing repo:**
Put these files in a `/docs` folder (or a `gh-pages` branch) and point Settings → Pages there.
URL will be `https://lucavalentini25.github.io/<repo-name>/`.

## Custom domain (optional)

Add a `CNAME` file with your domain and configure DNS. Then update the domain in Pages settings.
