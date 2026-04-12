import { projectsData } from '../data/projects.js';
import { caseStudiesData } from '../data/caseStudies.js';

export function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  projectsData.forEach(project => {
    const card = document.createElement('div');
    card.className = 'insight-card mb-4';
    card.innerHTML = `
      <h3 class="mb-2">${project.title}</h3>
      <div class="mb-2"><strong class="text-blue">Problem:</strong> ${project.businessProblem}</div>
      <div class="mb-2"><strong class="text-grey">Context:</strong> ${project.datasetContext}</div>
      <div class="mb-2"><strong class="text-grey">Method:</strong> ${project.analyticalMethod}</div>
      <div class="mb-2"><strong>Key Insight:</strong> ${project.keyInsight}</div>
      <div class="mb-3"><strong>Recommendation:</strong> ${project.businessRecommendation}</div>
      <button class="btn-primary view-case" data-id="${project.caseStudyId}">View Interactive Case Study →</button>
    `;
    container.appendChild(card);
  });
}

export function initCaseStudies() {
  const container = document.getElementById('casestudy-container');
  if (!container) return;

  // Listen for clicks on "View Interactive Case Study"
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-case')) {
      const id = e.target.getAttribute('data-id');
      renderCaseStudyView(id);
      
      // Scroll to case study container
      window.scrollTo({
        top: document.getElementById('casestudy-section').offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
}

function renderCaseStudyView(id) {
  const container = document.getElementById('casestudy-container');
  const data = caseStudiesData[id];
  if (!data) return;

  const tabs = data.tabs;
  
  let headerHtml = `<div class="tabs-header">`;
  let contentHtml = `<div class="tabs-body">`;

  Object.keys(tabs).forEach((key, index) => {
    headerHtml += `<button class="tab-btn ${index === 0 ? 'active' : ''}" data-target="tab-${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</button>`;
    contentHtml += `<div class="tab-content ${index === 0 ? 'active' : ''}" id="tab-${key}">
      <p>${tabs[key]}</p>
    </div>`;
  });

  headerHtml += `</div>`;
  contentHtml += `</div>`;

  container.innerHTML = headerHtml + contentHtml;

  // Add listeners
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });
}
