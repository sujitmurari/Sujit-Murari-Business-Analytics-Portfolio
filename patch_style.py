import pathlib
import re

p = pathlib.Path("css/style.css")
content = p.read_text(encoding="utf-8")

# Replace card-premium components with regex to avoid whitespace issues
new_card = """    /* ── Premium Components ── */
    .card-premium {
      background: var(--bg2);
      border: 1px solid var(--glass-border);
      box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
      border-radius: 16px;
      padding: 32px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    .card-premium:hover {
      border-color: rgba(0, 0, 0, 0.08); /* slightly stronger border */
      background: var(--bg2);
      transform: translateY(-4px);
      box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.08);
    }
    
    .btn-premium {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 14px 28px;
      background: var(--cyan);
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 0.9rem;
      border-radius: 6px;
      transition: all 0.3s ease;
      border: 1px solid var(--cyan);
      box-shadow: 0 2px 4px rgba(15, 118, 110, 0.2);
    }
    .btn-premium:hover {
      background: #0D635D;
      border-color: #0D635D;
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(15, 118, 110, 0.3);
    }"""

content = re.sub(r'/\* ── Premium Components ── \*/.*?\.btn-premium:hover\s*{[^\}]*}', new_card, content, flags=re.DOTALL)

p.write_text(content, encoding="utf-8")
print("Card premium styles patched successfully.")
