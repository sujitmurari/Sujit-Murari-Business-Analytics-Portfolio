/* ═══════════════════════════════════════════════════
   CHARTS.JS — Chart.js Visualizations
   Fixed: R Programming added to radar + doughnut,
          renderLabCharts numeric detection (any vs every),
          canvas chart destroy via registry,
          stat-box inline styles (no missing CSS class dep),
          doughnut updated domain distribution
   ═══════════════════════════════════════════════════ */

const COLORS = {
  cyan:        '#0F766E',
  purple:      '#D97706',
  pink:        '#F97316',
  blue:        '#3a7bd5',
  green:       '#00ff88',
  cyanAlpha:   'rgba(15, 118, 110,',
  purpleAlpha: 'rgba(217, 119, 6,',
};

// ── Shared Chart Defaults ──────────────────────────
function setupChartDefaults() {
  if (!window.Chart) return;
  Chart.defaults.color                        = 'rgba(224,247,255,0.6)';
  Chart.defaults.font.family                  = "'Share Tech Mono', monospace";
  Chart.defaults.font.size                    = 11;
  Chart.defaults.plugins.legend.labels.color  = 'rgba(224,247,255,0.7)';
  Chart.defaults.plugins.legend.labels.boxWidth = 12;
}

// ── Chart instance registry (avoids canvas._chart hack) ──
const _chartRegistry = {};
function destroyIfExists(canvasId) {
  if (_chartRegistry[canvasId]) {
    _chartRegistry[canvasId].destroy();
    delete _chartRegistry[canvasId];
  }
}
function registerChart(canvasId, instance) {
  _chartRegistry[canvasId] = instance;
  return instance;
}

// ── Shared tooltip config ──────────────────────────
const TOOLTIP = {
  backgroundColor: 'rgba(5,5,16,0.92)',
  borderColor:     '#0F766E',
  borderWidth:     1,
  titleColor:      '#0F766E',
  bodyColor:       '#e0f7ff',
  padding:         12,
};
const TOOLTIP_P = { ...TOOLTIP, borderColor: '#D97706', titleColor: '#D97706' };

// ── Radar Chart (Skills) ───────────────────────────
// Updated: added R Programming (66%)
function initRadarChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  destroyIfExists(canvasId);
  const ctx = canvas.getContext('2d');
  const gradientFill = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 0,
    canvas.width / 2, canvas.height / 2, canvas.width / 2
  );
  gradientFill.addColorStop(0, 'rgba(15, 118, 110,0.25)');
  gradientFill.addColorStop(1, 'rgba(217, 119, 6,0.08)');

  return registerChart(canvasId, new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Tableau', 'Excel', 'SQL', 'Python', 'Statistics', 'Power BI', 'Data Viz', 'R Programming'],
      datasets: [{
        label: 'Skill Level',
        data:  [88, 90, 78, 72, 80, 70, 85, 66],
        fill:  true,
        backgroundColor:         gradientFill,
        borderColor:             COLORS.cyan,
        borderWidth:             2,
        pointBackgroundColor:    COLORS.cyan,
        pointBorderColor:        '#FAF9F6',
        pointBorderWidth:        2,
        pointRadius:             5,
        pointHoverRadius:        8,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor:   COLORS.cyan,
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
            color:          'rgba(15, 118, 110,0.3)',
            backdropColor:  'transparent',
            font:           { size: 9 }
          },
          grid:        { color: 'rgba(15, 118, 110,0.1)' },
          angleLines:  { color: 'rgba(15, 118, 110,0.1)' },
          pointLabels: {
            color: 'rgba(224,247,255,0.8)',
            font:  { size: 10, family: "'Orbitron', monospace", weight: '600' }
          }
        }
      },
      plugins: {
        legend:  { display: false },
        tooltip: TOOLTIP,
      },
      animation: { duration: 1500, easing: 'easeInOutQuart' }
    }
  }));
}

// ── Bar Chart (Projects) ───────────────────────────
function initBarChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  destroyIfExists(canvasId);
  const ctx = canvas.getContext('2d');
  const g1 = ctx.createLinearGradient(0, 0, 0, 300);
  g1.addColorStop(0, 'rgba(15, 118, 110,0.8)');
  g1.addColorStop(1, 'rgba(15, 118, 110,0.1)');
  const g2 = ctx.createLinearGradient(0, 0, 0, 300);
  g2.addColorStop(0, 'rgba(217, 119, 6,0.8)');
  g2.addColorStop(1, 'rgba(217, 119, 6,0.1)');

  return registerChart(canvasId, new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Airline', 'Flipkart', 'AI Prod', 'Gym', 'Retail'],
      datasets: [
        {
          label: 'Data Points (K)',
          data:  [12, 18, 8, 6, 15],
          backgroundColor: g1,
          borderColor:     COLORS.cyan,
          borderWidth: 1, borderRadius: 2,
        },
        {
          label: 'Insights Found',
          data:  [7, 11, 5, 4, 9],
          backgroundColor: g2,
          borderColor:     COLORS.purple,
          borderWidth: 1, borderRadius: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: { grid: { color: 'rgba(15, 118, 110,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)' }, border: { color: 'rgba(15, 118, 110,0.2)' } },
        y: { grid: { color: 'rgba(15, 118, 110,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)' }, border: { color: 'rgba(15, 118, 110,0.2)' } }
      },
      plugins: {
        legend:  { labels: { color: 'rgba(224,247,255,0.7)' } },
        tooltip: TOOLTIP,
      },
      animation: { duration: 1200, easing: 'easeInOutQuart' }
    }
  }));
}

// ── Line Chart (Skill Growth) ──────────────────────
function initLineChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  destroyIfExists(canvasId);
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 200);
  g.addColorStop(0, 'rgba(15, 118, 110,0.3)');
  g.addColorStop(1, 'rgba(15, 118, 110,0)');

  return registerChart(canvasId, new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      datasets: [
        {
          label:               'Technical Skills',
          data:                [30, 50, 70, 88],
          fill:                true,
          backgroundColor:     g,
          borderColor:         COLORS.cyan,
          borderWidth:         2,
          tension:             0.4,
          pointBackgroundColor: COLORS.cyan,
          pointRadius: 5, pointHoverRadius: 8,
        },
        {
          label:               'Business Acumen',
          data:                [45, 55, 68, 82],
          fill:                false,
          borderColor:         COLORS.purple,
          borderWidth:         2,
          borderDash:          [6, 3],
          tension:             0.4,
          pointBackgroundColor: COLORS.purple,
          pointRadius: 5, pointHoverRadius: 8,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: { grid: { color: 'rgba(15, 118, 110,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)' }, border: { color: 'rgba(15, 118, 110,0.2)' } },
        y: {
          min: 0, max: 100,
          grid:  { color: 'rgba(15, 118, 110,0.06)' },
          ticks: { color: 'rgba(224,247,255,0.6)', callback: v => v + '%' },
          border: { color: 'rgba(15, 118, 110,0.2)' }
        }
      },
      plugins: {
        legend:  { labels: { color: 'rgba(224,247,255,0.7)' } },
        tooltip: TOOLTIP,
      },
      animation: { duration: 1200, easing: 'easeInOutQuart' }
    }
  }));
}

// ── Doughnut Chart (Domain Focus) ─────────────────
// Updated: added R Programming slice (10%), redistributed
function initDoughnutChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  destroyIfExists(canvasId);
  const ctx = canvas.getContext('2d');

  return registerChart(canvasId, new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Data Viz', 'Statistics', 'Business Intel', 'SQL/Databases', 'Python/Pandas', 'R Programming'],
      datasets: [{
        data: [26, 18, 22, 14, 10, 10],
        backgroundColor: [
          'rgba(15, 118, 110,0.7)',
          'rgba(217, 119, 6,0.7)',
          'rgba(249, 115, 22,0.6)',
          'rgba(58,123,213,0.7)',
          'rgba(0,200,150,0.6)',
          'rgba(255,180,0,0.65)',
        ],
        borderColor:  '#FAF9F6',
        borderWidth:  3,
        hoverOffset:  8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color:           'rgba(224,247,255,0.7)',
            padding:         16,
            usePointStyle:   true,
            pointStyleWidth: 10,
          }
        },
        tooltip: TOOLTIP,
      },
      animation: { duration: 1400, easing: 'easeInOutQuart' }
    }
  }));
}

// ── Lab CSV Analysis Charts ────────────────────────
// Fix: use .some() instead of .every() so columns with
//      a few missing/empty rows are still detected as numeric.
function renderLabCharts(data, columns) {
  if (!data || !data.length || !columns || !columns.length) return;

  // A column is numeric if at least 60% of non-empty rows parse as a number
  const numericCols = columns.filter(col => {
    const nonEmpty = data.filter(row => row[col] !== '' && row[col] !== null && row[col] !== undefined);
    if (nonEmpty.length === 0) return false;
    const numericCount = nonEmpty.filter(row => !isNaN(parseFloat(row[col]))).length;
    return numericCount / nonEmpty.length >= 0.6;
  });

  if (numericCols.length === 0) return;

  const col1   = numericCols[0];
  const values1 = data.map(r => parseFloat(r[col1])).filter(v => !isNaN(v));

  renderHistogram('lab-histogram', col1, values1);

  if (numericCols.length >= 2) {
    const col2   = numericCols[1];
    const values2 = data.map(r => parseFloat(r[col2])).filter(v => !isNaN(v));
    const minLen  = Math.min(values1.length, values2.length, 80);
    renderScatter(
      'lab-scatter', col1, col2,
      Array.from({ length: minLen }, (_, i) => ({ x: values1[i], y: values2[i] }))
    );
  }

  showStats(
    col1, values1,
    numericCols.length >= 2 ? numericCols[1] : null,
    numericCols.length >= 2 ? data.map(r => parseFloat(r[numericCols[1]])).filter(v => !isNaN(v)) : null
  );
}

// ── Histogram ─────────────────────────────────────
function renderHistogram(canvasId, label, values) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !values.length) return;
  destroyIfExists(canvasId);
  const ctx  = canvas.getContext('2d');
  const bins = 12;
  const min  = Math.min(...values);
  const max  = Math.max(...values);
  const binW = max === min ? 1 : (max - min) / bins;
  const counts = Array(bins).fill(0);
  const labels = [];

  for (let i = 0; i < bins; i++) {
    labels.push((min + i * binW).toFixed(1));
    values.forEach(v => {
      const inBin = i === bins - 1
        ? v >= min + i * binW && v <= min + (i + 1) * binW
        : v >= min + i * binW && v <  min + (i + 1) * binW;
      if (inBin) counts[i]++;
    });
  }

  const g = ctx.createLinearGradient(0, 0, 0, 300);
  g.addColorStop(0, 'rgba(15, 118, 110,0.8)');
  g.addColorStop(1, 'rgba(15, 118, 110,0.1)');

  registerChart(canvasId, new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label,
        data:            counts,
        backgroundColor: g,
        borderColor:     COLORS.cyan,
        borderWidth:     1,
        borderRadius:    2,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: TOOLTIP },
      scales: {
        x: { grid: { color: 'rgba(15, 118, 110,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)', maxTicksLimit: 6 }, border: { color: 'rgba(15, 118, 110,0.15)' } },
        y: { grid: { color: 'rgba(15, 118, 110,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)' }, border: { color: 'rgba(15, 118, 110,0.15)' } }
      }
    }
  }));
}

// ── Scatter ───────────────────────────────────────
function renderScatter(canvasId, xLabel, yLabel, points) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !points.length) return;
  destroyIfExists(canvasId);
  const ctx = canvas.getContext('2d');

  registerChart(canvasId, new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label:           `${xLabel} vs ${yLabel}`,
        data:            points,
        backgroundColor: 'rgba(217, 119, 6,0.6)',
        borderColor:     COLORS.purple,
        borderWidth:     1,
        pointRadius:     4,
        pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: TOOLTIP_P },
      scales: {
        x: { title: { display: true, text: xLabel, color: 'rgba(15, 118, 110,0.6)' }, grid: { color: 'rgba(15, 118, 110,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)' }, border: { color: 'rgba(15, 118, 110,0.15)' } },
        y: { title: { display: true, text: yLabel, color: 'rgba(15, 118, 110,0.6)' }, grid: { color: 'rgba(15, 118, 110,0.06)' }, ticks: { color: 'rgba(224,247,255,0.6)' }, border: { color: 'rgba(15, 118, 110,0.15)' } }
      }
    }
  }));
}

// ── Summary Stats ──────────────────────────────────
// Fix: stat-box/stat-value/stat-key were undefined CSS classes.
//      Now renders with self-contained inline styles.
function showStats(col1, v1, col2, v2) {
  const box = document.getElementById('lab-stats');
  if (!box || !v1.length) return;

  const mean   = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const std    = arr => {
    const m = mean(arr);
    return Math.sqrt(arr.reduce((a, b) => a + (b - m) ** 2, 0) / arr.length);
  };
  const sorted = [...v1].sort((a, b) => a - b);
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];

  const stats = [
    { key: 'COUNT',  val: v1.length },
    { key: 'MEAN',   val: mean(v1).toFixed(2) },
    { key: 'STD',    val: std(v1).toFixed(2) },
    { key: 'MEDIAN', val: median.toFixed(2) },
    { key: 'MIN',    val: Math.min(...v1).toFixed(2) },
    { key: 'MAX',    val: Math.max(...v1).toFixed(2) },
  ];

  box.innerHTML = stats.map(({ key, val }) => `
    <div style="
      background:rgba(0,8,18,0.75);
      border:1px solid rgba(15, 118, 110,0.15);
      border-radius:6px;
      padding:16px 18px;
      position:relative;
      overflow:hidden;
    ">
      <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#0F766E,transparent 80%);"></div>
      <div style="font-family:'Orbitron',monospace;font-size:1.3rem;font-weight:900;color:#0F766E;line-height:1;margin-bottom:8px;">${val}</div>
      <div style="font-family:'Orbitron',monospace;font-size:0.52rem;letter-spacing:0.18em;color:rgba(224,247,255,0.4);">${key} · ${col1}</div>
    </div>`).join('');
}

// ── Init on DOMContentLoaded ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupChartDefaults();
  if (document.getElementById('radar-chart'))    initRadarChart('radar-chart');
  if (document.getElementById('bar-chart'))      initBarChart('bar-chart');
  if (document.getElementById('line-chart'))     initLineChart('line-chart');
  if (document.getElementById('doughnut-chart')) initDoughnutChart('doughnut-chart');
});
