/* ═══════════════════════════════════════════════════
   SCRIPT.JS — Navigation, UI Interactions, Lab Logic
   ═══════════════════════════════════════════════════ */

/* ── Labs Dropdown Styles ── */
const _dropStyle = document.createElement('style');
_dropStyle.textContent = `
  .nav-dropdown { position: relative; }
  .nav-dropdown-toggle { cursor: pointer; display: flex; align-items: center; gap: 4px; }
  .dropdown-arrow { font-size: 0.65rem; transition: transform 0.15s; display: inline-block; }
  .nav-dropdown.open .dropdown-arrow,
  .nav-dropdown:hover .dropdown-arrow { transform: rotate(180deg); }
  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 12px;
    background: transparent;
    z-index: 200;
  }
  .dropdown-menu-inner {
    background: rgba(5,5,16,0.97);
    border: 1px solid rgba(0,255,255,0.15);
    border-radius: 6px;
    min-width: 160px;
    padding: 6px 0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(0,255,255,0.05);
  }
  .nav-dropdown:hover .dropdown-menu,
  .nav-dropdown.open .dropdown-menu { display: block; }
  .dropdown-menu li { list-style: none; }
  .dropdown-menu a {
    display: block;
    padding: 9px 18px;
    font-family: 'Orbitron', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    color: rgba(224,247,255,0.6);
    text-decoration: none;
    transition: color 0.1s, background 0.1s;
    white-space: nowrap;
  }
  .dropdown-menu a:hover,
  .dropdown-menu a.active {
    color: #00ffff;
    background: rgba(0,255,255,0.06);
  }
  /* Mobile */
  @media (max-width: 768px) {
    .dropdown-menu { position: static; transform: none; padding-top: 0; background: transparent; display: none; }
    .dropdown-menu-inner { background: transparent; border: none; box-shadow: none; padding: 0 0 0 16px; }
    .nav-dropdown.open .dropdown-menu { display: block; }
    .nav-dropdown:hover .dropdown-menu { display: none; }
    .nav-dropdown.open .dropdown-menu { display: block; }
    .dropdown-menu a { font-size: 0.7rem; padding: 7px 0; }
  }
`;
document.head.appendChild(_dropStyle);

// ── Navigation ──
document.addEventListener('DOMContentLoaded', () => {
  // Labs dropdown — click on mobile, hover on desktop
  const dropdown = document.querySelector('.nav-dropdown');
  const toggle   = document.getElementById('labs-toggle');
  if (dropdown && toggle) {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  }

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') ||
        href.replace('.html','') === path.replace('.html','')) {
      a.classList.add('active');
    }
  });

  // Hamburger menu
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        // Don't close menu if clicking labs toggle on mobile
        if (a.id === 'labs-toggle' && window.innerWidth <= 768) return;
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        if (dropdown) dropdown.classList.remove('open');
      });
    });
  }

  // Nav scroll background
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(5,5,16,0.98)';
    } else {
      nav.style.background = 'rgba(5,5,16,0.92)';
    }
  }, { passive: true });

  // Hero typing effect
  const typingEl = document.getElementById('hero-typing');
  if (typingEl && window.TypingEffect) {
    new TypingEffect(typingEl, [
      'Business Analytics',
      'Data Visualization',
      'Tableau | SQL | Python',
      'Dashboard Engineering',
      'Statistical Analysis',
    ], { speed: 50, delay: 2000 });
  }

  // Analytics Lab
  initAnalyticsLab();

  // Contact form
  initContactForm();

  // Loading screen
  initLoader();

  // Clock
  initClock();
});

// ── Loading Screen ──
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  // Fast load: fill bar quickly and dismiss within 600ms total
  const bar = loader.querySelector('.loader-bar-fill');
  const txt = loader.querySelector('.loader-pct');
  if (bar) bar.style.transition = 'width 0.4s ease';
  if (bar) bar.style.width = '100%';
  if (txt) txt.textContent = '100%';
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.3s ease';
    setTimeout(() => loader.remove(), 300);
  }, 400);
}

// ── Live Clock ──
function initClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    clockEl.textContent = `${h}:${m}:${s}`;
  }
  tick();
  setInterval(tick, 1000);
}

// ── Analytics Lab ──
function initAnalyticsLab() {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  if (!dropZone || !fileInput) return;

  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleCSV(file);
  });
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) handleCSV(file);
  });
}

function handleCSV(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const rows = text.trim().split('\n').map(r => r.split(',').map(c => c.trim().replace(/^"|"$/g,'')));
    if (rows.length < 2) { alert('CSV must have headers and data rows.'); return; }
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i] || '');
      return obj;
    });
    // Show results section
    const results = document.getElementById('lab-results');
    if (results) results.style.display = 'block';
    const fileInfo = document.getElementById('lab-file-info');
    if (fileInfo) {
      fileInfo.innerHTML = `<span class="text-cyan">◈ ${file.name}</span> &nbsp;|&nbsp; ${data.length} rows &nbsp;|&nbsp; ${headers.length} columns`;
    }
    const colList = document.getElementById('lab-columns');
    if (colList) {
      colList.innerHTML = headers.map(h => `<span class="project-tag">${h}</span>`).join('');
    }
    if (window.renderLabCharts) renderLabCharts(data, headers);
  };
  reader.readAsText(file);
}

// ── Contact Form ──
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '◈ SENDING...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ MESSAGE SENT';
      btn.style.borderColor = '#00ff88';
      btn.style.color = '#00ff88';
      form.reset();
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.borderColor = ''; btn.style.color = ''; }, 3000);
    }, 1500);
  });
}

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
