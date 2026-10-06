let costChartInstance = null;

function initCharts() {
  const defaultFont = { family: 'Prompt', size: 11 };

  // Variety Chart
  const ctxVariety = document.getElementById('chart-variety-national')?.getContext('2d');
  if (ctxVariety) {
    new Chart(ctxVariety, {
      type: 'doughnut',
      data: {
        labels: ['หมอนทอง', 'ชะนี', 'ก้านยาว', 'พวงมณี', 'อื่นๆ'],
        datasets: [{ data: [78, 10, 5, 4, 3], backgroundColor: ['#10b981', '#f59e0b', '#a855f7', '#3b82f6', '#cbd5e1'] }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Regional Chart
  const ctxRegional = document.getElementById('chart-regional-yield')?.getContext('2d');
  if (ctxRegional) {
    new Chart(ctxRegional, {
      type: 'bar',
      data: {
        labels: ['ตะวันออก', 'ใต้', 'อีสาน', 'เหนือ'],
        datasets: [{ label: 'ผลผลิต (พันตัน)', data: [785, 620, 110, 65], backgroundColor: '#10b981', borderRadius: 6 }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Harvest Chart
  const ctxHarvest = document.getElementById('chart-harvest-calendar')?.getContext('2d');
  if (ctxHarvest) {
    new Chart(ctxHarvest, {
      type: 'bar',
      data: {
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
