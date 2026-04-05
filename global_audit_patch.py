import os
import glob

print("Starting deep workspace audit and color patching...")

directory = r"c:\Users\Lenovo\Desktop\GitHub\Sujit-Murari-Business-Analytics-Portfolio"

# This dictionary maps all known harsh/cyberpunk/neon colors to the Warm Professional Light Theme
replacements = {
    # Neon Hex
    "#00ffff": "#0F766E",
    "#00FFFF": "#0F766E",
    "#9b5cff": "#D97706",
    "#9B5CFF": "#D97706",
    "#ff2d78": "#F97316",
    "#FF2D78": "#F97316",
    
    # Old Dark & Bright Slate Hex
    "#050510": "#FAF9F6",
    "#0f172a": "#FAF9F6", 
    "#1e293b": "#FFFFFF",
    "#334155": "#F3F4F6",
    "#38bdf8": "#0F766E",
    "#0ea5e9": "#0D635D",
    "#94a3b8": "#D97706",
    "#64748b": "#B45309",
    "#f43f5e": "#F97316",
    "#f8fafc": "#111827",
    "#cbd5e1": "#4B5563",
    
    # RGBA mappings
    "rgba(0,255,255,": "rgba(15, 118, 110,",
    "rgba(0, 255, 255,": "rgba(15, 118, 110,",
    "rgba(155,92,255,": "rgba(217, 119, 6,",
    "rgba(155, 92, 255,": "rgba(217, 119, 6,",
    "rgba(255,45,120,": "rgba(249, 115, 22,",
    "rgba(255, 45, 120,": "rgba(249, 115, 22,",
    "rgba(56, 189, 248,": "rgba(15, 118, 110,",
    "rgba(56,189,248,": "rgba(15, 118, 110,",
    "rgba(148, 163, 184,": "rgba(217, 119, 6,",
    "rgba(148,163,184,": "rgba(217, 119, 6,",
    "rgba(30, 41, 59,": "rgba(255, 255, 255,",
    "rgba(30,41,59,": "rgba(255, 255, 255,",
    "rgba(15, 23, 42,": "rgba(250, 249, 246,",
    "rgba(15,23,42,": "rgba(250, 249, 246,",
}

files_patched = 0

for root, _, files in os.walk(directory):
    # Skipping node_modules, .git, etc just in case
    if ".git" in root or "node_modules" in root:
        continue
    
    for file in files:
        if file.endswith('.html') or file.endswith('.css') or file.endswith('.js'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                for old_str, new_str in replacements.items():
                    content = content.replace(old_str, new_str)
                
                # Special handler for old eye-irritating bright whites left over
                # This ensures we don't accidentally replace #fff in valid spots like pure-white cards
                # But we'll leave it simple for now to avoid breaking layouts.
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    files_patched += 1
                    print(f"Patched: {os.path.relpath(filepath, directory)}")
            except Exception as e:
                print(f"Failed to read/write {filepath}: {e}")

print(f"Audit Complete! Files patched: {files_patched}")
