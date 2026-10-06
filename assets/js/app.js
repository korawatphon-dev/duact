// ฟังก์ชันสลับ Tab
function switchTab(tabId) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(el => el.classList.add('hidden'));

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('tab-active');
    btn.classList.add('tab-inactive');
  });

  const activeContent = document.getElementById(`content-${tabId}`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
  }

  const activeBtn = document.getElementById(`btn-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.remove('tab-inactive');
    activeBtn.classList.add('tab-active');
  }
}

// อัปเดตเวลาและวันที่บน Header
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
  const dateStr = now.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });

  const timeElem = document.getElementById('current-time-str');
  const dateElem = document.getElementById('current-date-str');

  if (timeElem) timeElem.innerText = timeStr;
  if (dateElem) dateElem.innerText = dateStr;
}

function refreshDataMock() {
  alert('ทำการซิงค์สัญญาณข้อมูลสดจาก GISTDA, DOA และ กรมอุตุนิยมวิทยา เรียบร้อยแล้ว!');
}

// เริ่มการทำงานเมื่อ DOM และไลบรารีภายนอกพร้อม
window.addEventListener('load', () => {
  // Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // เริ่มต้นสร้างกราฟ
  if (typeof initCharts === 'function') {
    initCharts();
  }

  // คำนวณค่าเครื่องคิดเลข
  if (typeof runTab3Calculator === 'function') {
    runTab3Calculator();
  }

  // อัปเดตเวลา
  updateClock();
  setInterval(updateClock, 60000);
});
