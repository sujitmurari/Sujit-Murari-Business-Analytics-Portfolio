import { initRouter } from './router.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const navRes = await fetch('components/navbar.html');
    if(navRes.ok) document.getElementById('navbar-container').innerHTML = await navRes.text();
    
    const footRes = await fetch('components/footer.html');
    if(footRes.ok) document.getElementById('footer-container').innerHTML = await footRes.text();

    initRouter();
  } catch (e) {
    console.error("Error loading shell components: ", e);
  }
});
