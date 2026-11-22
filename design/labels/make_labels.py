"""Render flat front-label artwork for the UMMA range (palette 1: bottle and brass)."""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).parent
FS = HERE / "node_modules" / "@fontsource"
LOGO_D = (HERE / "logo-path.txt").read_text()

IVORY = "#F5EFE2"
BRASS = "#B08D48"
GREEN = "#0E3B2E"

PRODUCTS = [
    dict(slug="collagen-bovine", fmt="jar", bg=GREEN, ink=IVORY, accent=BRASS,
         name="Collagen", sub="bovine peptides", detail="Types I and III · Unflavoured",
         qty="Net wt 250 g", qty2="25 servings", kind="supplement", mark="nonveg", serve="One 10 g scoop a day"),
    dict(slug="collagen-marine", fmt="pouch", bg="#123F3E", ink=IVORY, accent=BRASS,
         name="Collagen", sub="marine peptides", detail="Type I · Unflavoured",
         qty="Net wt 250 g", qty2="25 servings", kind="supplement", mark="nonveg"),
    dict(slug="perimenopause", fmt="jar", bg="#5E1F2B", ink=IVORY, accent="#C9A35A",
         name="Perimenopause", sub="daily nutrition blend", detail="Café mocha",
         qty="Net wt 400 g", qty2="20 servings", kind="supplement", mark=None),
    dict(slug="gelatin", fmt="pouch", bg="#EDE4D0", ink=GREEN, accent="#9C7A36",
         name="Gelatin", sub="bovine, unflavoured", detail="For desserts and cooking",
         qty="Net wt 100 g", qty2="", kind="food", mark="nonveg"),
    dict(slug="henna", fmt="pouch", bg="#474D27", ink=IVORY, accent="#C2A35E",
         name="Henna", sub="leaf powder", detail="For hair · Lawsonia inermis",
         qty="Net wt 250 g", qty2="", kind="care", mark=None),
    dict(slug="multani-mitti", fmt="pouch", bg="#86614A", ink=IVORY, accent="#E2C98F",
         name="Multani mitti", sub="fuller's earth", detail="Face pack",
         qty="Net wt 250 g", qty2="", kind="care", mark=None),
]

SIZES = {"pouch": (1000, 1300), "jar": (1500, 1000)}


def star(cx, cy, r, color):
    """Eight-point star (khatam): two overlapping squares."""
    s = r * 0.72
    return (
        f'<g fill="none" stroke="{color}" stroke-width="2.2">'
        f'<rect x="{cx - s}" y="{cy - s}" width="{2 * s}" height="{2 * s}"/>'
        f'<rect x="{cx - s}" y="{cy - s}" width="{2 * s}" height="{2 * s}" transform="rotate(45 {cx} {cy})"/>'
        f"</g>"
    )


def nonveg_mark(color="#7A3B1E"):
    return (
        f'<svg width="54" height="54" viewBox="0 0 54 54" aria-label="Non-vegetarian">'
        f'<rect x="3" y="3" width="48" height="48" fill="#fff" stroke="{color}" stroke-width="4"/>'
        f'<path d="M27 14 L40 38 H14 Z" fill="{color}"/></svg>'
    )


def halal_roundel(color):
    return (
        f'<div class="halal" style="border-color:{color};color:{color}">'
        f'<span class="ar">حلال</span><span class="en">Halal</span></div>'
    )


def page(p):
    w, h = SIZES[p["fmt"]]
    jar = p["fmt"] == "jar"
    # The central panel: on pouches it is the whole label; on jars it is the front-facing middle.
    pw = 900 if jar else w
    arch_w = pw * (0.74 if jar else 0.78)
    arch_h = h * (0.56 if jar else 0.52)
    name_size = 128 if len(p["name"]) <= 9 else (96 if jar else 92)
    foot_left = {
        "supplement": "Food supplement · Not for medicinal use",
        "food": "Unflavoured gelatin",
        "care": "For external use only",
    }[p["kind"]]
    mark = nonveg_mark() if p["mark"] == "nonveg" else '<span style="width:54px"></span>'
    side = ""
    if jar:
        side = f"""
        <div class="side left"><p>{p['qty2']}</p><p>{p.get('serve', '')}</p></div>
        <div class="side right"><p>Scoop inside</p><p>Made in India</p></div>"""
    halal_front = halal_roundel(p["accent"])
    if p["kind"] == "care":
        halal_front = ""

    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Corm;src:url({FS}/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2)}}
@font-face{{font-family:Corm;font-style:italic;src:url({FS}/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2)}}
@font-face{{font-family:Hank;src:url({FS}/../@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2);font-weight:100 900}}
@font-face{{font-family:Amiri;src:url({FS}/amiri/files/amiri-arabic-400-normal.woff2)}}
*{{box-sizing:border-box;margin:0}}
body{{width:{w}px;height:{h}px;background:{p['bg']};color:{p['ink']};font-family:Hank,sans-serif;position:relative;overflow:hidden}}
.panel{{position:absolute;top:0;bottom:0;left:{(w - pw) / 2}px;width:{pw}px;display:flex;flex-direction:column;align-items:center}}
.logo{{margin-top:{70 if jar else 96}px;width:{330 if jar else 400}px}}
.arch{{position:relative;margin-top:{40 if jar else 64}px;width:{arch_w}px;height:{arch_h}px;border:2.2px solid {p['accent']};border-bottom:none;border-radius:{arch_w / 2}px {arch_w / 2}px 0 0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding-top:{40 if jar else 70}px}}
.arch .st{{position:absolute;top:{34 if jar else 46}px;left:50%;transform:translateX(-50%)}}
.name{{font-family:Corm;font-weight:500;font-size:{name_size}px;line-height:.95;letter-spacing:-.01em}}
.sub{{font-family:Corm;font-style:italic;font-size:{50 if jar else 58}px;color:{p['accent']};margin-top:10px}}
.detail{{font-size:{24 if jar else 28}px;letter-spacing:.04em;opacity:.85;margin-top:{20 if jar else 28}px}}
.rule{{width:{arch_w}px;height:2.2px;background:{p['accent']}}}
.foot{{position:absolute;bottom:{56 if jar else 70}px;left:{(pw - arch_w) / 2}px;right:{(pw - arch_w) / 2}px;display:flex;align-items:center;justify-content:space-between;gap:20px;font-size:{21 if jar else 24}px}}
.foot .mid{{flex:1;text-align:center;opacity:.85;letter-spacing:.02em}}
.foot .qty{{text-align:right;font-weight:500;line-height:1.3}}
.halal{{width:96px;height:96px;border:2px solid;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}}
.halal .ar{{font-family:Amiri;font-size:34px}}.halal .en{{font-size:15px;letter-spacing:.12em;margin-top:2px}}
.hal-front{{position:absolute;top:{70 if jar else 96}px;right:{(w - pw) / 2 + 40 if jar else 56}px}}
.side{{position:absolute;top:0;bottom:0;width:{(w - pw) / 2}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;font-size:22px;letter-spacing:.04em;opacity:.9;text-align:center;padding:0 40px}}
.side.left{{left:0;border-right:1.5px solid {p['accent']}55}}.side.right{{right:0;border-left:1.5px solid {p['accent']}55}}
</style></head><body>
{side}
<div class="panel">
  <svg class="logo" viewBox="110 120 2060 710"><path fill="{p['ink']}" d="{LOGO_D}"/></svg>
  <div class="arch">
    <svg class="st" width="60" height="60" viewBox="0 0 60 60">{star(30, 30, 24, p['accent'])}</svg>
    <div class="name">{p['name']}</div>
    <div class="sub">{p['sub']}</div>
    <div class="detail">{p['detail']}</div>
  </div>
  <div class="rule"></div>
  <div class="foot">{mark}<div class="mid">{foot_left}</div><div class="qty">{p['qty']}{'<br>' + p['qty2'] if p['qty2'] and not jar else ''}</div></div>
</div>
{'<div class="hal-front">' + halal_front + '</div>' if halal_front else ''}
</body></html>"""


def main():
    out = HERE / "out"
    out.mkdir(exist_ok=True)
    only = set(sys.argv[1:])
    with sync_playwright() as pw:
        b = pw.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        for p in PRODUCTS:
            if only and p["slug"] not in only:
                continue
            w, h = SIZES[p["fmt"]]
            f = HERE / f"{p['slug']}.html"
            f.write_text(page(p), encoding="utf-8")
            pg = b.new_page(viewport={"width": w, "height": h})
            pg.goto(f"file://{f}")
            pg.wait_for_timeout(500)
            pg.screenshot(path=str(out / f"{p['slug']}.png"))
            pg.close()
            print("rendered", p["slug"], w, h)
        b.close()


if __name__ == "__main__":
    main()
