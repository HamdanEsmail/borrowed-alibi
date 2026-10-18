"""Export the clinic's game pictures from clinic.svg.

Each picture is a crop of the same drawing, so it lines up with the room by itself.
The crop's top-left corner (x, y) is where the game places it, in game coordinates (960x540).
Pictures are exported at 2x so they stay sharp; the game shows them at half scale.

Run from the repo root:  python art/clinic/export.py
Needs Inkscape 1.x (inkscape.com on Windows).
"""
import copy
import os
import subprocess
import tempfile
import xml.etree.ElementTree as ET

SVG_NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG_NS)
ET.register_namespace("inkscape", "http://www.inkscape.org/namespaces/inkscape")

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "..", "public", "art", "clinic")
INKSCAPE = r"C:\Program Files\Inkscape\bin\inkscape.com"
FULL = (0, 0, 960, 540)

# name: (ids to keep, crop x, y, width, height). "room" keeps everything not drawn separately.
SEPARATE = ["bucket", "chair", "dynamic", "echo", "ivo", "near", "lamp", "shade"]
PICTURES = {
    "room": (None, FULL),
    "chair": (["chair"], (496, 272, 106, 152)),
    "cable": (["cable_b"], (566, 258, 48, 162)),
    "tag": (["tag"], (498, 430, 40, 28)),
    "bucket": (["bucket"], (296, 416, 48, 82)),
    "trolley": (["near"], (32, 376, 200, 164)),
    "ivo": (["ivo"], (402, 226, 70, 210)),
    "echo": (["echo"], (848, 242, 60, 208)),
    "lamp": (["lamp"], FULL),
    "shade": (["shade"], FULL),
}


def tag(name):
    return "{%s}%s" % (SVG_NS, name)


def picture_svg(root, keep, crop):
    x, y, w, h = crop
    svg = ET.Element(tag("svg"), {"width": str(w * 2), "height": str(h * 2), "viewBox": "%g %g %g %g" % crop})
    svg.append(copy.deepcopy(root.find(tag("defs"))))
    if keep is None:
        whole = copy.deepcopy(root)
        parents = {child: parent for parent in whole.iter() for child in parent}
        for element in list(whole.iter()):
            if element.get("id") in SEPARATE:
                parents[element].remove(element)
        for child in whole:
            if child.tag != tag("defs"):
                svg.append(child)
    else:
        for element in root.iter():
            if element.get("id") in keep:
                svg.append(copy.deepcopy(element))
    return ET.ElementTree(svg)


def main():
    root = ET.parse(os.path.join(HERE, "clinic.svg")).getroot()
    os.makedirs(OUT, exist_ok=True)
    build = tempfile.mkdtemp(prefix="clinic-art-")
    for name, (keep, crop) in PICTURES.items():
        svg_path = os.path.join(build, name + ".svg")
        picture_svg(root, keep, crop).write(svg_path, encoding="utf-8", xml_declaration=True)
        png_path = os.path.join(OUT, name + ".png")
        subprocess.run([INKSCAPE, svg_path, "--export-type=png", "--export-filename=" + png_path], check=True)
        print(name, crop[:2], "->", os.path.relpath(png_path))


if __name__ == "__main__":
    main()
