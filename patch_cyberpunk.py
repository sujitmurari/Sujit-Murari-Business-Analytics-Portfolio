import pathlib

p = pathlib.Path("css/cyberpunk.css")
content = p.read_text(encoding="utf-8")

# Professional Warm Light Replacements
replacements = {
    # Hex Colors
    "#00ffff": "#0F766E",    # Cyan to Teal
    "#00FFFF": "#0F766E",
    "#9b5cff": "#D97706",    # Purple to Amber
    "#9B5CFF": "#D97706",
    "#ff2d78": "#F97316",    # Pink to Coral
    "#FF2D78": "#F97316",
    "#050510": "#FAF9F6",    # Dark BG to Cream
    
    # RGBA Cyan to Teal
    "rgba(0,255,255,": "rgba(15, 118, 110,",
    "rgba(0, 255, 255,": "rgba(15, 118, 110,",
    
    # RGBA Purple to Amber
    "rgba(155,92,255,": "rgba(217, 119, 6,",
    "rgba(155, 92, 255,": "rgba(217, 119, 6,",
    
    # Text colors specific to terminal mapping
    "#e0f7ff": "#111827",    # terminal text input
    
    # Scanline and dark shadows to subtle light shadows
    "rgba(0,0,0,0.08)": "rgba(15, 118, 110, 0.05)",
    "rgba(0,0,0,0.5)": "rgba(0, 0, 0, 0.05)",
}

for old, new in replacements.items():
    content = content.replace(old, new)

p.write_text(content, encoding="utf-8")
print("Cyberpunk.css successfully transformed into a professional light aesthetic.")
