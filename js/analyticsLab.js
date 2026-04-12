let currentData = [];

export function initAnalyticsLab() {
  const btns = document.querySelectorAll('.dataset-btn');
  if (btns.length === 0) return;

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btns.forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'var(--border-subtle)';
      });
      e.target.classList.add('active');
      e.target.style.borderColor = 'var(--prof-blue)';
      const filename = e.target.getAttribute('data-file');
      loadDataset(filename);
    });
  });

  document.getElementById('dataset-filter').addEventListener('input', (e) => {
    renderTable(currentData, e.target.value);
  });

  // Load Initial
  loadDataset('flights.csv');
}

async function loadDataset(filename) {
  document.getElementById('dataset-title').innerText = filename;
  document.getElementById('table-head').innerHTML = '';
  document.getElementById('table-body').innerHTML = '<tr><td colspan="10" style="text-align:center;">Loading data...</td></tr>';
  
  try {
    const response = await fetch(`datasets/${filename}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const text = await response.text();
    parseCSV(text);
  } catch (error) {
    document.getElementById('table-body').innerHTML = '<tr><td colspan="10" style="text-align:center; color: var(--muted-grey);">Placeholder data not found for this environment.</td></tr>';
  }
}

function parseCSV(text) {
  const lines = text.trim().split('\\n');
  if (lines.length === 0) return;

  const headers = lines[0].split(',');
  const rows = [];

  for (let i = 1; i < Math.min(lines.length, 21); i++) {
    rows.push(lines[i].split(','));
  }

  // Render headers
  document.getElementById('table-head').innerHTML = headers.map(h => `<th>${h}</th>`).join('');
  
  currentData = rows;
  renderTable(currentData, '');
}

function renderTable(rows, filterText) {
  const tbody = document.getElementById('table-body');
  const lowerFilter = filterText.toLowerCase();
  
  const filteredRows = rows.filter(row => 
    row.some(cell => cell.toLowerCase().includes(lowerFilter))
  );

  tbody.innerHTML = filteredRows.map(row => 
    `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
  ).join('');

  if (filteredRows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;">No matching records found.</td></tr>';
  }
}
