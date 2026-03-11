#!/usr/bin/env python3
"""
patch_favicons.py
Run this in the root of the SM portfolio repo (DataNexusV2).
It replaces the two old favicon lines in every HTML file
with the full favicon + PWA + OG block.

Usage:
    python patch_favicons.py
"""

import os
import re

# ── Pages to patch ──────────────────────────────────────────────
HTML_FILES = [
    "index.html",
    "about.html",
    "skills.html",
    "projects.html",
    "dashboards.html",
    "analytics-lab.html",
    "resume.html",
    "contact.html",
]

# ── New favicon block ────────────────────────────────────────────
NEW_BLOCK = """  <!-- Standard favicons -->
  <link rel="icon" type="image/x-icon"          href="favicon.ico"/>
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
  <link rel="icon" type="image/png" sizes="16x16"  href="favicon-16x16.png"/>
  <link rel="icon" type="image/png" sizes="32x32"  href="favicon-32x32.png"/>

  <!-- Apple Touch Icon -->
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png"/>

  <!-- Android / PWA -->
  <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png"/>
  <link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png"/>

  <!-- Web App Manifest -->
  <link rel="manifest" href="site.webmanifest"/>

  <!-- Theme color (browser chrome on mobile) -->
  <meta name="theme-color" content="#050510"/>
  <meta name="msapplication-TileColor" content="#050510"/>
  <meta name="msapplication-TileImage" content="android-chrome-192x192.png"/>

  <!-- Open Graph preview image -->
  <meta property="og:image"        content="android-chrome-512x512.png"/>
  <meta property="og:image:width"  content="512"/>
  <meta property="og:image:height" content="512"/>"""

# ── Pattern: matches the two old favicon lines (order-insensitive) ──
# Handles both orders and any whitespace between them
OLD_PATTERN = re.compile(
    r'\s*<link rel="(?:icon|shortcut icon)" type="image/x-icon"[^>]*/>\s*'
    r'<link rel="(?:shortcut icon|icon)" type="image/x-icon"[^>]*/>',
    re.IGNORECASE
)

def patch_file(path):
    if not os.path.exists(path):
        print(f"  SKIP  {path} (not found)")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Already patched?
    if 'rel="manifest"' in content:
        print(f"  ALREADY PATCHED  {path}")
        return

    # Replace old two-line favicon block
    if OLD_PATTERN.search(content):
        new_content = OLD_PATTERN.sub("\n" + NEW_BLOCK, content, count=1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  PATCHED  {path}")
    else:
        # Fallback: insert after <meta name="viewport" .../>
        viewport_pat = re.compile(r'(<meta name="viewport"[^>]*/>)', re.IGNORECASE)
        if viewport_pat.search(content):
            new_content = viewport_pat.sub(r'\1\n' + NEW_BLOCK, content, count=1)
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"  PATCHED (viewport fallback)  {path}")
        else:
            print(f"  MANUAL NEEDED  {path} — could not find insertion point")

if __name__ == "__main__":
    print("Patching favicon tags in SM portfolio HTML files...\n")
    for html in HTML_FILES:
        patch_file(html)
    print("\nDone. Also copy these files to your repo root:")
    print("  favicon.ico, favicon-16x16.png, favicon-32x32.png")
    print("  apple-touch-icon.png")
    print("  android-chrome-192x192.png, android-chrome-512x512.png")
    print("  site.webmanifest")
