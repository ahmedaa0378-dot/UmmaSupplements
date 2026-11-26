"""Render a page that exposes window.render(t) / window.DUR / window.READY to stills or a video.

Same page contract as Lemo-Opuscar's core/render (picture is a function of time), done with
Playwright and ffmpeg so it runs with what this project already has.

  python3 render.py stills <url> <out_dir> <w> <h> t1 t2 ...
  python3 render.py video  <url> <out.mp4> <w> <h> [fps] [crf]
"""
import subprocess
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright


def open_page(p, url, w, h):
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
    pg.goto(url)
    pg.wait_for_function("window.READY === true", timeout=60000)
    return b, pg


def main():
    mode, url, out, w, h = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5])
    with sync_playwright() as p:
        b, pg = open_page(p, url, w, h)
        if mode == "stills":
            Path(out).mkdir(parents=True, exist_ok=True)
            for t in sys.argv[6:]:
                pg.evaluate(f"window.render({float(t)})")
                pg.screenshot(path=f"{out}/t_{t}.jpg", type="jpeg", quality=88)
                print("still", t)
        else:
            fps = int(sys.argv[6]) if len(sys.argv) > 6 else 24
            crf = sys.argv[7] if len(sys.argv) > 7 else "26"
            dur = pg.evaluate("window.DUR")
            n = round(dur * fps)
            ff = subprocess.Popen(
                ["ffmpeg", "-v", "error", "-y", "-f", "image2pipe", "-framerate", str(fps), "-i", "-",
                 "-c:v", "libx264", "-preset", "slow", "-crf", crf, "-pix_fmt", "yuv420p",
                 "-movflags", "+faststart", out],
                stdin=subprocess.PIPE,
            )
            for i in range(n):  # frame n would equal frame 0, so the loop is seamless
                pg.evaluate(f"window.render({i / fps})")
                ff.stdin.write(pg.screenshot(type="png"))
                if i % 48 == 0:
                    print("frame", i, "/", n, flush=True)
            ff.stdin.close()
            ff.wait()
            print("wrote", out)
        b.close()


if __name__ == "__main__":
    main()
