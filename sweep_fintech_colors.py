import os
import re
import glob

html_files = glob.glob("c:/Users/Lenovo/Desktop/GitHub/Sujit-Murari-Business-Analytics-Portfolio/*.html")

replacements = [
    # Text colors
    (r'color:\s*rgba\(\s*224\s*,\s*247\s*,\s*255\s*,\s*0\.[89]\d*\s*\)', r'color: var(--text-hi)'),
    (r'color:\s*rgba\(\s*224\s*,\s*247\s*,\s*255\s*,\s*0\.[1-7]\d*\s*\)', r'color: var(--text-lo)'),
    (r'color:\s*#e0f7ff', r'color: var(--text-hi)'),
    (r'color:\s*#f8fafc', r'color: var(--text-hi)'),
    (r'color:\s*#00ffff', r'color: var(--cyan)'),
    (r'color:\s*#00ff88', r'color: var(--cyan)'),
    (r'color:\s*#38bdf8', r'color: var(--cyan)'),
    (r'color:\s*#0ea5e9', r'color: var(--cyan)'),
    (r'color:\s*#818cf8', r'color: var(--purple)'),
    (r'color:\s*#9b5cff', r'color: var(--purple)'),
    (r'color:\s*#7e22ce', r'color: var(--purple)'),
    (r'color:\s*rgba\(\s*0\s*,\s*255\s*,\s*255\s*,\s*0\.[789]\d*\s*\)', r'color: var(--cyan)'),
    (r'color:\s*rgba\(\s*0\s*,\s*255\s*,\s*255\s*,\s*0\.[1-6]\d*\s*\)', r'color: var(--text-lo)'),
    (r'color:\s*rgba\(\s*155\s*,\s*92\s*,\s*255\s*,\s*0\.[789]\d*\s*\)', r'color: var(--purple)'),
    (r'color:\s*rgba\(\s*155\s*,\s*92\s*,\s*255\s*,\s*0\.[1-6]\d*\s*\)', r'color: var(--text-lo)'),
    (r'color:\s*rgba\(\s*0\s*,\s*255\s*,\s*136\s*,\s*0\.\d*\s*\)', r'color: var(--cyan)'),

    # Backgrounds
    (r'background:\s*rgba\(\s*5\s*,\s*5\s*,\s*16\s*,\s*0\.\d+\s*\)', r'background: var(--bg)'),
    (r'background:\s*#050510', r'background: var(--bg)'),
    (r'background-color:\s*#050510', r'background-color: var(--bg)'),
    (r'background:\s*rgba\(\s*0\s*,\s*255\s*,\s*255\s*,\s*0\.0[1-9]\s*\)', r'background: rgba(2, 132, 199, 0.05)'),
    (r'background:\s*rgba\(\s*0\s*,\s*255\s*,\s*255\s*,\s*0\.[1-9]\d*\s*\)', r'background: rgba(2, 132, 199, 0.1)'),
    (r'background:\s*rgba\(\s*155\s*,\s*92\s*,\s*255\s*,\s*0\.0[1-9]\s*\)', r'background: rgba(51, 65, 85, 0.05)'),
    (r'background:\s*rgba\(\s*155\s*,\s*92\s*,\s*255\s*,\s*0\.[1-9]\d*\s*\)', r'background: rgba(51, 65, 85, 0.1)'),

    # Borders
    (r'border-color:\s*rgba\(\s*0\s*,\s*255\s*,\s*255\s*,\s*0\.\d+\s*\)', r'border-color: rgba(2, 132, 199, 0.2)'),
    (r'border-color:\s*rgba\(\s*155\s*,\s*92\s*,\s*255\s*,\s*0\.\d+\s*\)', r'border-color: rgba(51, 65, 85, 0.2)'),
    (r'border:\s*1px\s+solid\s+rgba\(\s*0\s*,\s*255\s*,\s*255\s*,\s*0\.\d+\s*\)', r'border: 1px solid rgba(2, 132, 199, 0.2)'),
    (r'border:\s*1px\s+solid\s+rgba\(\s*155\s*,\s*92\s*,\s*255\s*,\s*0\.\d+\s*\)', r'border: 1px solid rgba(51, 65, 85, 0.2)'),

    # Shadows and glows
    (r'box-shadow:\s*0\s+0\s+\d+px\s+#00ffff', r'box-shadow: none'),
    (r'box-shadow:\s*0\s+0\s+\d+px\s+rgba\(\s*0\s*,\s*255\s*,\s*255\s*,\s*0\.\d+\s*\)', r'box-shadow: none'),
    (r'text-shadow:\s*0\s+0\s+\d+px\s+#00ffff', r'text-shadow: none'),
    (r'text-shadow:\s*0\s+0\s+\d+px\s+rgba\(\s*0\s*,\s*255\s*,\s*255\s*,\s*0\.\d+\s*\)', r'text-shadow: none'),
    (r'text-shadow:\s*0\s+0\s+\d+px\s+rgba\(\s*155\s*,\s*92\s*,\s*255\s*,\s*0\.\d+\s*\)', r'text-shadow: none'),
]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(file)}")

print("Sweep completed successfully.")
