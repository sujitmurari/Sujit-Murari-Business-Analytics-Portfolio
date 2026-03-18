import os
import re

root = '.'

# Regex patterns
style_re = re.compile(r'<link\s+rel="stylesheet"\s+href="css/style\.css(\?[^"]*)?"\s*/?>')
cyberpunk_re = re.compile(r'<link\s+rel="stylesheet"\s+href="css/cyberpunk\.css"\s*/?>[ \t]*\r?\n?')

# We only want to target exactly the nav-status div structure precisely across the site, it might have variations, 
# so a more flexible regex for nav-status
nav_status_re = re.compile(r'<div class="nav-status">.*?</div>\s*<span class="nav-status-text"[^>]*>.*?</span>\s*</div>\s*', re.DOTALL)
# actually the block is:
#     <div class="nav-status">
#       <div class="nav-status-dot"></div>
#       <span class="nav-status-text" id="live-clock">00:00:00</span>
#     </div>

nav_status_exact = re.compile(r'<div class="nav-status">\s*<div class="nav-status-dot"></div>\s*<span class="nav-status-text" id="live-clock">.*?</span>\s*</div>\s*')


for dirpath, dirs, files in os.walk(root):
    if '.git' in dirpath:
        continue
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(dirpath, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Cache bust style.css
            content = style_re.sub('<link rel="stylesheet" href="css/style.css?v=3.0"/>', content)
            
            # Remove cyberpunk.css
            content = cyberpunk_re.sub('', content)
            
            # Remove nav status block
            content = nav_status_exact.sub('', content)
            
            # If it's contact.html, remove the Cat Card.
            if f == 'contact.html':
                cat_card_re = re.compile(r'<!-- Cat Card -->\s*<div class="cat-card">.*?</div>\s*</div>\s*<!-- end right sidebar -->', re.DOTALL)
                content = cat_card_re.sub('</div><!-- end right sidebar -->', content)

            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(content)

print("HTML sweep complete.")
