import os
import re

root = '.'
for dirname, _, files in os.walk(root):
    if '.git' in dirname:
        continue
    for filename in files:
        if filename.endswith('.html'):
            filepath = os.path.join(dirname, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove cyberpunk background
            content = re.sub(r'<div class="grid-bg"></div>\s*<div class="scanlines"></div>\s*<canvas id="particle-canvas"></canvas>', '', content)
            
            # Clean breadcrumbs
            content = content.replace('SYS:// &gt; SUJIT MURARI &gt; ', 'Portfolio / ')
            
            # Remove glitch classes
            content = re.sub(r'class="([^"]*)glitch([^"]*)"', r'class="\1\2"', content)
            content = content.replace('class=" "', 'class=""')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
print("done")
