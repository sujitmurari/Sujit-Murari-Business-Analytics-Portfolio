import { initNavigation } from './navigation.js';
import { initDashboards } from './dashboard.js';
import { initCaseStudies, renderProjects } from './caseStudy.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderProjects();
  initCaseStudies();
  initDashboards();
});
