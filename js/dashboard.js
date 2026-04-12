import { dashboards } from '../data/dashboards.js';

export function initDashboards() {
  const switcher = document.getElementById('dash-switcher');
  const dashTitle = document.getElementById('dash-title');
  const dashUsecase = document.getElementById('dash-usecase');
  const dashInsight = document.getElementById('dash-insight');
  const iframe = document.getElementById('dash-iframe');

  if (!switcher || !dashboards.length) return;

  const selectDash = (id) => {
    const dash = dashboards.find(d => d.id === id);
    dashTitle.textContent = dash.title;
    dashUsecase.textContent = dash.useCase;
    dashInsight.textContent = dash.insight;
    
    // Prevent reloading if same
    if (iframe.src !== dash.embedUrl) {
      iframe.src = dash.embedUrl;
    }

    // Toggle active state
    Array.from(switcher.children).forEach(btn => {
      if (btn.dataset.id === id) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }
    });
  };

  // Build Switcher
  switcher.innerHTML = dashboards.map(d => `
    <button class="btn-secondary" data-id="${d.id}">${d.title}</button>
  `).join('');

  // Switcher listeners
  Array.from(switcher.children).forEach(btn => {
    btn.addEventListener('click', (e) => selectDash(e.target.dataset.id));
  });

  // Initial load
  selectDash(dashboards[0].id);
}
