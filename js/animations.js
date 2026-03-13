/* ═══════════════════════════════════════════════════
   ANIMATIONS.JS — Typing, Grid, Panel Glow, Particles
   ═══════════════════════════════════════════════════ */

// ── Typing Effect ──
function initTypingEffect() {
  const el = document.getElementById('hero-typing');
  if (!el) return;
  const lines = [
    'Data Visualization',
    'Business Intelligence',
    'Decision Analytics',
    'Tableau Dashboards',
    'Statistical Analysis',
    'SQL & Python',
    'Pricing Analytics'
  ];
  let li = 0, ci = 0, del = false;
  const run = () => {
    const line = lines[li];
    if (!del) {
      el.textContent = line.slice(0, ++ci);
      if (ci >= line.length) { del = true; setTimeout(run, 1800); return; }
    } else {
      el.textContent = line.slice(0, --ci);
      if (ci === 0) { del = false; li = (li + 1) % lines.length; setTimeout(run, 400); return; }
    }
    setTimeout(run, del ? 22 : 55);
  };
  run();
}

// ── Counter Animation ──
function animateCounter(el, target, duration = 1800, suffix = '') {
  const start = performance.now();
  const startVal = 0;
  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(startVal + (target - startVal) * ease) + suffix;
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── Intersection Observer for reveal animations ──
function initRevealAnimations() {
  const items = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('revealed');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
}

// ── Neon Progress Bar animation ──
function animateProgressBars() {
  const bars = document.querySelectorAll('.neon-progress-bar[data-pct]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pct = entry.target.dataset.pct;
        setTimeout(() => { entry.target.style.width = pct + '%'; }, 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => observer.observe(bar));
}

// ── KPI Counter Init ──
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const fired = new WeakSet();

  function fireCounter(el) {
    if (fired.has(el)) return;
    fired.add(el);
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    animateCounter(el, target, 1800, suffix);
  }

  // Use a low threshold and rootMargin to catch elements that start hidden
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fireCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  counters.forEach(el => {
    // Set initial text to 0 so it never shows blank
    el.textContent = '0';
    observer.observe(el);
  });

  // Fallback: if any counter hasn't fired after 2.5s (e.g. reveal animation
  // delayed visibility), fire any that are now in the viewport
  setTimeout(() => {
    counters.forEach(el => {
      if (!fired.has(el)) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) fireCounter(el);
      }
    });
  }, 2500);
}

// ── Particle / Grid Background ──
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initP();
  }

  function initP() {
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '0,255,255' : '155,92,255'
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,255,255,${0.06 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    // Draw particles
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

// ── Panel Glow on Hover ──
function initPanelGlow() {
  document.querySelectorAll('.cp-panel, .holo-card').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', x + '%');
      el.style.setProperty('--my', y + '%');
    });
  });
}

// ── Terminal Text Writer ──
function initTerminal(containerId, lines) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let lineIdx = 0;

  function writeLine() {
    if (lineIdx >= lines.length) return;
    const { type, text, delay } = lines[lineIdx];
    lineIdx++;
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = 't-' + type;
      container.appendChild(p);
      container.scrollTop = container.scrollHeight;
      if (type === 'prompt' || type === 'cmd') {
        let i = 0;
        const iv = setInterval(() => {
          p.textContent = text.slice(0, ++i);
          if (i >= text.length) { clearInterval(iv); writeLine(); }
        }, 35);
      } else {
        p.textContent = text;
        writeLine();
      }
    }, delay || 0);
  }
  writeLine();
}

// ── Init all on DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initRevealAnimations();
  animateProgressBars();
  initCounters();
  initParticles();
  initPanelGlow();

  // ── KPI Counter fix: re-check after loader is removed ──
  // The loader div covers the viewport so IntersectionObserver never fires.
  // Once the loader fades out, force-check any counters still showing 0.
  const recheckCounters = () => {
    document.querySelectorAll('[data-count]').forEach(el => {
      if (el.textContent === '0' || el.textContent === '') {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, 1800, suffix);
        }
      }
    });
  };
  // Check at 500ms and 1200ms after load to catch both fast and slow loader dismissals
  setTimeout(recheckCounters, 500);
  setTimeout(recheckCounters, 1200);
});
