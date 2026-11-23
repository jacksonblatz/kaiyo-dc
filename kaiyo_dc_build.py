"""Kaiyō DC – Layout C stylized 3D blockout generator (Blender 4.2, bpy).
Units: 1 BU = 1 m (rough concept scale, ~1 km ring).
Run: blender -b -P kaiyo_dc_build.py            -> builds scene, saves kaiyo_dc.blend
"""
import bpy, bmesh, math, random, os
from mathutils import Matrix, Vector

OUT = os.path.dirname(os.path.abspath(__file__))
random.seed(7)
TAU = math.tau
D = math.radians

# ---------------------------------------------------------------- reset
bpy.ops.wm.read_factory_settings(use_empty=True)
scn = bpy.context.scene

def coll(name, parent=None):
    c = bpy.data.collections.new(name)
    (parent or scn.collection).children.link(c)
    return c

C_SURF = coll("Surface"); C_FRONT = coll("Cutaway_FrontHalf")   # objects hidden in the cutaway
C_SUB = coll("Submerged"); C_ENV = coll("Environment")

# ---------------------------------------------------------------- materials
def mat(name, col, rough=0.5, metal=0.0, alpha=1.0, emit=None, estr=0.0, tex=None):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; p = nt.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (*col, 1)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Metallic"].default_value = metal
    p.inputs["Alpha"].default_value = alpha
    if emit:
        p.inputs["Emission Color"].default_value = (*emit, 1)
        p.inputs["Emission Strength"].default_value = estr
    if tex == "tiles":  # flush solar tiles: dark blue cells with thin silver grid
        tc = nt.nodes.new("ShaderNodeTexCoord"); mp = nt.nodes.new("ShaderNodeMapping")
        mp.inputs["Scale"].default_value = (0.25, 0.25, 0.25)
        br = nt.nodes.new("ShaderNodeTexBrick")
        br.inputs["Color1"].default_value = (*col, 1)
        br.inputs["Color2"].default_value = (col[0]*1.3, col[1]*1.3, col[2]*1.4, 1)
        br.inputs["Mortar"].default_value = (0.55, 0.58, 0.62, 1)
        br.inputs["Mortar Size"].default_value = 0.04
        br.inputs["Brick Width"].default_value = 1.0; br.inputs["Row Height"].default_value = 0.6
        br.offset = 0.0
        nt.links.new(tc.outputs["Object"], mp.inputs["Vector"])
        nt.links.new(mp.outputs["Vector"], br.inputs["Vector"])
        nt.links.new(br.outputs["Color"], p.inputs["Base Color"])
    if alpha < 1:
        m.blend_method = "BLEND"
    return m

M = dict(
    hull=mat("Hull_White", (0.82, 0.83, 0.84), 0.6),
    hull_dark=mat("Hull_Waterline", (0.25, 0.28, 0.30), 0.7),
    solar=mat("Solar_Tiles", (0.03, 0.05, 0.12), 0.25, 0.3, tex="tiles"),
    glass=mat("Solar_Glass", (0.10, 0.16, 0.22), 0.05, 0.2, alpha=0.30),
    mullion=mat("Mullions", (0.75, 0.77, 0.80), 0.4, 0.8),
    deck=mat("Forest_Soil", (0.20, 0.16, 0.10), 0.9),
    grass=mat("Grass", (0.12, 0.30, 0.08), 0.9),
    leaf=[mat("Leaf_A", (0.05, 0.28, 0.06), 0.8), mat("Leaf_B", (0.12, 0.36, 0.08), 0.8),
          mat("Leaf_C", (0.04, 0.20, 0.10), 0.8)],
    trunk=mat("Trunk", (0.25, 0.15, 0.07), 0.9),
    concrete=mat("Service_Deck", (0.45, 0.46, 0.47), 0.8),
    steel=mat("Steel", (0.55, 0.57, 0.6), 0.35, 0.9),
    crane=mat("Crane_Orange", (0.85, 0.35, 0.05), 0.5),
    tank=mat("Tanks", (0.78, 0.80, 0.82), 0.3, 0.6),
    desal=mat("Desal_Block", (0.30, 0.55, 0.65), 0.5),
    hubglass=mat("Hub_Glass", (0.35, 0.55, 0.65), 0.05, 0.3, alpha=0.45),
    obsglass=mat("Obs_Tube_Glass", (0.6, 0.85, 0.95), 0.02, 0.0, alpha=0.18),
    core=mat("Elevator_Core", (0.88, 0.88, 0.86), 0.5),
    mixed=mat("MixedUse_Warm", (0.95, 0.80, 0.55), 0.5, emit=(1.0, 0.75, 0.4), estr=1.5),
    pod=mat("GPU_Pod", (0.55, 0.58, 0.63), 0.25, 0.85),
    podlight=mat("Pod_Status", (0.2, 0.8, 1.0), 0.5, emit=(0.1, 0.7, 1.0), estr=6.0),
    corridor=mat("Corridor", (0.95, 0.95, 0.95), 0.4, emit=(0.9, 0.95, 1.0), estr=0.6),
    frame=mat("Frame", (0.40, 0.42, 0.45), 0.5, 0.8),
    wec=mat("WEC_Yellow", (0.95, 0.75, 0.10), 0.5),
    cable=mat("Umbilical", (0.95, 0.45, 0.05), 0.6, emit=(1.0, 0.4, 0.0), estr=0.8),
    mooring=mat("Mooring", (0.15, 0.15, 0.15), 0.7),
    brine=mat("Brine_Pipe", (0.55, 0.30, 0.60), 0.6),
    intake=mat("Intake_Pipe", (0.20, 0.45, 0.85), 0.6),
    water=mat("Water", (0.01, 0.10, 0.16), 0.05, 0.0, alpha=0.62),
    lagoon=mat("Lagoon", (0.05, 0.40, 0.40), 0.05, 0.0, alpha=0.45),
    seabed=mat("Seabed", (0.10, 0.15, 0.15), 1.0),
    deep=mat("Deep_Backdrop", (0.0, 0.05, 0.1), 1.0, emit=(0.01, 0.09, 0.16), estr=1.0),
    boat=mat("Boat", (0.9, 0.9, 0.9), 0.4),
)

# ---------------------------------------------------------------- mesh helpers
def obj_from_bm(name, bm, material, collection, smooth=False):
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    if smooth:
        for p in me.polygons: p.use_smooth = True
    ob = bpy.data.objects.new(name, me); collection.objects.link(ob)
    if isinstance(material, list):
        for mm in material: me.materials.append(mm)
    else:
        me.materials.append(material)
    return ob

def sector(bm, r0, r1, a0, a1, z0, z1, steps=6):
    """closed annular-sector box"""
    vs = []
    for i in range(steps + 1):
        a = a0 + (a1 - a0) * i / steps; c, s = math.cos(a), math.sin(a)
        vs.append([bm.verts.new((r * c, r * s, z)) for (r, z) in ((r0, z0), (r1, z0), (r1, z1), (r0, z1))])
    for i in range(steps):
        A, B = vs[i], vs[i + 1]
        for k in range(4):
            bm.faces.new((A[k], A[(k + 1) % 4], B[(k + 1) % 4], B[k]))
    bm.faces.new(vs[0][::-1]); bm.faces.new(vs[-1])

def profile_sweep(bm, prof, a0, a1, steps, close_ends=True):
    """sweep a closed (r,z) profile loop around Z between angles"""
    rings = []
    for i in range(steps + 1):
        a = a0 + (a1 - a0) * i / steps; c, s = math.cos(a), math.sin(a)
        rings.append([bm.verts.new((r * c, r * s, z)) for (r, z) in prof])
    n = len(prof)
    for i in range(steps):
        for k in range(n):
            bm.faces.new((rings[i][k], rings[i][(k + 1) % n], rings[i + 1][(k + 1) % n], rings[i + 1][k]))
    if close_ends:
        bm.faces.new(rings[0][::-1]); bm.faces.new(rings[-1])

def box(bm, cx, cy, cz, sx, sy, sz, rot=0.0):
    m = Matrix.Translation((cx, cy, cz)) @ Matrix.Rotation(rot, 4, 'Z') @ Matrix.Diagonal((sx, sy, sz, 1))
    bmesh.ops.create_cube(bm, size=1.0, matrix=m)

def cyl(bm, p, r, h, segs=24, r2=None, rotm=None):
    m = Matrix.Translation(p) @ (rotm or Matrix())
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segs, radius1=r, radius2=r if r2 is None else r2, depth=h, matrix=m)

def sphere(bm, p, r, sz=1.0, segs=12, rings=8):
    m = Matrix.Translation(p) @ Matrix.Diagonal((1, 1, sz, 1))
    bmesh.ops.create_uvsphere(bm, u_segments=segs, v_segments=rings, radius=r, matrix=m)

def tube_between(bm, a, b, r, segs=10):
    a, b = Vector(a), Vector(b); d = b - a
    rot = d.to_track_quat('Z', 'Y').to_matrix().to_4x4()
    cyl(bm, (a + b) / 2, r, d.length, segs, rotm=rot)

def torus_ring(bm, R, z, rmin, segs=128, msegs=10):
    prof = [(R + rmin * math.cos(t), z + rmin * math.sin(t)) for t in [TAU * k / msegs for k in range(msegs)]]
    profile_sweep(bm, prof, 0, TAU, segs, close_ends=False)

def curve_obj(name, pts, bevel, material, collection, res=12):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'
    cu.bevel_depth = bevel; cu.bevel_resolution = 2; cu.resolution_u = res
    sp = cu.splines.new('BEZIER'); sp.bezier_points.add(len(pts) - 1)
    for bp, p in zip(sp.bezier_points, pts):
        bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
    ob = bpy.data.objects.new(name, cu); collection.objects.link(ob)
    cu.materials.append(material); return ob

def is_front(a):  # cutaway removes the west half (x<0): angles 90..270 deg
    a = a % TAU
    return D(90) - 1e-6 <= a <= D(270) + 1e-6

# ---------------------------------------------------------------- key dimensions (concept)
# Design update: the ENTIRE perimeter ring is the biosphere -> one continuous, low, aerodynamic
# torus shell (glazed solar glass on top + inner faces, solar tiles on outer + lower faces).
R_C, A = 400, 100                 # shell centre radius and half-width -> ring spans r 300..500 (~1 km dia)
R_IN, R_OUT = R_C - A, R_C + A
Z_SPRING, B_UP, B_DN = 2, 34, 12  # low profile: 36 m crown above sea, 10 m draft
Z_KEEL = Z_SPRING - B_DN
Z_DECK = 2                        # forest floor inside the shell
Z_SVC = 6                         # service apron deck
SERVICE = (D(-60), D(-30))        # service apron, SE side (outboard of the shell)
BRIDGE_A = D(-90)                 # bridge heads south from the shell's inner face to the hub
HUB_R = 22
RINGS = [(430, -32), (340, -58), (250, -84)]   # inverted tiered cake: (radius, depth)
SEABED = -112
N_RIB = 48                        # storm-shutter / rib bands = module joints (7.5 deg modules)

def shell_pt(t, grow=0.0):
    c, s_ = math.cos(t), math.sin(t)
    return (R_C + (A + grow) * c, Z_SPRING + ((B_UP if s_ > 0 else B_DN) + grow) * s_)

def t_is_glass(t):  # top + inner faces glazed; outer + lower faces solar tiles
    t = t % TAU
    return D(28) <= t <= D(200)

halves = {True: C_FRONT, False: C_SURF}
NT = 48
for front in (False, True):
    tag = "W" if front else "E"
    a_lo, a_hi = (D(90), D(270)) if front else (D(-90), D(90))
    steps = 96
    bm_g, bm_s = bmesh.new(), bmesh.new()
    ts = [TAU * k / NT for k in range(NT + 1)]
    for bmx, want_glass in ((bm_g, True), (bm_s, False)):
        verts = {}
        for i in range(steps + 1):
            a = a_lo + (a_hi - a_lo) * i / steps; c, s_ = math.cos(a), math.sin(a)
            for k in range(NT + 1):
                r, z = shell_pt(ts[k]); verts[i, k] = bmx.verts.new((r * c, r * s_, z))
        for i in range(steps):
            for k in range(NT):
                if t_is_glass((ts[k] + ts[k + 1]) / 2) == want_glass:
                    bmx.faces.new((verts[i, k], verts[i, k + 1], verts[i + 1, k + 1], verts[i + 1, k]))
        bmesh.ops.remove_doubles(bmx, verts=bmx.verts, dist=0.01)
        loose = [v for v in bmx.verts if not v.link_faces]
        bmesh.ops.delete(bmx, geom=loose, context='VERTS')
    for nm, bmx, mm in (("Biosphere_Shell_SolarGlass", bm_g, M["glass"]), ("Biosphere_Shell_SolarTiles", bm_s, M["solar"])):
        o = obj_from_bm(f"{nm}_{tag}", bmx, mm, halves[front], smooth=True)
        so = o.modifiers.new("thickness", 'SOLIDIFY'); so.thickness = 1.2; so.offset = -1
        if mm is M["solar"]:
            # tile UVs: arc length around the ring x profile, so the brick grid reads as tiles
            pass
    # storm-shutter / rib bands at every module joint + a few longitudinal glazing bars
    bm_r = bmesh.new()
    prof = [shell_pt(TAU * k / 40, 0.9) for k in range(40)]
    for j in range(N_RIB):
        a = TAU * j / N_RIB
        if is_front(a + D(0.1)) != front: continue
        profile_sweep(bm_r, prof, a - D(0.35), a + D(0.35), 1)
    for tt_ in (D(45), D(70), D(90), D(110), D(135), D(160)):
        r, z = shell_pt(tt_, 0.6)
        prof2 = [(r + 0.35 * math.cos(u), z + 0.35 * math.sin(u)) for u in [TAU * q / 6 for q in range(6)]]
        profile_sweep(bm_r, prof2, a_lo, a_hi, 96)
    obj_from_bm(f"Biosphere_RibBands_{tag}", bm_r, M["mullion"], halves[front])
    # forest floor inside the shell (soil + grass)
    bm_d, bm_gr = bmesh.new(), bmesh.new()
    sector(bm_d, R_IN + 3, R_OUT - 3, a_lo, a_hi, -8, Z_DECK, steps=96)
    sector(bm_gr, R_IN + 6, R_OUT - 6, a_lo, a_hi, Z_DECK, Z_DECK + 0.3, steps=96)
    obj_from_bm(f"Forest_Floor_{tag}", bm_d, M["deck"], halves[front])
    obj_from_bm(f"Forest_Grass_{tag}", bm_gr, M["grass"], halves[front])

# ---------------------------------------------------------------- service apron (outboard, SE)
bm = bmesh.new()
sector(bm, R_OUT - 12, R_OUT + 80, SERVICE[0], SERVICE[1], -8, Z_SVC, steps=12)
obj_from_bm("Service_Apron", bm, M["concrete"], C_SURF)

# ---------------------------------------------------------------- trees (simple instances) inside the biosphere
for front in (False, True):
    bm_t = bmesh.new(); canopies = [bmesh.new() for _ in range(3)]
    n = 0
    while n < 900:
        r = math.sqrt(random.uniform((R_IN + 10) ** 2, (R_OUT - 10) ** 2))
        a = random.uniform(0, TAU)
        if is_front(a) != front: continue
        x, y = r * math.cos(a), r * math.sin(a)
        rel = (r - R_C) / A
        hmax = B_UP * math.sqrt(max(0.0, 1 - rel * rel))
        h = min(random.uniform(9, 22), hmax - 5)
        if h < 5: continue
        cyl(bm_t, (x, y, Z_DECK + h * 0.3), 0.7, h * 0.6, 6)
        sphere(canopies[n % 3], (x, y, Z_DECK + h * 0.7), random.uniform(4, 7), 1.1, 8, 6)
        n += 1
    tag = "W" if front else "E"
    obj_from_bm(f"Trees_Trunks_{tag}", bm_t, M["trunk"], halves[front])
    for k in range(3):
        obj_from_bm(f"Trees_Canopy{k}_{tag}", canopies[k], M["leaf"][k], halves[front], smooth=True)

# ---------------------------------------------------------------- bridge + central hub
bm = bmesh.new()
L0, L1 = HUB_R, R_IN + 12
cx, cy = math.cos(BRIDGE_A), math.sin(BRIDGE_A)
mid = (L0 + L1) / 2
box(bm, cx * mid, cy * mid, 11, 12, L1 - L0, 1.4, rot=BRIDGE_A - math.pi / 2)
for side in (-6, 6):  # railings / girders
    px, py = -cy * side, cx * side
    box(bm, cx * mid + px, cy * mid + py, 12.5, 0.4, L1 - L0, 1.6, rot=BRIDGE_A - math.pi / 2)
for d in range(50, 300, 50):  # piers into the lagoon / deck
    cyl(bm, (cx * d, cy * d, 2), 1.4, 18, 10)
obj_from_bm("Bridge", bm, M["hull"], C_SURF)

bm = bmesh.new()
cyl(bm, (0, 0, (SEABED + 30 + 66) / 2), 9, 66 - (SEABED + 30), 32)   # elevator core, deck to below rings
obj_from_bm("Hub_ElevatorCore", bm, M["core"], C_SURF)
bm = bmesh.new(); bm2 = bmesh.new()
cyl(bm, (0, 0, 8), HUB_R, 8, 48)                                       # lobby where the bridge lands
for k, z in enumerate((44, 50, 56, 62)):                               # mixed-use floors at the top only
    cyl(bm, (0, 0, z - 2.6), HUB_R + 2, 0.8, 48)
    cyl(bm2, (0, 0, z), HUB_R, 4.4, 48)
cyl(bm, (0, 0, 66), HUB_R + 3, 1.2, 48)
cyl(bm, (0, 0, 72), 3, 12, 12, r2=0.5)                                 # mast
for a in range(0, 360, 60):                                            # slim shaft columns
    cyl(bm, (12 * math.cos(D(a)), 12 * math.sin(D(a)), 26), 1.2, 36, 8)
obj_from_bm("Hub_Structure", bm, M["hull"], C_SURF)
obj_from_bm("Hub_MixedUse_Floors", bm2, M["mixed"], C_SURF)
bm = bmesh.new()
cyl(bm, (0, 0, -9), 16, 26, 48)                                        # glass observation tube into the water
obj_from_bm("Observation_Tube", bm, M["obsglass"], C_SURF)
bm = bmesh.new()
cyl(bm, (0, 0, -20), 24, 3, 48); cyl(bm, (0, 0, -8), 18, 1, 48)
obj_from_bm("Observation_Level", bm, M["hull"], C_SURF)
bm = bmesh.new()
cyl(bm, (0, 0, -17), 24.2, 3, 48, )
obj_from_bm("Observation_Windows", bm, M["hubglass"], C_SURF)

# ---------------------------------------------------------------- service segment: crane, pod lift, dock, desal
sa = (SERVICE[0] + SERVICE[1]) / 2
def polar(r, a, z): return (r * math.cos(a), r * math.sin(a), z)
bm_st, bm_cr, bm_tk, bm_ds, bm_bt = (bmesh.new() for _ in range(5))
# crane (tower + boom + counter-jib)
cxp = polar(560, sa + D(7), Z_SVC)
cyl(bm_cr, (cxp[0], cxp[1], Z_SVC + 22), 1.8, 44, 8)
box(bm_cr, cxp[0], cxp[1], Z_SVC + 2, 8, 8, 4)
ang = sa + D(6)
for L, z, w in ((32, Z_SVC + 44, 2.2),):
    box(bm_cr, cxp[0] + math.cos(ang) * 18, cxp[1] + math.sin(ang) * 18, z, 60, w, w, rot=ang)
box(bm_cr, cxp[0] - math.cos(ang) * 12, cxp[1] - math.sin(ang) * 12, Z_SVC + 43, 6, 5, 4, rot=ang)
hook = (cxp[0] + math.cos(ang) * 44, cxp[1] + math.sin(ang) * 44)
cyl(bm_cr, (hook[0], hook[1], Z_SVC + 30), 0.25, 28, 6)
obj_from_bm("Service_Crane", bm_cr, M["crane"], C_SURF)
# pod lift: gantry frame over a moonpool shaft
pl = polar(545, sa - D(3), Z_SVC)
for dx in (-9, 9):
    for dy in (-9, 9):
        cyl(bm_st, (pl[0] + dx, pl[1] + dy, Z_SVC + 12), 0.8, 24, 8)
box(bm_st, pl[0], pl[1], Z_SVC + 24, 20, 20, 1.5)
tube_between(bm_st, (pl[0], pl[1], Z_SVC), polar(RINGS[0][0] + 13, sa - D(3), RINGS[0][1] + 6), 4.5, 16)   # inclined pod-lift shaft to top ring
# dock: pier out to sea + boat
da = sa - D(5)
p0 = polar(R_OUT + 80, da, 0); p1 = polar(R_OUT + 200, da, 0)
box(bm_st, (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, 2, 120, 14, 2.4, rot=da)
for d in range(10, 121, 22):
    q = polar(R_OUT + 80 + d, da, 0); cyl(bm_st, (q[0], q[1], -4), 1, 12, 8)
q = polar(R_OUT + 150, da + D(2.2), 0)
box(bm_bt, q[0], q[1], 1.5, 40, 10, 4, rot=da); box(bm_bt, q[0], q[1], 5, 14, 7, 4, rot=da)
obj_from_bm("Service_PodLift_Dock", bm_st, M["steel"], C_SURF)
obj_from_bm("Service_Boat", bm_bt, M["boat"], C_SURF)
# desalination block (waste-heat thermal, RO backup) + freshwater tanks
dp = polar(530, sa + D(-9), Z_SVC)
box(bm_ds, dp[0], dp[1], Z_SVC + 8, 46, 26, 16, rot=sa - D(8))
box(bm_ds, dp[0], dp[1], Z_SVC + 17, 30, 16, 3, rot=sa - D(8))
obj_from_bm("Desalination_Plant", bm_ds, M["desal"], C_SURF)
for k in range(4):
    tp = polar(565, sa + D(-12 + k * 2.6), Z_SVC)
    cyl(bm_tk, (tp[0], tp[1], Z_SVC + 7), 6, 14, 24)
obj_from_bm("Freshwater_Tanks", bm_tk, M["tank"], C_SURF)
# seawater intake (seaward) and brine diffuser outfall (away from lagoon) as pipes
ip0 = polar(R_OUT + 80, sa - D(12), -2)
curve_obj("Seawater_Intake", [Vector(ip0), Vector(polar(R_OUT + 140, sa - D(13), -15)), Vector(polar(R_OUT + 200, sa - D(14), -25))], 1.5, M["intake"], C_SURF)
bp0 = polar(R_OUT + 80, sa + D(3), -4)
curve_obj("Brine_Diffuser_Outfall", [Vector(bp0), Vector(polar(R_OUT + 160, sa + D(2), -40)), Vector(polar(R_OUT + 270, sa + D(1), SEABED + 3))], 1.2, M["brine"], C_SURF)
bm = bmesh.new(); q = polar(R_OUT + 270, sa + D(1), SEABED + 3)
cyl(bm, q, 6, 4, 16); obj_from_bm("Brine_Diffuser_Head", bm, M["brine"], C_SURF)

# ---------------------------------------------------------------- wave energy converters (outer breakwater)
for front in (False, True):
    bm, bmt = bmesh.new(), bmesh.new()
    for k in range(36):
        a = TAU * k / 36 + D(5)
        if is_front(a) != front: continue
        if SERVICE[0] - D(8) < ((a + math.pi) % TAU - math.pi) < SERVICE[1] + D(4): continue
        p = polar(640, a, 0)
        m = Matrix.Translation(p) @ Matrix.Rotation(a, 4, 'Z') @ Matrix.Diagonal((5, 14, 3.5, 1))
        bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=1, matrix=m)
        tube_between(bmt, polar(R_OUT - 4, a, -3), polar(640, a, -1), 0.6, 6)   # arm to the ring
    tag = "W" if front else "E"
    obj_from_bm(f"Wave_Converters_{tag}", bm, M["wec"], halves[front], smooth=True)
    obj_from_bm(f"Wave_Converter_Arms_{tag}", bmt, M["steel"], halves[front])

# ---------------------------------------------------------------- submerged stacked pod rings
for idx, (R, z) in enumerate(RINGS):
    bm_p, bm_l, bm_c, bm_f = (bmesh.new() for _ in range(4))
    torus_ring(bm_c, R, z, 4.0, 160, 10)                 # circular corridor
    for dr in (-13, 13):                                 # frame rails
        torus_ring(bm_f, R + dr, z + 9, 0.8, 160, 6)
        torus_ring(bm_f, R + dr, z - 9, 0.8, 160, 6)
    n = int(TAU * R / 13)
    for k in range(n):
        a = TAU * k / n; c, s = math.cos(a), math.sin(a)
        for dr in (-13, 13):                             # two rows of GPU/server pods
            for dz in (-4.2, 4.2):
                sphere(bm_p, ((R + dr) * c, (R + dr) * s, z + dz), 4.3, 0.95, 10, 7)
            sphere(bm_l, ((R + dr * 1.33) * c, (R + dr * 1.33) * s, z), 0.6, 1, 6, 4)
        if k % 4 == 0:                                   # cross links pod row <-> corridor
            tube_between(bm_f, ((R - 13) * c, (R - 13) * s, z), ((R + 13) * c, (R + 13) * s, z), 1.0, 6)
    for k in range(4):                                   # spokes to the central core
        a = TAU * k / 4 + D(45 + idx * 15)
        tube_between(bm_c, polar(10, a, z), polar(R - 4, a, z), 2.5, 12)
    obj_from_bm(f"PodRing{idx+1}_Pods", bm_p, M["pod"], C_SUB, smooth=True)
    obj_from_bm(f"PodRing{idx+1}_StatusLights", bm_l, M["podlight"], C_SUB)
    obj_from_bm(f"PodRing{idx+1}_Corridor_Spokes", bm_c, M["corridor"], C_SUB, smooth=True)
    obj_from_bm(f"PodRing{idx+1}_Frame", bm_f, M["frame"], C_SUB)

bm = bmesh.new()
for k in range(12):                                      # tier-to-tier struts (wedding-cake stack)
    a = TAU * k / 12 + D(7.5)
    tube_between(bm, polar(450, a, Z_KEEL), polar(RINGS[0][0] + 13, a, RINGS[0][1] + 9), 1.2, 8)
    for i in range(2):
        (Ra, za), (Rb, zb) = RINGS[i], RINGS[i + 1]
        tube_between(bm, polar(Ra - 13, a, za - 9), polar(Rb + 13, a, zb + 9), 1.2, 8)
obj_from_bm("Tier_Struts", bm, M["frame"], C_SUB)
bm = bmesh.new()
Rb, zb = RINGS[-1]
for k in range(16):                                      # only the bottom ring: vertical tubes to seabed
    a = TAU * k / 16
    for dr in (-13, 13):
        p = polar(Rb + dr, a, 0)
        cyl(bm, (p[0], p[1], (zb - 9 + SEABED) / 2), 1.6, (zb - 9) - SEABED, 12)
        cyl(bm, (p[0], p[1], SEABED + 1), 4, 2, 16)
cyl(bm, (0, 0, SEABED + 15), 12, 6, 32)                  # core foot
obj_from_bm("BottomRing_Seabed_Tubes", bm, M["steel"], C_SUB)

# umbilicals (power/data/coolant) from the service segment & hub down to the rings, plus export cable
for i, (R, z) in enumerate(RINGS):
    a = sa + D(4 + i * 3)
    curve_obj(f"Umbilical_{i+1}", [Vector(polar(560, a, -8)), Vector(polar(R + 30, a + D(1), (Z_KEEL + z) / 2)),
                                   Vector(polar(R + 13, a + D(2), z))], 0.9, M["cable"], C_SUB)
curve_obj("Export_Cable", [Vector(polar(RINGS[-1][0], sa + D(14), RINGS[-1][1])),
                           Vector(polar(600, sa + D(16), SEABED + 2)), Vector(polar(1400, sa + D(18), SEABED + 1))], 1.2, M["cable"], C_SUB)
# moorings: catenary lines from the outer hull to seabed anchors
bm_a = bmesh.new()
for k in range(16):
    a = TAU * k / 16 + D(11.25)
    p0, p2 = polar(R_OUT - 6, a, -4), polar(900, a, SEABED + 1)
    curve_obj(f"Mooring_{k:02d}", [Vector(p0), Vector(polar(640, a, SEABED * 0.75)), Vector(p2)], 0.5, M["mooring"],
              C_FRONT if is_front(a) else C_ENV)
    box(bm_a, p2[0], p2[1], SEABED + 2, 8, 8, 4, rot=a)
obj_from_bm("Mooring_Anchors", bm_a, M["mooring"], C_ENV)

# ---------------------------------------------------------------- environment: water, lagoon, seabed, deep backdrop
for front in (False, True):
    bm = bmesh.new()
    a_lo, a_hi = (D(90), D(270)) if front else (D(-90), D(90))
    # open water annulus outside the ring, and lagoon disc inside the forest deck (surface only)
    for (r0, r1, mname) in ((R_OUT - 1, 5000, "water"),):
        rings = []
        for i in range(97):
            a = a_lo + (a_hi - a_lo) * i / 96
            rings.append([bm.verts.new((r * math.cos(a), r * math.sin(a), 0)) for r in (r0, 700, 1500, r1)])
        for i in range(96):
            for k in range(3):
                bm.faces.new((rings[i][k], rings[i][k + 1], rings[i + 1][k + 1], rings[i + 1][k]))
    tag = "W" if front else "E"
    obj_from_bm(f"Sea_Surface_{tag}", bm, M["water"], halves[front], smooth=True)
    bm = bmesh.new(); rings = []
    for i in range(65):
        a = a_lo + (a_hi - a_lo) * i / 64
        rings.append([bm.verts.new((r * math.cos(a), r * math.sin(a), 0.1)) for r in (HUB_R, R_IN + 4)])
    for i in range(64):
        bm.faces.new((rings[i][0], rings[i][1], rings[i + 1][1], rings[i + 1][0]))
    obj_from_bm(f"Lagoon_Surface_{tag}", bm, M["lagoon"], halves[front], smooth=True)
for ob in bpy.data.objects:
    if ob.name.startswith(("Sea_Surface", "Lagoon")):
        d = ob.modifiers.new("ripples", 'DISPLACE')
        t = bpy.data.textures.new(ob.name + "_tex", 'CLOUDS'); t.noise_scale = 25
        d.texture = t; d.strength = 0.6; d.mid_level = 0.5
        ob.visible_shadow = False  # let sunlight reach the submerged rings

bm = bmesh.new()
bmesh.ops.create_grid(bm, x_segments=60, y_segments=60, size=1650, matrix=Matrix.Translation((0, 0, SEABED)))
for v in bm.verts:
    v.co.z += 3 * math.sin(v.co.x / 90) * math.cos(v.co.y / 130) + random.uniform(-0.8, 0.8)
bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.calc_center_median().xy.length > 1640], context="FACES")
obj_from_bm("Seabed", bm, M["seabed"], C_ENV, smooth=True)
# cutaway-only "aquarium wall": tinted section face in front of the submerged rings
C_CUT = coll("Cutaway_Only")
bm = bmesh.new()
vs = [bm.verts.new(p) for p in ((-380, -1640, SEABED - 4), (-380, 1640, SEABED - 4), (-380, 1640, -0.3), (-380, -1640, -0.3))]
bm.faces.new(vs)
wall = obj_from_bm("Cutaway_Water_Section", bm, mat("Water_Section", (0.02, 0.25, 0.38), 0.3, alpha=0.22), C_CUT)
wall.visible_shadow = False
bm = bmesh.new()
vs = [bm.verts.new(p) for p in ((-480, -1640, 0), (-480, 1640, 0), (0, 1640, 0), (0, -1640, 0))]
bm.faces.new(vs)
top = obj_from_bm("Cutaway_Water_Top", bm, mat("Water_Top", (0.02, 0.2, 0.3), 0.05, alpha=0.35), C_CUT)
top.visible_shadow = False
top.hide_render = True  # optional tinted surface for the cut zone (off by default)

bm = bmesh.new(); rings = []
for i in range(129):
    a = TAU * i / 128
    rings.append([bm.verts.new((1650 * math.cos(a), 1650 * math.sin(a), z)) for z in (SEABED - 5, -0.5)])
for i in range(128):
    bm.faces.new((rings[i][0], rings[i + 1][0], rings[i + 1][1], rings[i][1]))
deep = obj_from_bm("Deep_Water_Backdrop", bm, M["deep"], C_ENV)
deep.visible_shadow = False

# ---- cutaway: split submerged meshes at the x=0 section plane (west half goes to Cutaway_FrontHalf)
def split_front_half(ob):
    import bmesh as _bm
    me = ob.data; bm = _bm.new(); bm.from_mesh(me)
    west = [f for f in bm.faces if f.calc_center_median().x < 0]
    if not west: bm.free(); return
    bm2 = bm.copy()
    _bm.ops.delete(bm, geom=west, context='FACES'); bm.to_mesh(me); bm.free()
    _bm.ops.delete(bm2, geom=[f for f in bm2.faces if f.calc_center_median().x >= 0], context='FACES')
    me2 = bpy.data.meshes.new(ob.name + "_W"); bm2.to_mesh(me2); bm2.free()
    for m_ in me.materials: me2.materials.append(m_)
    o2 = bpy.data.objects.new(ob.name + "_W", me2); bpy.data.collections["Cutaway_FrontHalf"].objects.link(o2)
for _ob in list(bpy.data.collections["Submerged"].objects):
    if _ob.type == 'MESH' and not _ob.name.endswith("_W"):
        split_front_half(_ob)


# section caps on the cut torus shell (cutaway only): hatched-orange profile rings at 90 and 270 deg
bm = bmesh.new()
for a in (D(90), D(270)):
    c_, s_ = math.cos(a), math.sin(a)
    outer = [shell_pt(TAU * k / 48) for k in range(48)]
    inner = [shell_pt(TAU * k / 48, -1.6) for k in range(48)]
    vo = [bm.verts.new((r * c_ + 0.3, r * s_, z)) for r, z in outer]
    vi = [bm.verts.new((r * c_ + 0.3, r * s_, z)) for r, z in inner]
    for k in range(48):
        bm.faces.new((vo[k], vo[(k + 1) % 48], vi[(k + 1) % 48], vi[k]))
    # floor slab section
    sector(bm, R_IN + 3, R_OUT - 3, a - D(0.05), a + D(0.05), -8, Z_DECK, steps=1)
obj_from_bm("Cutaway_Section_Caps", bm, mat("Section_Cut", (0.95, 0.35, 0.10), 0.6), C_CUT)

# ---------------------------------------------------------------- light, sky, cameras
sun_d = bpy.data.lights.new("Sun", 'SUN'); sun_d.energy = 4.0; sun_d.angle = D(1.5)
sun = bpy.data.objects.new("Sun", sun_d); C_ENV.objects.link(sun)
sun.rotation_euler = (D(50), D(0), D(-35))
w = bpy.data.worlds.new("Sky"); scn.world = w; w.use_nodes = True
sky = w.node_tree.nodes.new("ShaderNodeTexSky"); sky.sky_type = 'NISHITA'
sky.sun_elevation = D(40); sky.sun_rotation = D(-35 + 90 + 180); sky.sun_disc = False
bg = w.node_tree.nodes["Background"]; bg.inputs["Strength"].default_value = 0.25
w.node_tree.links.new(sky.outputs["Color"], bg.inputs["Color"])

target = bpy.data.objects.new("CamTarget", None); C_ENV.objects.link(target)
def make_cam(name, loc, look, lens):
    cd = bpy.data.cameras.new(name); cd.lens = lens; cd.clip_start = 1; cd.clip_end = 20000
    c = bpy.data.objects.new(name, cd); C_ENV.objects.link(c); c.location = loc
    d = Vector(look) - Vector(loc); c.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    return c
make_cam("Cam_Hero", (980, -1250, 620), (0, -20, -30), 32)
make_cam("Cam_Cutaway", (-400, -235, -4), (0, -235, -30), 26)
fly = make_cam("Cam_Fly", (0, -1500, 700), (0, 0, 0), 28)
tt = fly.constraints.new('TRACK_TO'); tt.target = target; tt.track_axis = 'TRACK_NEGATIVE_Z'; tt.up_axis = 'UP_Y'

# flythrough: orbit from high aerial, descend, dip below the waterline and look up at the rings
FPS, SECS = 24, 15
scn.render.fps = FPS; scn.frame_start = 1; scn.frame_end = FPS * SECS
def smooth(t): return t * t * (3 - 2 * t)
for f in range(1, FPS * SECS + 1, 4):
    t = (f - 1) / (FPS * SECS - 1)
    ang = D(-110) + D(230) * smooth(t)
    rad = 1500 - 650 * smooth(t)
    dip = smooth(min(1, max(0, (t - 0.55) / 0.35)))
    z = 650 * (1 - smooth(min(1, t / 0.6))) + 60 - 115 * dip
    fly.location = (rad * math.cos(ang), rad * math.sin(ang), z)
    fly.keyframe_insert("location", frame=f)
    target.location = (0, 0, -10 - 45 * dip)
    target.keyframe_insert("location", frame=f)
for o in (fly, target):
    for fc in o.animation_data.action.fcurves:
        for kp in fc.keyframe_points: kp.interpolation = 'BEZIER'

scn.camera = bpy.data.objects["Cam_Hero"]
scn.render.engine = 'CYCLES'; scn.cycles.device = 'CPU'
scn.view_settings.view_transform = 'AgX'; scn.view_settings.look = 'AgX - Medium High Contrast'
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "kaiyo_dc.blend"))
print("SAVED", os.path.join(OUT, "kaiyo_dc.blend"), len(bpy.data.objects), "objects")
