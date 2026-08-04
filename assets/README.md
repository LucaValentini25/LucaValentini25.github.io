# Media assets

> 📌 **La lista de trabajo con instrucciones paso a paso está en `../../media/README.md`.**
> Las capturas nuevas van crudas a `../../media/raw/` — no hace falta renombrarlas.
> Este archivo solo documenta los nombres finales que espera el HTML.

Hasta que un archivo exista, el sitio muestra un placeholder con su nombre — no se rompe nada.

Recomendado: imágenes **1600×900** o más (16:9), PNG/JPG/WebP · videos **MP4 (H.264)**, pocos MB.

## `assets/work/` — case studies

| Archivo | Qué muestra | Caso |
|---|---|---|
| `waxy-jump-preview.png` | Jump Preview Tool con el mesh de alcance visible en el Scene View | `#waxy-editor` |
| `waxy-blockout.png` | Blockout de ProBuilder convertido a prefabs finales | `#waxy-editor` |
| `npc-gpu.png` | Multitud de NPCs renderizada con GPU skinning | `#npc-gpu` |
| `npc-gpu.mp4` | Gameplay con NPCs corriendo en un dispositivo | `#npc-gpu` |
| `kykuyo-tooling.png` | Addressables Folder Manager o la suite Solar Tools | `#kykuyo-tooling` |
| `dressing-tools.png` | Outfit Editor — composición de un outfit como data | `#dressing-system` |
| `dressing-ingame.png` | La misma data renderizada en el juego | `#dressing-system` |
| `camera-context.png` | Distintos contextos de cámara (o un diagrama del arbitraje) | `#camera-context` |
| `external-tooling.png` | Bot de Slack creando y reasignando un ticket | `#external-tooling` |

## `assets/projects/` — tarjetas de proyecto

| Archivo | Qué muestra |
|---|---|
| `solar-cover.png` | Portada de SOLAR — también sirve de poster del trailer |
| `solar-trailer.mp4` | Trailer de SOLAR (o reemplazar por un embed de YouTube, ver `projects.html`) |
| `solar-1.png` | Screenshot de SOLAR |
| `spca-cover.png` | SPCA × SOLAR, el juego de rescate de gatos (campaña, ya offline) |
| `waxy-1.png` | Screenshot de Waxy |
| `unity-tools.png` | Asset Renamer, pestaña Settings con la tabla de reglas |
| `brainapp-architecture.png` | Diagrama de arquitectura en capas de Brain App |

**El trailer de Waxy no lleva archivo:** está embebido desde YouTube en `projects.html`.
Solo hay que reemplazar `VIDEO_ID_WAXY` por el ID del video.

## Tips
- Los covers hacen de poster de los videos (el primer frame antes del play).
- Comprimí los PNG grandes (squoosh.app) antes de commitear.
