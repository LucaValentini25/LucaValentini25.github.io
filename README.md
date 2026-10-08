# lucavalentini25.github.io

Portfolio personal de Luca Valentini, sitio 100% estático en GitHub Pages. Sin build obligatorio, sin dependencias, sin cookies.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` · `work.html` · `projects.html` · `about.html` · `contact.html` | Páginas, en inglés |
| `privacy.html` · `es/privacy.html` | Política de privacidad en inglés y en español (enlazadas con `hreflang`). Si cambia una, cambiar la otra |
| `styles.css` · `main.js` | Estilo "escritorio" y JS opcional (año, link activo, YouTube diferido, formulario) |
| `analytics.js` | Umami Cloud, sin cookies. Solo carga en el dominio real |
| `data.json` | **Fuente única** de los archivos para máquinas. Se deriva de `Portfolio/Datos Portfolio Web.md` del workspace |
| `llms.txt` · `llms-full.txt` · `profile.json` · `sitemap.xml` | **Generados** por `tools/build.py`: no editarlos a mano |
| `robots.txt` | Permite todos los crawlers, incluidos los de IA |
| `tools/build.py` | Regenera los archivos de datos y el JSON-LD de `index.html` |
| `assets/fonts/` | Inter Tight e IBM Plex Sans alojadas en el sitio (SIL OFL 1.1, licencias incluidas) |
| `tools/og.html` | Plantilla de `assets/og.png` (imagen para redes) |

## Al cambiar contenido

1. Cambiar primero `Datos Portfolio Web.md` (workspace), después el HTML y `data.json`.
2. `python tools/build.py` y commitear los archivos generados junto con el cambio.

## Para revisar

Buscar `REVISAR` en `privacy.html` y `es/privacy.html`.
