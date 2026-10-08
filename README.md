# lucavalentini25.github.io

Portfolio personal de Luca Valentini, sitio 100% estático en GitHub Pages. Sin build obligatorio, sin dependencias, sin cookies.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` · `work.html` · `projects.html` · `about.html` · `contact.html` | Páginas, en inglés |
| `privacy.html` | Política de privacidad, en español |
| `styles.css` · `main.js` | Estilo "escritorio" y JS opcional (año, link activo, YouTube diferido, formulario) |
| `analytics.js` | Umami Cloud, sin cookies. **Completar el Website ID** |
| `data.json` | **Fuente única** de los archivos para máquinas. Se deriva de `Portfolio/Datos Portfolio Web.md` del workspace |
| `llms.txt` · `llms-full.txt` · `profile.json` · `sitemap.xml` | **Generados** por `tools/build.py`: no editarlos a mano |
| `robots.txt` | Permite todos los crawlers, incluidos los de IA |
| `tools/build.py` | Regenera los archivos de datos y el JSON-LD de `index.html` |
| `tools/og.html` | Plantilla de `assets/og.png` (imagen para redes) |

## Al cambiar contenido

1. Cambiar primero `Datos Portfolio Web.md` (workspace), después el HTML y `data.json`.
2. `python tools/build.py` y commitear los archivos generados junto con el cambio.

## Placeholders que hay que completar (buscar `REEMPLAZAR` y `COMPLETAR`)

- `analytics.js`: Website ID de Umami.
- `contact.html`: access key de Web3Forms.
- `projects.html`: trailer de Rollgeon.
- Fuentes: pasar de Google Fonts a `assets/fonts/` (ver el comentario `REVISAR` en el `<head>`).
