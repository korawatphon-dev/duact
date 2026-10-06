function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('tab-active');
    btn.classList.add('tab-inactive');
  });

  const activeContent = document.getElementById('content-' + tabId);
  const activeBtn = document.getElementById('btn-' + tabId);

  if (activeContent) activeContent.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.remove('tab-inactive');
    activeBtn.classList.add('tab-active');
  }
}

function updateTime() {
  const now = new Date();
  const timeStr = document.getElementById('current-time-str');
  const dateStr = document.getElementById('current-date-str');
  if (timeStr) timeStr.innerText = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
  if (dateStr) dateStr.innerText = now.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
}

window.addEventListener('DOMContentLoaded', () => {
  updateTime();
  fetchRealtimeAPIs();
  initCharts();
  calculateProfitability();
  if (window.lucide) lucide.createIcons();
});