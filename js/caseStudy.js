import { caseStudies } from '../data/caseStudies.js';

let activeCsId = null;

export function initCaseStudies() {
  const navContainer = document.getElementById('cs-nav');
  if (!navContainer) return;
  
  // Render Left Navigation
  navContainer.innerHTML = caseStudies.map(cs => `
    <button class="btn btn-secondary cs-selector ${cs.id === caseStudies[0].id ? 'active-cs' : ''}" 
            style="justify-content: flex-start; text-align: left; border-color: ${cs.id === caseStudies[0].id ? 'var(--prof-blue)' : 'var(--border-subtle)'};" 
            data-id="${cs.id}">
      ${cs.title}
    </button>
  `).join('');

  // Attach Event Listeners
  document.querySelectorAll('.cs-selector').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Highlight nav button
      document.querySelectorAll('.cs-selector').forEach(b => b.style.borderColor = 'var(--border-subtle)');
      e.target.style.borderColor = 'var(--prof-blue)';
      loadCaseStudy(e.target.getAttribute('data-id'));
    });
  });

  // Load initial
  if (caseStudies.length > 0) {
    loadCaseStudy(caseStudies[0].id);
  }
}

function loadCaseStudy(id) {
  activeCsId = id;
  const cs = caseStudies.find(c => c.id === id);
  if (!cs) return;

  document.getElementById('cs-title').innerText = cs.title;
  
  const tabsHeader = document.getElementById('cs-tabs-header');
  const contentArea = document.getElementById('cs-content-area');

  // Render Tabs
  tabsHeader.innerHTML = cs.tabs.map((t, index) => `
    <button class="tab-btn ${index === 0 ? 'active' : ''}" data-index="${index}">${t.name}</button>
  `).join('');

  // Handle Tab Clicks
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const idx = e.target.getAttribute('data-index');
      renderContent(cs.tabs[idx].content);
    });
  });

  // Load initial tab content
  renderContent(cs.tabs[0].content);
}

function renderContent(html) {
  const contentArea = document.getElementById('cs-content-area');
  contentArea.innerHTML = html;
  // Small animation trigger
  contentArea.style.opacity = '0';
  setTimeout(() => contentArea.style.opacity = '1', 50);
}
