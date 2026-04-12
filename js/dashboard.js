import { dashboardsData } from '../data/dashboards.js';

export function initDashboards() {
  const switcherContainer = document.getElementById('dashboard-switcher');
  const iframeContainer = document.getElementById('dashboard-frame');
  const contextContainer = document.getElementById('dashboard-context');

  if (!switcherContainer || !iframeContainer || !dashboardsData.length) return;

  dashboardsData.forEach((dash, index) => {
    const btn = document.createElement('button');
    btn.className = `dash-btn ${index === 0 ? 'active' : ''}`;
    btn.textContent = dash.title;
    btn.dataset.id = dash.id;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.dash-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadDashboard(dash);
    });

    switcherContainer.appendChild(btn);
  });

  // Load initial
  loadDashboard(dashboardsData[0]);

  function loadDashboard(dash) {
    iframeContainer.src = dash.iframeUrl;
    contextContainer.innerHTML = `
      <h3 class="mb-1">${dash.title}</h3>
      <p class="text-grey mb-2"><strong>Use Case:</strong> ${dash.businessUseCase}</p>
      <p><strong>Key Insight:</strong> ${dash.keyInsightSummary}</p>
    `;
  }
}
