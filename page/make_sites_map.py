#!/usr/bin/env python3
"""First-look coasts map for the Kaiyō DC thought experiment."""

from pathlib import Path
import textwrap

import numpy as np

import cartopy.crs as ccrs
import cartopy.io.shapereader as shpreader
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib import font_manager, patheffects
from matplotlib.gridspec import GridSpec
from PIL import Image
from pyproj import Geod
from shapely.geometry import box
from shapely.ops import unary_union

OUT = Path(__file__).resolve().parent / "sites-map.png"
TMP = Path(__file__).resolve().parent / "sites-map-raw.png"
FONT_DIR = Path(__file__).resolve().parent / "fonts"

PAPER = "#F6F3EE"
INK = "#1B262E"
MUTED = "#4E5B63"
FAINT = "#6E7A80"
OCEAN = "#D5E2EA"
LAND_OTHER = "#EDE6DA"
LAND_JP = "#E1D2B8"
COAST_JP = "#2C3C46"
COAST_OTHER = "#8A969E"
TEAL = "#0C6B66"
AMBER = "#A34B0C"
SLATE = "#3A5470"
SETASIDE = "#5E6A72"
SEA5 = "#155E75"
SEA6 = "#1E4D6B"
SEA7 = "#164E63"
CABLE = "#1B3B5A"
CITY = "#2A343A"
HAIR = "#C4CBCF"
BOX = "#5A6A72"
PRO = "#21514E"
CON = "#6B3C16"

for f in FONT_DIR.glob("NotoSans-*.ttf"):
    font_manager.fontManager.addfont(str(f))

# After adding static files, the family name is still "Noto Sans"
plt.rcParams.update({
    "font.family": "Noto Sans",
    "font.size": 10,
    "text.color": INK,
    "axes.edgecolor": INK,
    "figure.facecolor": PAPER,
    "savefig.facecolor": PAPER,
    "axes.facecolor": OCEAN,
})

FP = {
    "reg": font_manager.FontProperties(fname=str(FONT_DIR / "NotoSans-Regular.ttf")),
    "med": font_manager.FontProperties(fname=str(FONT_DIR / "NotoSans-Medium.ttf")),
    "sem": font_manager.FontProperties(fname=str(FONT_DIR / "NotoSans-SemiBold.ttf")),
    "bol": font_manager.FontProperties(fname=str(FONT_DIR / "NotoSans-Bold.ttf")),
}


def halo(color="white", width=2.6):
    return [patheffects.withStroke(linewidth=width, foreground=color, capstyle="round", joinstyle="round")]


def load_japan_and_others():
    path = shpreader.natural_earth(resolution="10m", category="cultural", name="admin_0_countries")
    reader = shpreader.Reader(path)
    japan, others = [], []
    for rec in reader.records():
        name = rec.attributes.get("ADMIN") or rec.attributes.get("NAME") or ""
        if name == "Japan":
            japan.append(rec.geometry)
        else:
            others.append(rec.geometry)
    return unary_union(japan), others


def load_lakes():
    path = shpreader.natural_earth(resolution="10m", category="physical", name="lakes")
    return list(shpreader.Reader(path).geometries())


def add_geoms(ax, geoms, facecolor, edgecolor, lw, z=2):
    ax.add_geometries(
        geoms if isinstance(geoms, (list, tuple)) else [geoms],
        crs=ccrs.PlateCarree(),
        facecolor=facecolor,
        edgecolor=edgecolor,
        linewidth=lw,
        zorder=z,
    )


def style_ax(ax, facecolor=OCEAN):
    ax.set_facecolor(facecolor)
    for spine in ax.spines.values():
        spine.set_color(HAIR)
        spine.set_linewidth(0.9)


def numbered_badge(ax, lon, lat, n, color, z=10, size=155):
    pc = ccrs.PlateCarree()
    ax.scatter(
        [lon], [lat], s=size, facecolor=color, edgecolor="white",
        linewidth=1.25, transform=pc, zorder=z, clip_on=True,
    )
    ax.text(
        lon, lat, str(n), transform=pc, ha="center", va="center",
        fontproperties=FP["bol"], fontsize=8, color="white",
        zorder=z + 1, clip_on=True,
    )


def map_label(ax, lon, lat, text, ha="left", va="center", size=7.4, color=INK, fp="med", dx=0, dy=0, z=11):
    t = ax.text(
        lon + dx, lat + dy, text, transform=ccrs.PlateCarree(),
        ha=ha, va=va, fontsize=size, color=color,
        fontproperties=FP[fp], zorder=z, clip_on=True, linespacing=1.2,
    )
    t.set_path_effects(halo("white", 3.2))
    return t


def add_scale_bar(ax, lon, lat, length_km, segments, tick=0.11, label_off=0.32, fs=6.8):
    geod = Geod(ellps="WGS84")
    pc = ccrs.PlateCarree()
    xs, ys = [lon], [lat]
    step = length_km / segments
    for i in range(1, segments + 1):
        x, y, _ = geod.fwd(lon, lat, 90, i * step * 1000)
        xs.append(x)
        ys.append(y)
    ax.plot([xs[0], xs[-1]], [ys[0], ys[-1]], color=INK, linewidth=2.0, transform=pc, zorder=12, solid_capstyle="butt", clip_on=False)
    for x, y in zip(xs, ys):
        ax.plot([x, x], [y - tick, y + tick], color=INK, linewidth=1.3, transform=pc, zorder=12, clip_on=False)
    mid_x, mid_y, _ = geod.fwd(lon, lat, 90, (length_km * 1000) / 2)
    ax.text(mid_x, lat + label_off, f"{length_km} km", transform=pc, ha="center", va="bottom", fontsize=fs, color=INK, fontproperties=FP["med"], zorder=13)
    ax.text(xs[0], lat - tick - 0.08, "0", transform=pc, ha="center", va="top", fontsize=fs - 0.6, color=MUTED, fontproperties=FP["reg"], zorder=13)
    ax.text(xs[-1], lat - tick - 0.08, f"{length_km}", transform=pc, ha="center", va="top", fontsize=fs - 0.6, color=MUTED, fontproperties=FP["reg"], zorder=13)


def clip_to_region(geoms, region):
    out = []
    for g in geoms:
        try:
            c = g.intersection(region)
            if not c.is_empty:
                out.append(c)
        except Exception:
            continue
    return out



def add_lonlat_box(ax, lon0, lon1, lat0, lat1, **kwargs):
    ax.plot(
        [lon0, lon1, lon1, lon0, lon0],
        [lat0, lat0, lat1, lat1, lat0],
        transform=ccrs.PlateCarree(),
        **kwargs,
    )


def add_lonlat_ellipse(ax, clon, clat, width, height, angle_deg=-8, n=240, **kwargs):
    t = np.linspace(0, 2 * np.pi, n)
    x = (width / 2.0) * np.cos(t)
    y = (height / 2.0) * np.sin(t)
    ang = np.deg2rad(angle_deg)
    xr = x * np.cos(ang) - y * np.sin(ang)
    yr = x * np.sin(ang) + y * np.cos(ang)
    ax.plot(clon + xr, clat + yr, transform=ccrs.PlateCarree(), **kwargs)

def paint_base(ax, japan, others, lakes):
    add_geoms(ax, others, LAND_OTHER, "none", 0, z=2)
    add_geoms(ax, japan, LAND_JP, "none", 0, z=3)
    add_geoms(ax, lakes, OCEAN, "none", 0, z=4)
    add_geoms(ax, others, "none", COAST_OTHER, 0.35, z=5)
    add_geoms(ax, japan, "none", COAST_JP, 0.55, z=6)


def main():
    japan, others = load_japan_and_others()
    region = box(120, 24, 155, 50)
    others = clip_to_region(others, region)
    lakes = clip_to_region(load_lakes(), region)

    proj = ccrs.LambertConformal(
        central_longitude=136.0,
        central_latitude=38.0,
        standard_parallels=(30.0, 40.0),
    )
    pc = ccrs.PlateCarree()

    fig = plt.figure(figsize=(16.0, 14.95), dpi=120)
    gs = GridSpec(
        nrows=3, ncols=2,
        width_ratios=[1.78, 1.00],
        height_ratios=[0.10, 1.00, 0.46],
        wspace=0.024,
        hspace=0.045,
        left=0.018, right=0.985, top=0.978, bottom=0.028,
    )

    # Header spans full width
    ax_h = fig.add_subplot(gs[0, :])
    ax_h.set_axis_off()
    ax_h.set_facecolor(PAPER)
    ax_h.set_xlim(0, 1)
    ax_h.set_ylim(0, 1)
    ax_h.text(
        0.0, 0.70, "Kaiyō DC  ·  first-look coasts",
        fontsize=22, color=INK, ha="left", va="center",
        fontproperties=FP["bol"], transform=ax_h.transAxes,
    )
    ax_h.text(
        0.0, 0.28,
        "A thought-experiment sketch. Zone 7 is the lead site for this thought experiment;",
        fontsize=10.0, color=MUTED, ha="left", va="center",
        fontproperties=FP["reg"], transform=ax_h.transAxes,
    )
    ax_h.text(
        0.0, 0.00,
        "no zone is surveyed or permitted. Numbered zones follow the Placement notes.",
        fontsize=10.0, color=MUTED, ha="left", va="center",
        fontproperties=FP["reg"], transform=ax_h.transAxes,
    )

    # Main map (left, middle row) and inset (left, bottom). Legend spans both rows.
    ax = fig.add_subplot(gs[1, 0], projection=proj)
    axins = fig.add_subplot(gs[2, 0], projection=proj)
    axl = fig.add_subplot(gs[1:, 1])

    # ---- Main map ----
    ax.set_extent([127.5, 146.3, 30.2, 46.15], crs=pc)
    style_ax(ax)
    paint_base(ax, japan, others, lakes)

    kyushu_extent = [128.55, 131.90, 31.15, 34.12]
    add_lonlat_box(
        ax, kyushu_extent[0], kyushu_extent[1], kyushu_extent[2], kyushu_extent[3],
        color=BOX, linewidth=1.05, zorder=7, solid_capstyle="round",
    )
    map_label(ax, 132.02, 31.22, "Zones 1, 2 and 4 enlarged below", ha="left", va="bottom", size=6.8, color=BOX, fp="med")

    # Central Seto Inland Sea, as geographic context. Zone 5 sits farther east,
    # in Harima-nada. The ring is drawn in lon/lat so Lambert cannot misplace it.
    add_lonlat_ellipse(
        ax, 133.25, 34.32, width=1.45, height=0.48, angle_deg=-10,
        color=SETASIDE, linewidth=0.95, linestyle=(0, (2.8, 1.8)), zorder=7,
    )
    map_label(
        ax, 133.05, 34.55, "Seto Inland Sea",
        ha="center", va="center", size=7.0, color=SETASIDE, fp="med",
    )

    # Zone 5: first-look pocket off the Ieshima islands, Harima-nada.
    # Marker is sketched south of the island group, off the Himeji–Ieshima
    # ferry approaches. That is a sketch of the intended pocket, not a
    # surveyed offset from the routes.
    ieshima = (134.55, 34.56)
    ax.scatter([ieshima[0]], [ieshima[1]], s=520, facecolor=SEA5, edgecolor="none", alpha=0.15, transform=pc, zorder=7)
    numbered_badge(ax, ieshima[0], ieshima[1], 5, SEA5, size=175)
    map_label(ax, ieshima[0], ieshima[1], "Ieshima area", ha="center", va="top", size=8.0, dx=0.0, dy=-0.28, fp="sem")
    map_label(ax, ieshima[0], ieshima[1], "clear of Himeji–Ieshima ferries", ha="center", va="top", size=6.4, color=SEA5, dx=0.0, dy=-0.52, fp="med")

    # Zone 6: Mutsu Bay, Aomori — earlier pocket considered.
    # Marker is in the enclosed bay, which opens north through the
    # Tairadate Strait to the Tsugaru Strait.
    mutsu = (140.90, 41.06)
    ax.scatter([mutsu[0]], [mutsu[1]], s=520, facecolor=SEA6, edgecolor="none", alpha=0.15, transform=pc, zorder=7)
    numbered_badge(ax, mutsu[0], mutsu[1], 6, SEA6, size=175)
    map_label(ax, mutsu[0], mutsu[1], "Mutsu Bay", ha="right", va="center", size=8.0, dx=-0.32, dy=0.22, fp="sem")
    map_label(ax, mutsu[0], mutsu[1], "Misawa Air Base (US/JASDF)", ha="right", va="center", size=6.3, color=SEA6, dx=-0.32, dy=-0.02, fp="med")
    map_label(ax, mutsu[0], mutsu[1], "JMSDF Ōminato District", ha="right", va="center", size=6.3, color=SEA6, dx=-0.32, dy=-0.24, fp="med")

    # Zone 7: Tokachi–Kushiro Pacific coast, eastern Hokkaido.
    # The lead site is an offshore stretch from roughly south of Tokachi
    # east past Kushiro. The dashed band is a first-look sketch, not a
    # surveyed mooring area.
    add_lonlat_ellipse(
        ax, 144.05, 42.48, width=1.85, height=0.34, angle_deg=32,
        color=SEA7, linewidth=1.05, linestyle=(0, (2.6, 1.6)), zorder=7,
    )
    tokachi = (144.05, 42.48)
    ax.scatter([tokachi[0]], [tokachi[1]], s=520, facecolor=SEA7, edgecolor="none", alpha=0.15, transform=pc, zorder=7)
    numbered_badge(ax, tokachi[0], tokachi[1], 7, SEA7, size=175)
    map_label(ax, tokachi[0], tokachi[1], "Tokachi–Kushiro coast", ha="left", va="top", size=7.6, dx=0.28, dy=-0.40, fp="sem")
    map_label(ax, tokachi[0], tokachi[1], "Lead site", ha="left", va="top", size=6.5, color=SEA7, dx=0.28, dy=-0.62, fp="sem")
    map_label(ax, tokachi[0], tokachi[1], "open Pacific  ·  Oyashio", ha="left", va="top", size=6.3, color=SEA7, dx=0.28, dy=-0.82, fp="med")

    # Zone 3 Ishikari Bay
    ishikari = (141.10, 43.30)
    ax.scatter([ishikari[0]], [ishikari[1]], s=520, facecolor=AMBER, edgecolor="none", alpha=0.15, transform=pc, zorder=7)
    numbered_badge(ax, ishikari[0], ishikari[1], 3, AMBER, size=175)
    map_label(ax, ishikari[0], ishikari[1], "Ishikari Bay", ha="right", va="center", size=8.0, dx=-0.38, dy=0.12, fp="sem")
    map_label(ax, ishikari[0], ishikari[1], "flagged  ·  Russia / Sea of Japan concerns", ha="right", va="center", size=6.5, color=AMBER, dx=-0.38, dy=-0.22, fp="med")

    # Cities (main map only; Fukuoka lives in the inset)
    for lon, lat, name, dx, dy, ha, va in [
        (139.76, 35.68, "Tokyo", -0.30, 0.22, "right", "bottom"),
        (135.50, 34.69, "Osaka", 0.22, 0.30, "left", "bottom"),
        (134.69, 34.83, "Himeji", -0.22, 0.20, "right", "bottom"),
        (141.35, 43.06, "Sapporo", 0.38, -0.08, "left", "center"),
        (144.375, 42.975, "Kushiro", 0.22, 0.14, "left", "bottom"),
    ]:
        ax.scatter([lon], [lat], s=16, facecolor=CITY, edgecolor="white", linewidth=0.6, transform=pc, zorder=8)
        map_label(ax, lon, lat, name, ha=ha, va=va, size=7.1, color=CITY, dx=dx, dy=dy, fp="med")

    # Cable landings on the main map
    for lon, lat, name, dx, dy, ha, va in [
        (139.9547, 34.9767, "Chikura", 0.30, -0.16, "left", "top"),
        (136.8744, 34.3368, "Shima", 0.28, -0.18, "left", "top"),
        (140.751, 36.8018, "Kitaibaraki", 0.32, 0.14, "left", "bottom"),
        (141.6032, 42.6361, "Tomakomai\nplanned E2A", -0.18, -0.20, "right", "top"),
    ]:
        ax.scatter([lon], [lat], s=30, marker="s", facecolor=CABLE, edgecolor="white", linewidth=0.6, transform=pc, zorder=9)
        map_label(ax, lon, lat, name, ha=ha, va=va, size=6.6, color=CABLE, dx=dx, dy=dy, fp="med")

    # Water labels
    map_label(ax, 135.6, 39.7, "Sea of Japan", ha="center", va="center", size=8.0, color="#6A7C86", fp="med")
    map_label(ax, 143.7, 34.6, "Pacific Ocean", ha="center", va="center", size=8.0, color="#6A7C86", fp="med")

    add_scale_bar(ax, 142.85, 31.35, length_km=300, segments=3, tick=0.13, label_off=0.28, fs=6.8)

    # ---- Kyushu inset, separate panel so it cannot cover Seto ----
    axins.set_extent(kyushu_extent, crs=pc)
    axins.set_anchor("W")
    style_ax(axins)
    paint_base(axins, japan, others, lakes)
    axins.set_title(
        "Western Kyushu, enlarged",
        fontsize=8.0, color=BOX, pad=4, loc="left",
        fontproperties=FP["med"],
    )

    omura = (129.90, 32.95)
    numbered_badge(axins, omura[0], omura[1], 1, TEAL, size=155)
    map_label(axins, omura[0], omura[1], "Ōmura Bay", ha="left", va="center", size=8.0, dx=0.12, dy=0.02, fp="sem")

    imari = (129.82, 33.27)
    numbered_badge(axins, imari[0], imari[1], 2, TEAL, size=155)
    map_label(axins, imari[0], imari[1], "Imari area", ha="left", va="center", size=8.0, dx=0.12, dy=0.02, fp="sem")

    sendai = (130.22, 31.83)
    numbered_badge(axins, sendai[0], sendai[1], 4, SLATE, size=155)
    map_label(axins, sendai[0], sendai[1], "Satsumasendai", ha="left", va="center", size=8.0, dx=0.12, dy=0.05, fp="sem")
    map_label(axins, sendai[0], sendai[1], "GX site  ·  first look only", ha="left", va="center", size=6.3, color=SLATE, dx=0.12, dy=-0.10, fp="med")

    for lon, lat, name, dx, dy, ha, va in [
        (130.1505, 33.5975, "Itoshima  ·  planned E2A", -0.08, 0.09, "right", "bottom"),
        (130.4017, 33.5904, "Fukuoka", 0.09, -0.07, "left", "top"),
        (131.032, 33.8393, "Kitakyushu", -0.08, 0.08, "right", "bottom"),
    ]:
        axins.scatter([lon], [lat], s=28, marker="s", facecolor=CABLE, edgecolor="white", linewidth=0.55, transform=pc, zorder=9)
        map_label(axins, lon, lat, name, ha=ha, va=va, size=6.6, color=CABLE, dx=dx, dy=dy, fp="med")

    add_scale_bar(axins, 131.22, 31.32, length_km=50, segments=2, tick=0.035, label_off=0.07, fs=6.3)

    # ---- Legend ----
    axl.set_axis_off()
    axl.set_facecolor(PAPER)
    axl.set_xlim(0, 1)
    axl.set_ylim(0, 1)

    def wrapped_lines(text, width):
        return textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False)

    y = 0.988
    axl.text(0.02, y, "Numbered zones", transform=axl.transAxes, ha="left", va="top", fontsize=12.4, color=INK, fontproperties=FP["bol"])
    y -= 0.026
    intro = "One-line pro and con each. Zone 7 is the lead site for this thought experiment. No zone is surveyed or permitted."
    for line in wrapped_lines(intro, 52):
        axl.text(0.02, y, line, transform=axl.transAxes, ha="left", va="top", fontsize=8.0, color=FAINT, fontproperties=FP["reg"])
        y -= 0.015
    y -= 0.010

    zones = [
        ("1", TEAL, "Ōmura Bay, Nagasaki",
         "Notably calm, enclosed water — the most sheltered bay named in the Placement notes.",
         "Kyushu still sees some typhoons. Ōmura itself is not a named GX Strategy Area site."),
        ("2", TEAL, "Imari area, Saga",
         "Next to Ōmura. DayOne announced a 200 MW land campus in Imari, first operations targeted for 2030.",
         "No cable landing in Imari itself. Kyushu still sees some typhoons."),
        ("3", AMBER, "Ishikari Bay, Hokkaido  ·  flagged",
         "Cool air and water; Sakura Internet already runs a campus here; official GX site.",
         "Northern Hokkaido sits close to Russia; the bay faces the Sea of Japan, where North Korean missile tests are often observed."),
        ("4", SLATE, "Satsumasendai coast, Kagoshima",
         "A named official GX datacenter-cluster site, and it is on the coast.",
         "More exposed than Ōmura; Kyushu typhoons. A first look at a GX coastal site, not a surveyed bay."),
        ("5", SEA5, "Harima-nada, off the Ieshima islands",
         "Sheltered Seto water, near major shipyards. This pocket is placed deliberately clear of the Himeji–Ieshima island ferries.",
         "Shipping lanes and fisheries still need checking. The wider inland sea remains a busy waterway. Not surveyed or permitted."),
        ("6", SEA6, "Mutsu Bay, Aomori",
         "Enclosed northern bay with colder water, which helps cooling. Misawa Air Base (US/JASDF) and JMSDF Ōminato District mean heavily watched airspace and waters, and a quicker response.",
         "Major scallop farms and reported 2023 heat die-offs; leftover heat can linger in the bay. Winter snow and wind. Pacific-side quake and tsunami exposure, hedged. Bases also mean strategic and permitting limits. NK overflights of Tohoku are a geopolitical risk, not a safety claim."),
        ("7", SEA7, "Tokachi–Kushiro Pacific coast  ·  Lead site",
         "Cold Oyashio water, generally the best cooling of these zones, and open sea for heat dispersal. Faces the Pacific, away from North Korea. Kushiro is a major port. The mooring concept is compliant, just off the shelf break, with two separate cable landings.",
         "Kuril, or Chishima, Trench quake and tsunami risk, including the 2003 Tokachi-oki M8 event and official warnings of further trench earthquakes. Open-Pacific swells. Fog is common. Drift ice in some winters, more toward the east. The coast continues toward Nemuro and the Russian-held Kurils. Important fisheries, including Alaska pollock, salmon, and kelp. Not surveyed or permitted."),
    ]

    line_h = 0.0105
    wrap_w = 56

    for n, color, title, pro, con in zones:
        axl.scatter([0.042], [y - 0.010], s=155, facecolor=color, edgecolor="white", linewidth=1.05, transform=axl.transAxes, zorder=4, clip_on=False)
        axl.text(0.042, y - 0.010, n, transform=axl.transAxes, ha="center", va="center", fontsize=8, color="white", fontproperties=FP["bol"], zorder=5)
        axl.text(0.080, y, title, transform=axl.transAxes, ha="left", va="top", fontsize=9.3, color=INK, fontproperties=FP["sem"])
        y -= 0.0165
        for label, body, col in (("Pro.", pro, PRO), ("Con.", con, CON)):
            lines = wrapped_lines(f"{label}  {body}", wrap_w)
            for line in lines:
                axl.text(0.080, y, line, transform=axl.transAxes, ha="left", va="top", fontsize=7.15, color=col, fontproperties=FP["reg"])
                y -= line_h
            y -= 0.0005
        y -= 0.0045

    axl.plot([0.02, 0.98], [y + 0.008, y + 0.008], color=HAIR, linewidth=0.8, transform=axl.transAxes, clip_on=False)
    y -= 0.012
    axl.text(0.02, y, "Also on the map", transform=axl.transAxes, ha="left", va="top", fontsize=10.5, color=INK, fontproperties=FP["bol"])
    y -= 0.024

    def key_row(y, drawer, title, detail):
        drawer(y)
        axl.text(0.080, y, title, transform=axl.transAxes, ha="left", va="top", fontsize=8.3, color=INK, fontproperties=FP["sem"])
        axl.text(0.080, y - 0.019, detail, transform=axl.transAxes, ha="left", va="top", fontsize=7.15, color=MUTED, fontproperties=FP["reg"])
        return y - 0.027

    y = key_row(
        y,
        lambda y: axl.scatter([0.042], [y - 0.014], s=52, marker="s", facecolor=CABLE, edgecolor="white", linewidth=0.6, transform=axl.transAxes, zorder=4, clip_on=False),
        "Subsea cable landing",
        "Existing or planned points, verified. Not a promised hookup.",
    )
    y = key_row(
        y,
        lambda y: axl.scatter([0.042], [y - 0.014], s=28, facecolor=CITY, edgecolor="white", linewidth=0.5, transform=axl.transAxes, zorder=4, clip_on=False),
        "Major city",
        "Shown only for orientation.",
    )
    y = key_row(
        y,
        lambda y: axl.plot([0.026, 0.058], [y - 0.014, y - 0.014], color=SETASIDE, linewidth=1.25, linestyle=(0, (2.2, 1.4)), transform=axl.transAxes, clip_on=False),
        "Seto Inland Sea",
        "Generally a busy shipping and fishing waterway. Zone 5 is a specific pocket in it.",
    )

    axl.plot([0.02, 0.98], [y + 0.008, y + 0.008], color=HAIR, linewidth=0.8, transform=axl.transAxes, clip_on=False)
    y -= 0.010

    footnote = (
        "Coastline: Natural Earth, 10 m. Cable marks are existing or planned landings, not a promised hookup; "
        "Kitaibaraki is now largely described as legacy; Itoshima and Tomakomai are planned SoftBank E2A landings (July 2025). "
        "Zone 5 is sketched south of the Ieshima islands, off the Himeji–Ieshima ferry approaches, not a surveyed offset. "
        "Zone 7 is the lead site for this thought experiment: an offshore first-look stretch from south of Tokachi east past Kushiro, not a surveyed or permitted mooring."
    )
    # wrap footnote to the panel width
    for line in wrapped_lines(footnote, 58):
        axl.text(0.02, y, line, transform=axl.transAxes, ha="left", va="top", fontsize=6.45, color=FAINT, fontproperties=FP["reg"])
        y -= 0.0105

    fig.savefig(TMP, dpi=120, facecolor=PAPER)
    plt.close(fig)

    im = Image.open(TMP).convert("RGB")
    w, h = im.size
    target_w = 1600
    target_h = round(h * (target_w / w))
    im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
    im.save(OUT, "PNG", optimize=True)
    print(f"raw={w}x{h}  out={target_w}x{target_h}  bytes={OUT.stat().st_size}  legend_y_end={y:.3f}")


if __name__ == "__main__":
    main()
