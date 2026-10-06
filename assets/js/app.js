// สลับ Tab
function switchTab(tabId) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(el => el.classList.add('hidden'));

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('tab-active');
    btn.classList.add('tab-inactive');
  });

  const activeContent = document.getElementById(`content-${tabId}`);
  if (activeContent) activeContent.classList.remove('hidden');

  const activeBtn = document.getElementById(`btn-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.remove('tab-inactive');
    activeBtn.classList.add('tab-active');
  }
}

// อัปเดตเวลาบน Header
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
  const dateStr = now.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });

  const timeElem = document.getElementById('current-time-str');
  const dateElem = document.getElementById('current-date-str');

  if (timeElem) timeElem.innerText = timeStr;
  if (dateElem) dateElem.innerText = dateStr;
}

// โหลดระบบพร้อมกันเมื่อเบราว์เซอร์พร้อม
window.addEventListener('load', () => {
  // 1. สร้าง Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. สร้างกราฟ
  if (typeof initCharts === 'function') {
    initCharts();
  }

  // 3. คำนวณเครื่องคิดเลข
  if (typeof runTab3Calculator === 'function') {
    runTab3Calculator();
  }

  // 4. ดึงข้อมูล Live สดทันที (Open-Meteo + Currency + GISTDA)
  if (typeof syncAllLiveData === 'function') {
    syncAllLiveData();
  }

  // 5. เริ่มนับเวลา
  updateClock();
  setInterval(updateClock, 60000);
});
