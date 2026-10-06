let chartVariety = null;
let chartRegional = null;
let chartHarvest = null;

function initCharts() {
  // Chart 1: Variety Distribution (Doughnut)
  const ctxVariety = document.getElementById('chart-variety-national')?.getContext('2d');
  if (ctxVariety) {
    chartVariety = new Chart(ctxVariety, {
      type: 'doughnut',
      data: {
        labels: ['หมอนทอง', 'ชะนี', 'พวงมณี', 'ก้านยาว', 'อื่นๆ / สายพันธุ์ GI'],
        datasets: [{
          data: [82, 8, 4, 3, 3],
          backgroundColor: ['#10b981', '#f59e0b', '#a855f7', '#3b82f6', '#94a3b8'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Prompt', size: 11 } } }
        }
      }
    });
  }

  // Chart 2: Regional Yield (Bar)
  const ctxRegional = document.getElementById('chart-regional-yield')?.getContext('2d');
  if (ctxRegional) {
    chartRegional = new Chart(ctxRegional, {
      type: 'bar',
      data: {
        labels: ['ภาคตะวันออก', 'ภาคใต้', 'ภาคตะวันออกเฉียงเหนือ', 'ภาคเหนือ'],
        datasets: [{
          label: 'ปริมาณผลผลิต (พันตัน)',
          data: [790, 600, 110, 80],
          backgroundColor: ['#10b981', '#f59e0b', '#a855f7', '#3b82f6'],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Chart 3: Harvest Calendar (Line)
  const ctxHarvest = document.getElementById('chart-harvest-season')?.getContext('2d');
  if (ctxHarvest) {
    chartHarvest = new Chart(ctxHarvest, {
      type: 'line',
      data: {
        labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
        datasets: [
          {
            label: 'ภาคตะวันออก',
            data: [5, 15, 60, 220, 310, 150, 30, 0, 0, 0, 0, 0],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'ภาคใต้',
            data: [0, 0, 0, 10, 30, 80, 210, 180, 80, 10, 0, 0],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: 'Prompt', size: 11 } } }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}      data: {
        labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
        datasets: [
          { label: 'ภาคตะวันออก', data: [0, 10, 30, 85, 100, 60, 15, 0, 0, 0, 0, 0], backgroundColor: '#10b981' },
          { label: 'ภาคใต้', data: [10, 0, 0, 0, 5, 20, 60, 95, 80, 40, 15, 10], backgroundColor: '#f59e0b' }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }
    });
  }

  // Cost Chart
  const ctxCost = document.getElementById('chart-cost-breakdown')?.getContext('2d');
  if (ctxCost) {
    costChartInstance = new Chart(ctxCost, {
      type: 'pie',
      data: {
        labels: ['ปุ๋ย/ยา/สารเคมี', 'แรงงาน/น้ำ/ไฟ'],
        datasets: [{ data: [180000, 150000], backgroundColor: ['#f59e0b', '#3b82f6'] }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}
