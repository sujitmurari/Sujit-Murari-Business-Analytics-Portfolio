// Simulated Logistics Dataset
const dataset = [
  { id: 'ORD-001', type: '3PL', time: 45, status: 'Completed', tracked: 'Yes' },
  { id: 'ORD-002', type: 'In-House', time: 32, status: 'Completed', tracked: 'Yes' },
  { id: 'ORD-003', type: 'Manual Ledger', time: 120, status: 'Delayed', tracked: 'No' },
  { id: 'ORD-004', type: '3PL', time: 50, status: 'Completed', tracked: 'Yes' },
  { id: 'ORD-005', type: 'Manual Ledger', time: 145, status: 'Churned', tracked: 'No' },
  { id: 'ORD-006', type: 'In-House', time: 28, status: 'Completed', tracked: 'Yes' },
  { id: 'ORD-007', type: '3PL', time: 65, status: 'Delayed', tracked: 'Yes' },
  { id: 'ORD-008', type: 'Manual Ledger', time: 110, status: 'Delayed', tracked: 'No' },
];

export function initAnalyticsLab() {
  const tableBody = document.getElementById('lab-table-body');
  const searchInput = document.getElementById('lab-search');
  const filterBtn = document.getElementById('lab-filter-btn');

  if (!tableBody || !searchInput || !filterBtn) return;

  const renderTable = (data) => {
    tableBody.innerHTML = data.map(row => `
      <tr>
        <td>${row.id}</td>
        <td>${row.type}</td>
        <td>${row.time}</td>
        <td>
          <span style="padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; background: ${row.status === 'Completed' ? 'rgba(34,197,94,0.1)' : row.status === 'Delayed' ? 'rgba(234,179,8,0.1)' : 'rgba(239,68,68,0.1)'}; color: ${row.status === 'Completed' ? '#4ade80' : row.status === 'Delayed' ? '#facc15' : '#f87171'};">
            ${row.status}
          </span>
        </td>
        <td>${row.tracked}</td>
      </tr>
    `).join('');
  };

  const handleFilter = () => {
    const query = searchInput.value.toLowerCase();
    const filtered = dataset.filter(row => 
      row.status.toLowerCase().includes(query) || 
      row.type.toLowerCase().includes(query) ||
      row.id.toLowerCase().includes(query)
    );
    renderTable(filtered);
  };

  filterBtn.addEventListener('click', handleFilter);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleFilter();
  });

  // Initial render
  renderTable(dataset);
}
