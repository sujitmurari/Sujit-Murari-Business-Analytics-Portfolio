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
    
    // Show Loader and explicitly clear old content
    app.innerHTML = '';
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
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
        <div class="text-small text-blue" style="font-weight: 600; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em;">[${p.domain}]</div>
        <span class="badge" style="border-color: var(--prof-blue); color: var(--prof-blue);">&lt;sys.obj /&gt;</span>
      </div>
      <h3 class="mb-3" style="font-family: monospace; text-transform: uppercase;">${p.title}</h3>
      
      <div style="font-family: monospace; font-size: 0.9rem; margin-bottom: 1.5rem;">
        <p class="mb-1"><span class="text-blue">&gt; Problem:</span> <span class="text-white">${p.problem}</span></p>
        <p class="mb-1"><span class="text-blue">&gt; Method:</span> <span class="text-grey">${p.method}</span></p>
      </div>
      
      <div class="insight-highlight mb-3">
        <span style="color: var(--prof-blue); text-transform: uppercase; font-weight: 700;">INSIGHT:</span> ${p.insight}
      </div>
      
      <div style="border-top: 1px dotted var(--border-subtle); padding-top: 1rem; font-family: monospace; font-size: 0.9rem;">
        <p class="mb-1"><span class="text-blue" style="text-transform: uppercase;">&gt; Recommendation:</span> <span class="text-grey">${p.decision}</span></p>
        <div style="background-color: rgba(163, 255, 18, 0.1); padding: 0.5rem; margin-top: 0.5rem; border: 1px solid var(--prof-blue); color: var(--prof-blue);">
          <strong>EXPECTED IMPACT:</strong> ${p.impact}
        </div>
      </div>
    </div>
  `).join('');
}
