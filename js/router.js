// Import handlers for specific routes
import { initCaseStudies } from './caseStudy.js';
import { initDashboards } from './dashboard.js';
import { initAnalyticsLab } from './analyticsLab.js';

// Import data
import { projects } from '../data/projects.js';

const routes = ['about', 'projects', 'case-studies', 'dashboards', 'analytics-lab', 'contact'];

export function initRouter() {
  const navigate = async () => {
    let hash = window.location.hash.replace('#', '') || 'about';
    if (!routes.includes(hash)) hash = 'about';

    const app = document.getElementById('app');
    
    // Show Loader
    try {
      const loaderRes = await fetch('components/loader.html');
      app.innerHTML = await loaderRes.text();
    } catch(e) {
      app.innerHTML = '<div class="spinner"></div>';
    }

    try {
      const htmlRes = await fetch(`sections/${hash}.html`);
      if (!htmlRes.ok) throw new Error('Section not found');
      const html = await htmlRes.text();
      app.innerHTML = html;

      // Handle Route-Specific Scripts
      if (hash === 'projects') renderProjects();
      if (hash === 'case-studies') initCaseStudies();
      if (hash === 'dashboards') initDashboards();
      if (hash === 'analytics-lab') initAnalyticsLab();

    } catch (e) {
      console.error(e);
      app.innerHTML = '<div style="text-align:center; padding:5rem;"><h2>Error loading section.</h2></div>';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateActiveNav(hash);
  };

  window.addEventListener('hashchange', navigate);
  navigate();
}

function updateActiveNav(hash) {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.classList.remove('text-blue');
    if (link.getAttribute('href') === `#${hash}`) {
      link.classList.add('text-blue');
    }
  });
}

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  
  container.innerHTML = projects.map(p => `
    <div class="card fade-in">
      <div class="text-small text-blue mb-1" style="font-weight: 600;">${p.domain}</div>
      <h3 class="mb-2">${p.title}</h3>
      <p class="mb-2"><strong class="text-white">Business Problem:</strong> <span class="text-grey">${p.problem}</span></p>
      <p class="mb-2"><strong class="text-white">Data Asset:</strong> <span class="text-grey">${p.data}</span></p>
      <p class="mb-2"><strong class="text-white">Analytical Method:</strong> <span class="text-grey">${p.method}</span></p>
      
      <div class="insight-highlight mb-3">
        <strong>Key Insight:</strong> ${p.insight}
      </div>
      
      <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
        <h4 style="font-size: 0.875rem; text-transform: uppercase; color: var(--muted-grey);">Decision & Expected Impact</h4>
        <p class="mt-2 text-grey"><strong>Decision:</strong> ${p.decision}</p>
        <p class="text-grey" style="color: var(--success-green); font-weight: 500;"><strong>Impact:</strong> ${p.impact}</p>
      </div>
    </div>
  `).join('');
}
