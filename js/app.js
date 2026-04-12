import { initRouter } from './router.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Load Global Components
  await loadComponent('navbar-container', 'components/navbar.html');
  await loadComponent('footer-container', 'components/footer.html');

  // Initialize SPA Router
  initRouter();
});

async function loadComponent(elementId, path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Failed to load ' + path);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading component ${path}:`, error);
  }
}
