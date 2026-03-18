import os
import re
import fileinput

root = '.'

# 1. Update css/style.css
css_path = os.path.join(root, 'css', 'style.css')
if os.path.exists(css_path):
    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()
    
    # 1a. Fonts
    css = css.replace("font-family: 'Orbitron', monospace;", "font-family: 'Inter', sans-serif;")
    css = css.replace("font-family: 'Share Tech Mono', monospace;", "font-family: monospace;")
    css = css.replace("font-family: 'Rajdhani', sans-serif;", "font-family: 'Inter', sans-serif;")
    css = css.replace("family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600;700", "family=Inter:wght@400;500;600;700")
    
    # 1b. Colors
    css = css.replace("--bg:         #050510;", "--bg:         #0f172a;")
    css = css.replace("--bg2:        #080820;", "--bg2:        #1e293b;")
    css = css.replace("--bg3:        #0d0d2b;", "--bg3:        #334155;")
    css = css.replace("--cyan:       #00ffff;", "--cyan:       #38bdf8;")
    css = css.replace("--cyan-dim:   rgba(0,255,255,0.5);", "--cyan-dim:   rgba(56, 189, 248, 0.5);")
    css = css.replace("--purple:     #9b5cff;", "--purple:     #818cf8;")
    css = css.replace("--purple-dim: rgba(155,92,255,0.5);", "--purple-dim: rgba(129, 140, 248, 0.5);")
    
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)

# 2. Iterate HTML files
core_list = """            <div class="data-label mb-16">CORE COMPETENCIES</div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <ul style="list-style:none;padding:0;margin:0;font-family:monospace;font-size:0.8rem;color:#38bdf8;">
                <li style="margin-bottom:8px;"><span style="color:#e0f7ff;">▸ Tableau:</span> Interactive Dashboards, LODs, KPI Cards</li>
                <li style="margin-bottom:8px;"><span style="color:#e0f7ff;">▸ Excel:</span> Pivot Tables, Advanced Charts, VLOOKUP/Index-Match</li>
                <li style="margin-bottom:8px;"><span style="color:#e0f7ff;">▸ SQL:</span> Joins, Window Functions, Data Aggregation</li>
                <li style="margin-bottom:8px;"><span style="color:#e0f7ff;">▸ Python:</span> Pandas, Multi-variate Analysis, Cleaning</li>
                <li style="margin-bottom:0;"><span style="color:#e0f7ff;">▸ R Programming:</span> Statistical modeling, Data mapping</li>
              </ul>
            </div>"""

for dirname, _, files in os.walk(root):
    if '.git' in dirname:
        continue
    for filename in files:
        if filename.endswith(('.html', '.css')):
            filepath = os.path.join(dirname, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Global font size bump
            content = re.sub(r'font-size:\s*0\.[456][0-9]*rem;?', 'font-size: 0.8rem;', content)
            
            if filename.endswith('.html'):
                # General aesthetics
                content = re.sub(r'<div class="grid-bg"></div>\s*<div class="scanlines"></div>\s*<canvas id="particle-canvas"></canvas>', '', content)
                content = content.replace('SYS:// &gt; SUJIT MURARI &gt; ', 'Portfolio / ')
                content = re.sub(r'class="([^"]*)glitch([^"]*)"', r'class="\1\2"', content)
                content = content.replace('ANALYTICS COMMAND CENTER', 'BUSINESS ANALYTICS PORTFOLIO')
                content = content.replace('ANALYTICS COMMAND CENTER v2.0', 'BUSINESS ANALYTICS PORTFOLIO')
                
                # index.html specific
                if filename == 'index.html':
                    content = content.replace('style="position:fixed;top:64px;left:0;right:0;z-index:99;"', 'style="position:absolute;top:64px;left:0;right:0;z-index:99;background:#0f172a;"')
                    content = content.replace('style="padding-top: calc(64px + 38px);"', 'style="padding-top: calc(64px + 60px);"')
                    # Replace Core Competencies section
                    content = re.sub(r'<div class="data-label mb-16">CORE COMPETENCIES</div>.*?</div>\s*</div>\s*</div>', core_list + '\n          </div>', content, flags=re.DOTALL)
                
                # dashboards.html specific
                if filename == 'dashboards.html':
                    content = content.replace('overflow: hidden;', 'overflow-x: auto; overflow-y: hidden;')
                    content = content.replace('height: 580px;', 'min-width: 1050px; height: 650px;')
                    content = content.replace('<div class="container">', '<div class="container" style="max-width: 1600px;">')
                    # Fix broken div
                    content = content.replace('              <div class="ki-item"><span class="ki-arrow">▸</span> Airline Pricing Strategy Differences</div>\n              <div class="ki-item"><span class="ki-arrow">▸</span> Certain Routes Have Consistently Higher Prices</div>\n            </div>\n            </div>\n\n            <div class="key-insights">\n              <div class="ki-title">◈ FILTERS AVAILABLE</div>', '              <div class="ki-item"><span class="ki-arrow">▸</span> Airline Pricing Strategy Differences</div>\n              <div class="ki-item"><span class="ki-arrow">▸</span> Certain Routes Have Consistently Higher Prices</div>\n            </div>\n\n            <div class="key-insights">\n              <div class="ki-title">◈ FILTERS AVAILABLE</div>')

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

# 3. register-sw.js fix
sw_reg_path = os.path.join(root, 'js', 'register-sw.js')
if os.path.exists(sw_reg_path):
    with open(sw_reg_path, 'r', encoding='utf-8') as f:
        reg_content = f.read()
    reg_content = reg_content.replace(".register('/sw.js', { scope: '/' })", ".register('/js/sw.js', { scope: '/' })")
    with open(sw_reg_path, 'w', encoding='utf-8') as f:
        f.write(reg_content)

print("Master transformation complete.")
