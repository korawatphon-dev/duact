/**
 * Thai Durian Intelligence Dashboard - Main Application Controller
 * assets/js/app.js
 */

let chartVariety = null;
let chartRegional = null;
let chartHarvest = null;

// ==========================================
// 1. Navigation Controls
// ==========================================

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

  // Trigger chart resize safely
  setTimeout(() => {
    if (tabId === 'tab1' && chartVariety && chartRegional) {
      chartVariety.resize();
      chartRegional.resize();
    } else if (tabId === 'tab2' && chartHarvest) {
      chartHarvest.resize();
    }
  }, 100);
}

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
// 2. Map Interactive Selection
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
  chumphon: {
    region: 'ภาคใต้',
    title: 'ชุมพร (ศูนย์กลางทุเรียนภาคใต้)',
    subtitle: 'แหล่งผลิตทุเรียนนอกฤดูและตลาดส่งออกระลอกสองของประเทศ',
    area: '265,000 ไร่',
    yield: '340,000 ตัน',
    gap: '88.3% (21,400 แปลง)',
    variety: 'หมอนทอง (90%)',
    desc: 'ศูนย์กลางล้งรวบรวมทุเรียนภาคใต้ ส่งออกผ่านด่านชายแดนใต้และท่าเรือกรุงเทพฯ'
  },
  yala: {
    region: 'ภาคใต้',
    title: 'ยะลา / เบตง (ทุเรียนสะเด็ดน้ำ GI)',
    subtitle: 'ทุเรียนคุณภาพบนพื้นที่ไฮแลนด์ หุบเขาและสายหมอก',
    area: '92,000 ไร่',
    yield: '95,000 ตัน',
    gap: '81.4% (6,800 แปลง)',
    variety: 'หมอนทอง / มูซังคิง',
    desc: 'ทุเรียนสะเด็ดน้ำยะลา มีเอกลักษณ์เนื้อแห้ง ละเอียด นุ่ม ไม่แฉะ รสชาติหวานมัน'
  },
  sisaket: {
    region: 'ตะวันออกเฉียงเหนือ',
    title: 'ศรีสะเกษ (ทุเรียนภูเขาไฟ GI)',
    subtitle: 'ปลูกบนผืนดินภูเขาไฟโบราณ อุดมด้วยธาตุอาหารพืช',
    area: '18,500 ไร่',
    yield: '22,000 ตัน',
    gap: '86.7% (1,950 แปลง)',
    variety: 'หมอนทอง GI',
    desc: 'เอกลักษณ์สำคัญคือ "กรอบนอก นุ่มใน หวานละมุน กลิ่นไม่แรง"'
  },
  uttaradit: {
    region: 'ภาคเหนือ',
    title: 'อุตรดิตถ์ (หลิน-หลง ลับแล GI)',
    subtitle: 'ทุเรียนเมืองลับแล สายพันธุ์พื้นเมืองระดับตำนาน',
    area: '34,000 ไร่',
    yield: '38,000 ตัน',
    gap: '79.2% (2,400 แปลง)',
    variety: 'หลงลับแล / หลินลับแล',
    desc: 'ปลูกตามไหล่เขาแบบธรรมชาติ ผลขนาดเล็กพอดีทาน เมล็ดลีบ เนื้อละเอียดเนียน'
  }
};

function selectMapLocation(locKey) {
  const data = locationData[locKey];
  if (!data) return;

  const setElemText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  setElemText('map-region-badge', data.region);
  setElemText('map-region-title', data.title);
  setElemText('map-region-subtitle', data.subtitle);
  setElemText('map-stat-area', data.area);
  setElemText('map-stat-yield', data.yield);
  setElemText('map-stat-gap', data.gap);
  setElemText('map-stat-variety', data.variety);
  setElemText('map-stat-desc', data.desc);
}

// ==========================================
// 3. Live Card Updates
// ==========================================

function updateLiveCardsDisplay(data) {
  const setElemText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  if (!data) return;

  setElemText('live-temp', data.temp);
  setElemText('disease-risk-desc', data.diseaseRisk);
  setElemText('gistda-hotspot-count', data.hotspots);
  setElemText('gistda-ndvi-status', data.ndvi);
  setElemText('durian-price-grade-a', data.priceGradeA);
  setElemText('cny-exchange-rate', data.cnyRate);
  setElemText('border-status-title', data.borderStatus);
  setElemText('border-status-desc', data.borderDesc);
}

function syncAllLiveData() {
  const syncBtn = document.getElementById('btn-sync-live');
  const syncBtnIcon = syncBtn ? syncBtn.querySelector('i') : null;
  if (syncBtnIcon) syncBtnIcon.classList.add('animate-spin');

  if (typeof fetchRealtimeData === 'function') {
    fetchRealtimeData()
      .then(data => updateLiveCardsDisplay(data))
      .catch(err => {
        console.error('Sync failed:', err);
      })
      .finally(() => {
        setTimeout(() => {
          if (syncBtnIcon) syncBtnIcon.classList.remove('animate-spin');
        }, 400);
      });
  }
}

// ==========================================
// 4. Safe Chart Rendering
// ==========================================

function initCharts() {
  if (typeof Chart === 'undefined') return;

  // Chart 1: Variety National
  const ctxVariety = document.getElementById('chart-variety-national');
  if (ctxVariety) {
    if (chartVariety) chartVariety.destroy();
    chartVariety = new Chart(ctxVariety.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['หมอนทอง (82%)', 'ชะนี (8%)', 'ก้านยาว (4%)', 'พวงมณี (3%)', 'อื่นๆ (3%)'],
        datasets: [{
          data: [82, 8, 4, 3, 3],
          backgroundColor: ['#10b981', '#f59e0b', '#a855f7', '#3b82f6', '#94a3b8']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Chart 2: Regional Yield
  const ctxRegional = document.getElementById('chart-regional-yield');
  if (ctxRegional) {
    if (chartRegional) chartRegional.destroy();
    chartRegional = new Chart(ctxRegional.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['ภาคตะวันออก', 'ภาคใต้', 'ภาคเหนือ', 'ตะวันออกเฉียงเหนือ'],
        datasets: [{
          label: 'ผลผลิต (พันตัน)',
          data: [790, 620, 95, 75],
          backgroundColor: '#10b981',
          borderRadius: 6
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Chart 3: Harvest Season
  const ctxHarvest = document.getElementById('chart-harvest-season');
  if (ctxHarvest) {
    if (chartHarvest) chartHarvest.destroy();
    chartHarvest = new Chart(ctxHarvest.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
        datasets: [
          { label: 'ภาคตะวันออก', data: [5, 15, 60, 280, 310, 110, 10, 0, 0, 0, 0, 0], backgroundColor: '#10b981' },
          { label: 'ภาคใต้', data: [0, 0, 0, 10, 30, 120, 240, 180, 35, 5, 0, 0], backgroundColor: '#f59e0b' }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}

// Calculator Logic
function runTab3Calculator() {
  const area = parseFloat(document.getElementById('calc-area')?.value) || 0;
  const yieldPerRai = parseFloat(document.getElementById('calc-yield-per-rai')?.value) || 0;
  const price = parseFloat(document.getElementById('calc-price-per-kg')?.value) || 0;

  const totalYield = area * yieldPerRai;
  const revenue = totalYield * price;
  const profit = revenue - (area * 37000);

  const fmt = (n) => new Intl.NumberFormat('th-TH').format(Math.round(n));

  const resYield = document.getElementById('res-total-yield');
  const resRev = document.getElementById('res-total-revenue');
  const resProfit = document.getElementById('res-net-profit');

  if (resYield) resYield.innerText = `${fmt(totalYield)} กก.`;
  if (resRev) resRev.innerText = `${fmt(revenue)} บาท`;
  if (resProfit) resProfit.innerText = `${fmt(profit)} บาท`;
}

// Initialize App
function initApp() {
  updateClock();
  setInterval(updateClock, 1000);

  if (window.lucide) {
    try { lucide.createIcons(); } catch (e) {}
  }

  initCharts();
  syncAllLiveData();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initApp, 100);
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}
