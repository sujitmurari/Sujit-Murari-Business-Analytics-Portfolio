/* ═══════════════════════════════════════════════════
   RESUME-ANIMATIONS.JS — Entrance, Counter, Tool Bars
   ═══════════════════════════════════════════════════ */

'use strict';

// ── Clock ──
function startClock() {
  const el = document.getElementById('live-clock');
  if (!el) return;
  const tick = () => {
    const n = new Date();
    const p = v => String(v).padStart(2,'0');
    el.textContent = `${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`;
  };
  tick(); setInterval(tick, 1000);
}

// ── Particle canvas ──
function startParticles() {
  const canvas = document.getElementById('resume-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts;
  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    spawn();
  };
  const spawn = () => {
    pts = Array.from({length:50}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35,
      r: Math.random()*1.2+.4,
      c: Math.random()>.5 ? '0,255,255' : '155,92,255',
      a: Math.random()*.3+.08,
    }));
  };
  const draw = () => {
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){
          ctx.beginPath();
          ctx.strokeStyle=`rgba(15, 118, 110,${.045*(1-d/130)})`;
          ctx.lineWidth=.5;
          ctx.moveTo(pts[i].x,pts[i].y);
          ctx.lineTo(pts[j].x,pts[j].y);
          ctx.stroke();
        }
      }
      pts[i].x+=pts[i].vx; pts[i].y+=pts[i].vy;
      if(pts[i].x<0||pts[i].x>W) pts[i].vx*=-1;
      if(pts[i].y<0||pts[i].y>H) pts[i].vy*=-1;
      ctx.beginPath();
      ctx.arc(pts[i].x,pts[i].y,pts[i].r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${pts[i].c},${pts[i].a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  window.addEventListener('resize', resize);
  resize(); draw();
}

// ── Reveal on scroll ──
function initReveal() {
  const els = document.querySelectorAll('.anim-in');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = +e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('visible'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
}

// ── Animate tool level bars ──
function initToolBars() {
  const bars = document.querySelectorAll('.tool-level-fill[data-w]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.width = e.target.dataset.w + '%';
        }, 300 + Math.random()*300);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => io.observe(b));
}

// ── Stagger language dots ──
function initLangDots() {
  const groups = document.querySelectorAll('.lang-dots');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const dots = e.target.querySelectorAll('.lang-dot');
        dots.forEach((d, i) => {
          setTimeout(() => d.classList.add(d.dataset.type || 'filled'), i * 100 + 200);
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.8 });
  groups.forEach(g => io.observe(g));
}

// ── Counter for KPI numbers ──
function animateCounter(el, target, dur=1600, suffix='') {
  const start = performance.now();
  const tick = now => {
    const t = Math.min((now-start)/dur, 1);
    const ease = 1-Math.pow(1-t,3);
    el.textContent = Math.round(ease*target) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const t = +e.target.dataset.count;
        const s = e.target.dataset.suffix || '';
        animateCounter(e.target, t, 1600, s);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  els.forEach(el => io.observe(el));
}

// ── Glitch flash ──
function initGlitch() {
  const el = document.querySelector('.glitch-text');
  if (!el) return;
  setInterval(() => {
    el.classList.add('glitch-active');
    setTimeout(() => el.classList.remove('glitch-active'), 200);
  }, 5000 + Math.random()*3000);
}

// ── Print button ──
function initPrint() {
  const btn = document.getElementById('print-btn');
  if (btn) btn.addEventListener('click', () => window.print());
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  startClock();
  startParticles();
  initReveal();
  initToolBars();
  initLangDots();
  initCounters();
  initGlitch();
  initPrint();
});
