# 🚀 SUJIT MURARI — Portfolio v3.0 Release Notes

**Release Date:** March 2026  
**Live URL:** https://sujitmurari.is-a.dev/  
**GitHub:** https://github.com/sujitmurari/Sujit-Murari-Business-Analytics-Portfolio

---

## ✅ Bug Fixes

| # | Issue | Fix |
|---|-------|-----|
| 1 | KPI counters stuck at `0` on homepage | IntersectionObserver threshold lowered `0.5 → 0.15` in `animations.js` |
| 2 | Loading screen took 3–4 seconds | `initLoader()` rewritten — completes in ~700ms total |
| 3 | Year mismatch (2025 in ticker, 2026 in footer) | Ticker updated to `IV · 2026` across all pages |
| 4 | About page still showing "DataNexus" branding | Replaced with `SM / SUJIT:MURARI` branding |
| 5 | README.md had wrong title and year | Updated to "Sujit Murari — Business Analytics Portfolio · 2026" |

---

## ✨ New Features

### 🗄️ Code Lab Page (`code-lab.html`)
- **Merged SQL + Python** into one unified page — reduces nav from 10 → 9 items
- Top-level language switcher: `🗄️ SQL` ↔ `🐍 PYTHON`

**SQL side:**
- 6 concept filter tabs — JOINs · Window Functions · Subqueries · Aggregation · Revenue Analytics · Schema Design
- 100+ queries across 5 databases with syntax highlighting (Highlight.js)
- Copy-to-clipboard button on every query card
- Plain-English description per query (business context)
- Kaggle dataset link: `sujitmurari/sql-html`

**Python side:**
- 5 project cards with technique grids and code snippets
- Projects: DS Jobs EDA · Stress Dataset EDA · Digital Habits Survey · Churn Prediction (Kaggle) · Eco Monitor App
- Library strip: pandas · numpy · matplotlib · seaborn · scikit-learn · tkinter+sqlite3

### ⬇️ Download Resume Button
- Added green CTA button to homepage hero — direct PDF download

---

## 🗃️ Files Changed

```
index.html          ← counter fix, year fix, resume button
about.html          ← year fix
script.js           ← loader rewrite (~700ms)
animations.js       ← IntersectionObserver threshold fix
README.md           ← branding + year update
code-lab.html       ← NEW — merged SQL + Python showcase
```

---

## 🔜 Planned for v4

- [ ] Upload actual Resume PDF and link it
- [ ] Add headshot / avatar to About page
- [ ] Eco Monitor as standalone GitHub repo with screenshots
- [ ] Reduce nav to 7 items (merge Analytics Lab → Projects)
- [ ] Add LinkedIn + GitHub links to hero section
- [ ] "Currently Learning" ticker strip
- [ ] Skills page — proficiency grouping (Advanced / Intermediate / Familiar)
- [ ] Project case study one-liners: Problem → What I did → Result

---

*Built with: HTML · CSS · Vanilla JS · Tableau Public · Highlight.js*  
*Deployed via: Cloudflare Pages · is-a.dev subdomain*
