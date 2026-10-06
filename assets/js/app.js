/**
 * Thai Durian Intelligence Dashboard - Main Application Controller
 * assets/js/app.js
 */

// Global Chart Instances
let chartVariety = null;
let chartRegional = null;
let chartHarvest = null;

// ==========================================
// 1. Navigation & UI Controls
// ==========================================

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

  // Re-render or resize charts when switching tabs to prevent zero-width issues
  if (tabId === 'tab1' && chartVariety && chartRegional) {
    chartVariety.resize();
    chartRegional.resize();
  } else if (tabId === 'tab2' && chartHarvest) {
    chartHarvest.resize();
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

// ==========================================
// 2. Interactive Vector GIS Map Controller
// ==========================================

const locationData = {
  chanthaburi: {
    region: 'ภาคตะวันออก',
    title: 'จันทบุรี (เมืองหลวงทุเรียนไทย)',
    subtitle: 'ศูนย์กลางส่งออกทุเรียนใหญ่ที่สุดในเอเชียตะวันออกเฉียงใต้',
    area: '385,000 ไร่',
    yield: '520,000 ตัน',
    gap: '94.8% (28,500 แปลง)',
    variety: 'หมอนทอง (85%)',
    desc: 'เนื้อแน่น ละเอียด สีเหลืองทอง รสชาติหวานมัน เข้มข้น เป็นศูนย์รวมล้งส่งออกมาตรฐาน DOA และระบบสแกนย้อนกลับ GACC สู่ด่านจีน'
  },
  rayong: {
    region: 'ภาคตะวันออก',
    title: 'ระยอง (แหล่งทุเรียนคุณภาพพรีเมียม)',
    subtitle: 'โดดเด่นด้วยทุเรียนเนื้อนุ่มละมุนและ GI ชะนีระยอง',
    area: '112,000 ไร่',
    yield: '145,000 ตัน',
    gap: '92.1% (8,200 แปลง)',
    variety: 'หมอนทอง / ชะนี (15%)',
    desc: 'สภาพดินร่วนปนทรายและสภาพอากาศชายฝั่งทะเลส่งผลให้ทุเรียนมีรสชาติหวานมันเฉพาะตัว ผลผลิตออกสู่ตลาดช่วงต้นฤดูกาล'
  },
  trat: {
    region: 'ภาคตะวันออก',
    title: 'ตราด (ทุเรียนเบอร์หนึ่งต้นฤดู)',
    subtitle: 'พื้นที่เก็บเกี่ยวผลผลิตระลอกแรกสุดของภาคตะวันออก',
    area: '98,000 ไร่',
    yield: '130,000 ตัน',
    gap: '90.5% (7,100 แปลง)',
    variety: 'หมอนทอง / ชะนี',
    desc: 'สภาพอากาศร้อนชื้นและฝนตกเร็ว ทำให้ทุเรียนตราดออกดอกและเก็บเกี่ยวได้ก่อนจังหวัดอื่นในภาคตะวันออก ได้ราคาเปิดฤดูกาลสูง'
  },
  chumphon: {
    region: 'ภาคใต้',
    title: 'ชุมพร (ศูนย์กลางทุเรียนภาคใต้)',
    subtitle: 'แหล่งผลิตทุเรียนนอกฤดูและตลาดส่งออกระลอกสองของประเทศ',
    area: '265,000 ไร่',
    yield: '340,000 ตัน',
    gap: '88.3% (21,400 แปลง)',
    variety: 'หมอนทอง (90%)',
    desc: 'เป็นศูนย์กลางล้งรวบรวมทุเรียนภาคใต้ ส่งออกผ่านด่านชายแดนใต้และท่าเรือกรุงเทพฯ มีช่วงเก็บเกี่ยวหลักอยู่ในช่วงเดือนมิถุนายน - สิงหาคม'
  },
  yala: {
    region: 'ภาคใต้',
    title: 'ยะลา / เบตง (ทุเรียนสะเด็ดน้ำ GI)',
    subtitle: 'ทุเรียนคุณภาพบนพื้นที่ไฮแลนด์ หุบเขาและสายหมอก',
    area: '92,000 ไร่',
    yield: '95,000 ตัน',
    gap: '81.4% (6,800 แปลง)',
    variety: 'หมอนทอง / ก้านยาว / มูซังคิง',
    desc: 'ทุเรียนสะเด็ดน้ำยะลา มีเอกลักษณ์เนื้อแห้ง ละเอียด นุ่ม ไม่แฉะ รสชาติหวานมัน มีการส่งเสริมปลูกสายพันธุ์มูลค่าสูงเช่น มูซังคิง และหนามดำ'
  },
  sisaket: {
    region: 'ตะวันออกเฉียงเหนือ',
    title: 'ศรีสะเกษ (ทุเรียนภูเขาไฟ GI)',
    subtitle: 'ปลูกบนผืนดินภูเขาไฟโบราณ อุดมด้วยธาตุอาหารพ
