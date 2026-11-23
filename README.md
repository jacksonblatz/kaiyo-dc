# Kaiyō DC

A thought experiment for a modular, ring-shaped floating energy island and datacenter.

This is not a build plan. Nothing here has been engineered, permitted, or costed. The concept is location-agnostic; the maps use an example lead site on the Tokachi–Kushiro Pacific coast of eastern Hokkaido as a first-look placement, not a surveyed or permitted mooring.

## Contents

- `kaiyo_dc.blend` — Blender massing model (Layout C)
- `kaiyo_dc_build.py`, `kaiyo_dc_render.py` — scripts that build and render the model
- `renders/` — hero and cutaway stills, a flythrough MP4, and a preview GIF
- `page/` — write-up source, stills, site map, map script, and fonts
  - `kaiyo-dc-article.tsx` — structured article source for the concept write-up
  - `concept.jpg`, `site-plan.jpg`, `cross-section.jpg`, `sites-map.png`
  - `model-hero.jpg`, `model-cutaway.jpg`, `model-fly.gif`
  - `make_sites_map.py`, `fonts/`
- `page_3d_section.txt` — earlier draft notes for the 3D-model section

Intermediate render frames, test stills, editor backups, and internal page metadata are not included. The flythrough frames can be regenerated with `kaiyo_dc_render.py`.

## Regenerating the model and map

From the repository root, with Blender on `PATH`:

    blender -b kaiyo_dc.blend -P kaiyo_dc_build.py
    blender -b kaiyo_dc.blend -P kaiyo_dc_render.py -- hero
    blender -b kaiyo_dc.blend -P kaiyo_dc_render.py -- cutaway

To redraw the site map (Python 3, Matplotlib, and Pillow):

    python3 -m venv .venv
    .venv/bin/pip install matplotlib pillow
    .venv/bin/python page/make_sites_map.py

The existing `page/sites-map.png` is the last generated map. If you regenerate it, review the labels before committing.

## License

Documentation, images, renders, and the Blender model are [CC BY 4.0](LICENSE-CC-BY-4.0.txt). The Python and Blender scripts are [MIT](LICENSE-MIT.txt). Noto Sans under `page/fonts/` is [SIL OFL 1.1](page/fonts/OFL.txt). See `LICENSE` for the split.
