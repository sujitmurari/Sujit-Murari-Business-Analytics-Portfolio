import { caseStudies } from '../data/caseStudies.js';

export function initCaseStudies() {
  const switcher = document.getElementById('casestudy-switcher');
  const viewTitle = document.getElementById('cs-title');
  const contentArea = document.getElementById('cs-content-area');
  const tabsNav = document.getElementById('cs-tabs-nav');
  
  if (!switcher || !caseStudies.length) return;

  let activeCS = caseStudies[0];
  let activeTab = 'problem';

  const renderContent = () => {
    let contentHtml = '';
    const val = activeCS.tabs[activeTab];
    
    if (activeTab === 'impact') {
      contentHtml = `
        <div class="impact-box" style="margin-top:0;">
          <h4>Business Decision & Expected Impact</h4>
          <p class="text-grey" style="white-space: pre-line;">${val}</p>
        </div>
      `;
    } else {
      contentHtml = `<p class="text-grey" style="white-space: pre-line;">${val}</p>`;
    }
    contentArea.innerHTML = contentHtml;
  };

  const selectCS = (id) => {
    activeCS = caseStudies.find(c => c.id === id);
    viewTitle.textContent = activeCS.title;
    
    Array.from(switcher.children).forEach(btn => {
      if (btn.dataset.id === id) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }
    });

    renderContent();
  };

  // Build switcher buttons
  switcher.innerHTML = caseStudies.map(cs => `
    <button class="btn-secondary" style="text-align: left;" data-id="${cs.id}">${cs.title}</button>
  `).join('');

  // Init switcher listeners
  Array.from(switcher.children).forEach(btn => {
    btn.addEventListener('click', (e) => {
      selectCS(e.target.dataset.id);
    });
  });

  // Init Tab Listeners
  tabsNav.addEventListener('click', (e) => {
    if(e.target.tagName !== 'BUTTON') return;
    
    // Reset active
    Array.from(tabsNav.children).forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    activeTab = e.target.dataset.tab;
    renderContent();
  });

  // Initial select
  selectCS(activeCS.id);
}
