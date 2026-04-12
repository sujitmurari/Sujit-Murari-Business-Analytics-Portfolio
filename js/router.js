import { projects } from '../data/projects.js';
import { initCaseStudies } from './caseStudy.js';
import { initDashboards } from './dashboard.js';
import { initAnalyticsLab } from './analyticsLab.js';

const routes = ['about', 'projects', 'case-studies', 'dashboards', 'analytics-lab', 'contact'];

export function initRouter() {
  const navigate = async () => {
    let hash = window.location.hash.replace('#', '') || 'about';
    if (!routes.includes(hash)) hash = 'about';

    const app = document.getElementById('app');
    
    // Using loader
    try {
      const loaderRes = await fetch('components/loader.html');
      app.innerHTML = await loaderRes.text();
    } catch(e) {
      app.innerHTML = '<div style="text-align:center; padding:5rem;">Loading...</div>';
    }

    try {
      const htmlRes = await fetch(`sections/${hash}.html`);
      const html = await htmlRes.text();
      app.innerHTML = html;

      // Handle Scripts
      if (hash === 'projects') renderProjects();
      if (hash === 'case-studies') initCaseStudies();
      if (hash === 'dashboards') initDashboards();
      if (hash === 'analytics-lab') initAnalyticsLab();

    } catch (e) {
      app.innerHTML = '<div style="text-align:center; padding:5rem;">Error loading section.</div>';
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  window.addEventListener('hashchange', navigate);
  navigate();
}

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  
  container.innerHTML = projects.map(p => `
    <div class="insight-card">
      <div class="text-small text-grey mb-1">${p.domain}</div>
      <h3 class="mb-2">${p.title}</h3>
      <p class="mb-2"><strong>Problem:</strong> <span class="text-grey">${p.problem}</span></p>
      <p class="mb-2"><strong>Data Context:</strong> <span class="text-grey">${p.data}</span></p>
      <p class="mb-2"><strong>Method:</strong> <span class="text-grey">${p.method}</span></p>
      <p class="mb-3"><strong>Insight:</strong> <span class="text-grey">${p.insight}</span></p>
      <div class="impact-box" style="margin-bottom:0;">
        <h4>Decision & Impact</h4>
        <p class="text-small text-grey"><strong>Decision:</strong> ${p.decision}<br><strong>Impact:</strong> ${p.impact}</p>
      </div>
    </div>
  `).join('');
}
