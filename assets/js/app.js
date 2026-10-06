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
    subtitle: 'ปลูกบนผืนดินภูเขาไฟโบราณ อุดมด้วยธาตุอาหารพืช',
    area: '18,500 ไร่',
    yield: '22,000 ตัน',
    gap: '86.7% (1,950 แปลง)',
    variety: 'หมอนทอง GI',
    desc: 'เอกลักษณ์สำคัญคือ "กรอบนอก นุ่มใน หวานละมุน กลิ่นไม่แรง" ผลผลิตได้รับการจองล่วงหน้าและเป็นสินค้า GI สร้างมูลค่าสูงมาก'
  },
  uttaradit: {
    region: 'ภาคเหนือ',
    title: 'อุตรดิตถ์ (หลิน-หลง ลับแล GI)',
    subtitle: 'ทุเรียนเมืองลับแล สายพันธุ์พื้นเมืองระดับตำนาน',
    area: '34,000 ไร่',
    yield: '38,000 ตัน',
    gap: '79.2% (2,400 แปลง)',
    variety: 'หลงลับแล / หลินลับแล / หมอนทอง',
    desc: 'ปลูกตามไหล่เขาแบบธรรมชาติ ผลขนาดเล็กพอดีทาน เมล็ดลีบ เนื้อละเอียดเนียน ปราศจากเส้นใย รสชาติหวานมันกลมกล่อมเป็นเอกลักษณ์'
  }
};

function selectMapLocation(locKey) {
  const data = locationData[locKey];
  if (!data) return;

  // Update Text Information
  const regionBadge = document.getElementById('map-region-badge');
  const title = document.getElementById('map-region-title');
  const subtitle = document.getElementById('map-region-subtitle');
  const statArea = document.getElementById('map-stat-area');
  const statYield = document.getElementById('map-stat-yield');
  const statGap = document.getElementById('map-stat-gap');
  const statVariety = document.getElementById('map-stat-variety');
  const statDesc = document.getElementById('map-stat-desc');

  if (regionBadge) regionBadge.innerText = data.region;
  if (title) title.innerText = data.title;
  if (subtitle) subtitle.innerText = data.subtitle;
  if (statArea) statArea.innerText = data.area;
  if (statYield) statYield.innerText = data.yield;
  if (statGap) statGap.innerText = data.gap;
  if (statVariety) statVariety.innerText = data.variety;
  if (statDesc) statDesc.innerText = data.desc;
}

// ==========================================
// 3. Chart.js Initialization
// ==========================================

function initCharts() {
  // Chart 1: Variety National (Doughnut)
  const ctxVariety = document.getElementById('chart-variety-national');
  if (ctxVariety) {
    chartVariety = new Chart(ctxVariety.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['หมอนทอง (82%)', 'ชะนี (8%)', 'ก้านยาว (4%)', 'พวงมณี (3%)', 'สายพันธุ์อื่นๆ / GI (3%)'],
        datasets: [{
          data: [82, 8, 4, 3, 3],
          backgroundColor: [
            '#10b981', // Emerald
            '#f59e0b', // Amber
            '#a855f7', // Purple
            '#3b82f6', // Blue
            '#94a3b8'  // Slate
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: { family: 'Prompt', size: 11 },
              usePointStyle: true,
              padding: 12
            }
          }
        },
        cutout: '68%'
      }
    });
  }

  // Chart 2: Regional Yield (Bar)
  const ctxRegional = document.getElementById('chart-regional-yield');
  if (ctxRegional) {
    chartRegional = new Chart(ctxRegional.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['ภาคตะวันออก', 'ภาคใต้', 'ภาคเหนือ', 'ตะวันออกเฉียงเหนือ'],
        datasets: [{
          label: 'ปริมาณผลผลิต (พันตัน)',
          data: [790, 620, 95, 75],
          backgroundColor: [
            'rgba(16, 185, 129, 0.85)',
            'rgba(245, 158, 11, 0.85)',
            'rgba(59, 130, 246, 0.85)',
            'rgba(168, 85, 247, 0.85)'
          ],
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
          y: {
            beginAtZero: true,
            grid: { color: '#f1f5f9' },
            ticks: { font: { family: 'Prompt', size: 11 } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Prompt', size: 11 } }
          }
        }
      }
    });
  }

  // Chart 3: Harvest Season Calendar (Line/Bar Combined)
  const ctxHarvest = document.getElementById('chart-harvest-season');
  if (ctxHarvest) {
    chartHarvest = new Chart(ctxHarvest.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
        datasets: [
          {
            label: 'ภาคตะวันออก (พันตัน)',
            data: [5, 15, 60, 280, 310, 110, 10, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderRadius: 6
          },
          {
            label: 'ภาคใต้ (พันตัน)',
            data: [0, 0, 0, 10, 30, 120, 240, 180, 35, 5, 0, 0],
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { family: 'Prompt', size: 11 } }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
            grid: { color: '#f1f5f9' },
            ticks: { font: { family: 'Prompt', size: 11 } }
          },
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { font: { family: 'Prompt', size: 11 } }
          }
        }
      }
    });
  }
}

// ==========================================
// 4. Tab 3 Simulator Calculator logic
// ==========================================

function runTab3Calculator() {
  const areaInput = document.getElementById('calc-area');
  const yieldInput = document.getElementById('calc-yield-per-rai');
  const priceInput = document.getElementById('calc-price-per-kg');

  if (!areaInput || !yieldInput || !priceInput) return;

  const area = parseFloat(areaInput.value) || 0;
  const yieldPerRai = parseFloat(yieldInput.value) || 0;
  const pricePerKg = parseFloat(priceInput.value) || 0;

  const totalYield = area * yieldPerRai;
  const totalRevenue = totalYield * pricePerKg;
  const costPerRai = 37000; // ค่าประมาณการต้นทุนรวมต่อไร่
  const totalCost = area * costPerRai;
  const netProfit = totalRevenue - totalCost;

  // Format to THB currency style
  const fmt = (num) => new Intl.NumberFormat('th-TH').format(Math.round(num));

  const resYield = document.getElementById('res-total-yield');
  const resRevenue = document.getElementById('res-total-revenue');
  const resProfit = document.getElementById('res-net-profit');

  if (resYield) resYield.innerText = `${fmt(totalYield)} กก.`;
  if (resRevenue) resRevenue.innerText = `${fmt(totalRevenue)} บาท`;
  if (resProfit) resProfit.innerText = `${fmt(netProfit)} บาท`;
}

// ==========================================
// 5. System Initialization Event
// ==========================================

window.addEventListener('load', () => {
  // 1. เริ่มต้นระบบการเดินเวลาบนหน้าจอ
  updateClock();
  setInterval(updateClock, 1000);

  // 2. เรียกใช้งาน Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 3. เริ่มต้นวาดกราฟ Chart.js
  initCharts();

  // 4. ซิงค์สัญญาณ Live Data จาก live-api.js (ถ้าถูกโหลดไว้ในระบบ)
  if (typeof syncAllLiveData === 'function') {
    syncAllLiveData();
  }
});
