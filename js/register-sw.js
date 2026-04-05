/* ═══════════════════════════════════════════════════
   register-sw.js — Service Worker Registration
   Auto-versioning: detects updates automatically,
   shows a toast notification when new version is ready.
   Add <script src="js/register-sw.js"></script>
   just before </body> in every HTML page
   ═══════════════════════════════════════════════════ */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/js/sw.js', { scope: '/' })
      .then(reg => {
        console.log('[SW] Registered — scope:', reg.scope);

        // ── Check for updates every 60 seconds ──
        setInterval(() => reg.update(), 60000);

        // ── Detect when a new version has been installed ──
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            // New SW installed and waiting — old one still active
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[SW] New version available');
              showUpdateToast(newWorker);
            }
          });
        });
      })
      .catch(err => console.warn('[SW] Registration failed:', err));

    // ── When SW takes control, reload to get fresh files ──
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  });
}

// ── Update Toast Notification ──────────────────────
// Shows a small cyberpunk-styled toast at bottom of screen
// "New version available — tap to update"
function showUpdateToast(newWorker) {
  // Avoid duplicate toasts
  if (document.getElementById('sw-update-toast')) return;

  const toast = document.createElement('div');
  toast.id = 'sw-update-toast';
  toast.innerHTML = `
    <span style="flex:1;">⚡ New version available</span>
    <button id="sw-update-btn">UPDATE NOW</button>
    <button id="sw-dismiss-btn">✕</button>
  `;
  Object.assign(toast.style, {
    position:       'fixed',
    bottom:         '20px',
    left:           '50%',
    transform:      'translateX(-50%)',
    display:        'flex',
    alignItems:     'center',
    gap:            '12px',
    background:     'rgba(0,10,20,0.97)',
    border:         '1px solid #0F766E',
    borderRadius:   '6px',
    padding:        '12px 20px',
    fontFamily:     "'Share Tech Mono', monospace",
    fontSize:       '0.78rem',
    color:          '#0F766E',
    boxShadow:      '0 0 24px rgba(15, 118, 110,0.2)',
    zIndex:         '99999',
    whiteSpace:     'nowrap',
    animation:      'swToastIn 0.3s ease both',
  });

  // Inject keyframe if not already present
  if (!document.getElementById('sw-toast-style')) {
    const style = document.createElement('style');
    style.id = 'sw-toast-style';
    style.textContent = `
      @keyframes swToastIn {
        from { opacity:0; transform:translateX(-50%) translateY(16px); }
        to   { opacity:1; transform:translateX(-50%) translateY(0); }
      }
      #sw-update-btn {
        font-family:'Orbitron',monospace; font-size:0.6rem; font-weight:700;
        letter-spacing:0.1em; color:#FAF9F6; background:#0F766E;
        border:none; border-radius:3px; padding:6px 14px; cursor:pointer;
        transition:background .2s;
      }
      #sw-update-btn:hover { background:#33ffff; }
      #sw-dismiss-btn {
        font-family:'Share Tech Mono',monospace; font-size:0.85rem;
        color:rgba(15, 118, 110,0.5); background:transparent;
        border:none; cursor:pointer; padding:4px 6px;
        transition:color .2s;
      }
      #sw-dismiss-btn:hover { color:#F97316; }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  // UPDATE NOW — tell waiting SW to take control
  document.getElementById('sw-update-btn').addEventListener('click', () => {
    newWorker.postMessage({ type: 'SKIP_WAITING' });
    toast.remove();
  });

  // Dismiss
  document.getElementById('sw-dismiss-btn').addEventListener('click', () => {
    toast.remove();
  });

  // Auto-dismiss after 12 seconds
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 12000);
}
