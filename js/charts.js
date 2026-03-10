/* ═══════════════════════════════════════════════════
   CHARTS.JS — Chart.js Visualizations
   ═══════════════════════════════════════════════════ */

const COLORS = {
  cyan:       '#00ffff',
  purple:     '#9b5cff',
  pink:       '#ff2d78',
  blue:       '#3a7bd5',
  cyanAlpha:  'rgba(0,255,255,',
  purpleAlpha:'rgba(155,92,255,',
};

// ── Shared Chart Defaults ──
function setupChartDefaults() {
  if (!window.Chart) return;
  Chart.defaults.color = 'rgba(224,247,255,0.6)';
  Chart.defaults.font.family = "'Share Tech Mono', monospace";
  Chart.defaults.font.size = 11;
  Chart.defaults.plugins.legend.labels.color = 'rgba(224,247,255,0.7)';
  Chart.defaults.plugins.legend.labels.boxWidth = 12;
}

// ── Radar Chart (Skills) ──
function initRadarChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  const ctx = canvas.getContext('2d');
  const gradientFill = ctx.createRadialGradient(0,0,0, canvas.width/2, canvas.height/2, canvas.width/2);
  gradientFill.addColorStop(0, 'rgba(0,255,255,0.25)');
  gradientFill.addColorStop(1, 'rgba(155,92,255,0.08)');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Tableau','Excel','SQL','Python','Statistics','Power BI','Data Viz'],
      datasets: [{
        label: 'Skill Level',
        data: [88, 90, 78, 72, 80, 70, 85],
        fill: true,
        backgroundColor: gradientFill,
        borderColor: COLORS.cyan,
        borderWidth: 2,
        pointBackgroundColor: COLORS.cyan,
        pointBorderColor: '#050510',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.cyan,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          min: 0, max: 100,
          ticks: {
            stepSize: 20,
            color: 'rgba(0,255,255,0.3)',
            backdropColor: 'transparent',
            font: { size: 9 }
          },
          grid: { color: 'rgba(0,255,255,0.1)' },
          angleLines: { color: 'rgba(0,255,255,0.1)' },
          pointLabels: {
            color: 'rgba(224,247,255,0.8)',
            font: { size: 10, family: "'Orbitron', monospace", weight: '600' }
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(5,5,16,0.9)',
          borderColor: COLORS.cyan,
          borderWidth: 1,
          titleColor: COLORS.cyan,
          bodyColor: '#e0f7ff',
          padding: 12,
        }
      },
      animation: { duration: 1500, easing: 'easeInOutQuart' }
    }
  });
}

// ── Bar Chart (Projects) ──
function initBarChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  const ctx = canvas.getContext('2d');
  const g1 = ctx.createLinearGradient(0, 0, 0, 300);
  g1.addColorStop(0, 'rgba(0,255,255,0.8)');
  g1.addColorStop(1, 'rgba(0,255,255,0.1)');
  const g2 = ctx.createLinearGradient(0, 0, 0, 300);
  g2.addColorStop(0, 'rgba(155,92,255,0.8)');
  g2.addColorStop(1, 'rgba(155,92,255,0.1)');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Airline', 'Flipkart', 'AI Prod', 'Gym', 'Retail'],
      datasets: [
        {
          label: 'Data Points (K)',
          data: [12, 18, 8, 6, 15],
          backgroundColor: g1,
          borderColor: COLORS.cyan,
          borderWidth: 1,
          borderRadius: 2,
        },
        {
          label: 'Insights Found',
          data: [7, 11, 5, 4, 9],
          backgroundColor: g2,
          borderColor: COLORS.purple,
          borderWidth: 1,
          borderRadius: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          grid: { color: 'rgba(0,255,255,0.06)' },
          ticks: { color: 'rgba(224,247,255,0.6)' },
          border: { color: 'rgba(0,255,255,0.2)' }
        },
        y: {
          grid: { color: 'rgba(0,255,255,0.06)' },
          ticks: { color: 'rgba(224,247,255,0.6)' },
          border: { color: 'rgba(0,255,255,0.2)' }
        }
      },
      plugins: {
        legend: { labels: { color: 'rgba(224,247,255,0.7)' } },
        tooltip: {
          backgroundColor: 'rgba(5,5,16,0.9)',
          borderColor: COLORS.cyan, borderWidth: 1,
          titleColor: COLORS.cyan, bodyColor: '#e0f7ff', padding: 12
        }
      },
      animation: { duration: 1200, easing: 'easeInOutQuart' }
    }
  });
}

// ── Line Chart (Skill Growth) ──
function initLineChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 200);
  g.addColorStop(0, 'rgba(0,255,255,0.3)');
  g.addColorStop(1, 'rgba(0,255,255,0)');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      datasets: [
        {
          label: 'Technical Skills',
          data: [30, 50, 70, 88],
          fill: true,
          backgroundColor: g,
          borderColor: COLORS.cyan,
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: COLORS.cyan,
          pointRadius: 5, pointHoverRadius: 8,
        },
        {
          label: 'Business Acumen',
          data: [45, 55, 68, 82],
          fill: false,
          borderColor: COLORS.purple,
          borderWidth: 2,
          borderDash: [6,3],
          tension: 0.4,
          pointBackgroundColor: COLORS.purple,
          pointRadius: 5, pointHoverRadius: 8,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          grid: { color: 'rgba(0,255,255,0.06)' },
          ticks: { color: 'rgba(224,247,255,0.6)' },
          border: { color: 'rgba(0,255,255,0.2)' }
        },
        y: {
          min: 0, max: 100,
          grid: { color: 'rgba(0,255,255,0.06)' },
          ticks: { color: 'rgba(224,247,255,0.6)', callback: v => v + '%' },
          border: { color: 'rgba(0,255,255,0.2)' }
        }
      },
      plugins: {
        legend: { labels: { color: 'rgba(224,247,255,0.7)' } },
        tooltip: {
          backgroundColor: 'rgba(5,5,16,0.9)',
          borderColor: COLORS.cyan, borderWidth: 1,
          titleColor: COLORS.cyan, bodyColor: '#e0f7ff', padding: 12
        }
      },
      animation: { duration: 1200, easing: 'easeInOutQuart' }
    }
  });
}

// ── Doughnut Chart (Domain Focus) ──
function initDoughnutChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Data Viz', 'Statistics', 'Business Intel', 'SQL/Databases', 'Python/Pandas'],
      datasets: [{
        data: [30, 20, 25, 15, 10],
        backgroundColor: [
          'rgba(0,255,255,0.7)',
          'rgba(155,92,255,0.7)',
          'rgba(255,45,120,0.6)',
          'rgba(58,123,213,0.7)',
          'rgba(0,200,150,0.6)',
        ],
        borderColor: '#050510',
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'right',
          labels: { color: 'rgba(224,247,255,0.7)', padding: 16, usePointStyle: true, pointStyleWidth: 10 }
        },
        tooltip: {
          backgroundColor: 'rgba(5,5,16,0.9)',
          borderColor: COLORS.cyan, borderWidth: 1,
          titleColor: COLORS.cyan, bodyColor: '#e0f7ff', padding: 12
        }
      },
      animation: { duration: 1400, easing: 'easeInOutQuart' }
    }
  });
}

// ── Lab CSV Analysis Charts ──
function renderLabCharts(data, columns) {
  const numericCols = columns.filter(col =>
    data.every(row => !isNaN(parseFloat(row[col])) && row[col] !== '')
  );
  if (numericCols.length === 0) return;

  // Histogram for first numeric column
  const col1 = numericCols[0];
  const values1 = data.map(r => parseFloat(r[col1])).filter(v => !isNaN(v));
  renderHistogram('lab-histogram', col1, values1);

  // Scatter for first two numeric columns
  if (numericCols.length >= 2) {
    const col2 = numericCols[1];
    const values2 = data.map(r => parseFloat(r[col2])).filter(v => !isNaN(v));
    const minLen = Math.min(values1.length, values2.length, 80);
    renderScatter('lab-scatter', col1, col2,
      Array.from({length: minLen}, (_, i) => ({ x: values1[i], y: values2[i] }))
    );
  }

  // Stats
  showStats(col1, values1, numericCols.length >= 2 ? numericCols[1] : null,
    numericCols.length >= 2 ? data.map(r => parseFloat(r[numericCols[1]])).filter(v => !isNaN(v)) : null);
}

function renderHistogram(canvasId, label, values) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  // Destroy previous chart
  if (canvas._chart) canvas._chart.destroy();
  const ctx = canvas.getContext('2d');
  const bins = 12;
  const min = Math.min(...values), max = Math.max(...values);
  const binW = (max - min) / bins;
  const counts = Array(bins).fill(0);
  const labels = [];
  for (let i = 0; i < bins; i++) {
    labels.push((min + i * binW).toFixed(1));
    values.forEach(v => { if (v >= min + i*binW && v < min + (i+1)*binW) counts[i]++; });
  }
  const g = ctx.createLinearGradient(0, 0, 0, 300);
  g.addColorStop(0, 'rgba(0,255,255,0.8)');
  g.addColorStop(1, 'rgba(0,255,255,0.1)');
  canvas._chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ label, data: counts, backgroundColor: g, borderColor: COLORS.cyan, borderWidth: 1, borderRadius: 2 }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(5,5,16,0.9)', borderColor: COLORS.cyan, borderWidth: 1, titleColor: COLORS.cyan, bodyColor: '#e0f7ff' } },
      scales: {
        x: { grid: { color: 'rgba(0,255,255,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)', maxTicksLimit: 6 }, border: { color: 'rgba(0,255,255,0.15)' } },
        y: { grid: { color: 'rgba(0,255,255,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)' }, border: { color: 'rgba(0,255,255,0.15)' } }
      }
    }
  });
}

function renderScatter(canvasId, xLabel, yLabel, points) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  if (canvas._chart) canvas._chart.destroy();
  const ctx = canvas.getContext('2d');
  canvas._chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: `${xLabel} vs ${yLabel}`,
        data: points,
        backgroundColor: 'rgba(155,92,255,0.6)',
        borderColor: COLORS.purple,
        borderWidth: 1,
        pointRadius: 4, pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(5,5,16,0.9)', borderColor: COLORS.purple, borderWidth: 1, titleColor: COLORS.purple, bodyColor: '#e0f7ff' } },
      scales: {
        x: { title: { display: true, text: xLabel, color: 'rgba(0,255,255,0.6)' }, grid: { color: 'rgba(0,255,255,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)' }, border: { color: 'rgba(0,255,255,0.15)' } },
        y: { title: { display: true, text: yLabel, color: 'rgba(0,255,255,0.6)' }, grid: { color: 'rgba(0,255,255,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)' }, border: { color: 'rgba(0,255,255,0.15)' } }
      }
    }
  });
}

function showStats(col1, v1, col2, v2) {
  const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const std = arr => { const m = mean(arr); return Math.sqrt(arr.reduce((a,b) => a + (b-m)**2, 0) / arr.length); };
  const sorted = [...v1].sort((a,b)=>a-b);
  const stats = {
    count: v1.length,
    mean: mean(v1).toFixed(2),
    std: std(v1).toFixed(2),
    min: Math.min(...v1).toFixed(2),
    max: Math.max(...v1).toFixed(2),
    median: sorted[Math.floor(sorted.length/2)].toFixed(2),
  };
  const box = document.getElementById('lab-stats');
  if (!box) return;
  box.innerHTML = Object.entries(stats).map(([k,v]) => `
    <div class="stat-box">
      <div class="stat-value">${v}</div>
      <div class="stat-key">${k.toUpperCase()} · ${col1}</div>
    </div>`).join('');
}

// ── Init on load ──
document.addEventListener('DOMContentLoaded', () => {
  setupChartDefaults();
  if (document.getElementById('radar-chart'))    initRadarChart('radar-chart');
  if (document.getElementById('bar-chart'))      initBarChart('bar-chart');
  if (document.getElementById('line-chart'))     initLineChart('line-chart');
  if (document.getElementById('doughnut-chart')) initDoughnutChart('doughnut-chart');
});
