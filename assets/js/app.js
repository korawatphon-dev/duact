// ฟังก์ชันสลับ Tab
function switchTab(tabId) {
  // ซ่อนเนื้อหา Tab ทั้งหมด
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(el => el.classList.add('hidden'));

  // ปรับสถานะ ปุ่ม Tab
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('tab-active');
    btn.classList.add('tab-inactive');
  });

  // แสดง Tab ที่เลือก
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

// ฟังก์ชันจำลองการกดปุ่มซิงค์ข้อมูล
function refreshDataMock() {
  alert('ทำการซิงค์สัญญาณข้อมูลสดจาก GISTDA, DOA และ กรมอุตุนิยมวิทยา เรียบร้อยแล้ว!');
}

// เริ่มการทำงานเมื่อ DOM โหลดเสร็จสมบูรณ์
document.addEventListener('DOMContentLoaded', () => {
  // เริ่มต้นสร้าง Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // เริ่มต้นระบบกราฟ
  initCharts();

  // คำนวณค่า Calculator เริ่มต้น
  runTab3Calculator();

  // อัปเดตเวลา
  updateClock();
  setInterval(updateClock, 60000);
});
