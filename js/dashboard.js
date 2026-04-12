import { dashboards } from '../data/dashboards.js';

export function initDashboards() {
  const navContainer = document.getElementById('dashboard-nav');
  if (!navContainer) return;
  
  // Render Links
  navContainer.innerHTML = dashboards.map(db => `
    <button class="dashboard-btn ${db.id === dashboards[0].id ? 'active' : ''}" data-id="${db.id}">
      ${db.title}
    </button>
  `).join('');

  // Attach Event Listeners
  document.querySelectorAll('.dashboard-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.dashboard-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      loadDashboard(e.target.getAttribute('data-id'));
    });
  });

  // Load Initial
  if (dashboards.length > 0) {
    loadDashboard(dashboards[0].id);
  }
}

function loadDashboard(id) {
  const db = dashboards.find(d => d.id === id);
  if (!db) return;

  // Update Metadata
  document.getElementById('meta-insight').innerText = db.insight;
  document.getElementById('meta-usecase').innerText = db.useCase;
  document.getElementById('meta-decision').innerText = db.decision;

  // Update iFrame
  const iframe = document.getElementById('tableau-frame');
  const loader = document.getElementById('iframe-loader');
  
  iframe.style.opacity = '0';
  loader.style.display = 'block';

  iframe.onload = () => {
    iframe.style.opacity = '1';
    loader.style.display = 'none';
  };
  
  iframe.src = db.url;
}
