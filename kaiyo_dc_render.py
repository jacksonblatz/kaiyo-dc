"""Render Kaiyō DC views from kaiyo_dc.blend.
blender -b kaiyo_dc.blend -P kaiyo_dc_render.py -- <hero|cutaway|fly> [res_pct] [samples] [frame_step] [frame_start]"""
import bpy, sys, os
argv = sys.argv[sys.argv.index("--") + 1:]
mode = argv[0]; pct = int(argv[1]) if len(argv) > 1 else 100
spp = int(argv[2]) if len(argv) > 2 else 64; step = int(argv[3]) if len(argv) > 3 else 1
start = int(argv[4]) if len(argv) > 4 else 1
OUT = os.path.join(os.path.dirname(bpy.data.filepath), "renders")
s = bpy.context.scene; c = s.cycles
s.render.engine = 'CYCLES'; c.device = 'CPU'; c.samples = spp; c.use_denoising = True
c.denoiser = 'OPENIMAGEDENOISE'; c.use_adaptive_sampling = True
c.max_bounces = 4; c.diffuse_bounces = 2; c.glossy_bounces = 2; c.transmission_bounces = 4
c.transparent_max_bounces = 16; c.caustics_reflective = c.caustics_refractive = False
s.render.use_persistent_data = True
front = bpy.data.collections["Cutaway_FrontHalf"]
front.hide_render = (mode == "cutaway")
bpy.data.collections["Cutaway_Only"].hide_render = (mode != "cutaway")
s.camera = bpy.data.objects[{"hero": "Cam_Hero", "cutaway": "Cam_Cutaway", "fly": "Cam_Fly"}[mode]]
if mode == "fly":
    s.render.resolution_x, s.render.resolution_y = 1280, 720
    s.render.resolution_percentage = pct; s.frame_step = step; s.frame_start = start
    s.render.image_settings.file_format = 'PNG'
    s.render.filepath = os.path.join(OUT, "frames", "f_")
    bpy.ops.render.render(animation=True)
else:
    s.render.resolution_x, s.render.resolution_y = (1920, 816) if mode == "cutaway" else (1920, 1080)
    s.render.resolution_percentage = pct
    s.render.image_settings.file_format = 'PNG'
    s.render.filepath = os.path.join(OUT, f"kaiyo_dc_{mode}.png")
    bpy.ops.render.render(write_still=True)
print("DONE", mode)
