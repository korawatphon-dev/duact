// ==========================================
// LIVE API & GISTDA MODULE
// ==========================================

// พิกัดศูนย์กลางพื้นที่สวนทุเรียน (อ.เมือง จ.จันทบุรี)
const CHANTHABURI_LAT = 12.6114;
const CHANTHABURI_LON = 102.1039;

// การตั้งค่าเชื่อมต่อ GISTDA Service (ใส่ API Key ของโครงการถ้ามี)
const GISTDA_CONFIG = {
  hotspotEndpoint: 'https://fire.gistda.or.th/api/v1/hotspot',
  wmsUrl: 'https://service.gistda.or.th/geoserver/wms',
  apiKey: '' 
};

/**
 * 1. ดึงข้อมูลสภาพอากาศสด & PM2.5 จาก Open-Meteo
 */
async function fetchLiveWeather() {
  try {
    // สภาพอากาศสด (อุณหภูมิ, ความชื้น, ปริมาณฝน)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${CHANTHABURI_LAT}&longitude=${CHANTHABURI_LON}&current=temperature_2m,relative_humidity_2m,rain&timezone=Asia%2FBangkok`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (weatherData.current) {
      const temp = weatherData.current.temperature_2m;
      const humidity = weatherData.current.relative_humidity_2m;
      const rain = weatherData.current.rain;

      const tempCard = document.querySelector('.top-bar-sky h3');
      const tempDesc = document.querySelector('.top-bar-sky p.truncate');

      if (tempCard) tempCard.innerText = `${temp}°C`;
      if (tempDesc) tempDesc.innerText = `ฝน: ${rain} มม. · ความชื้น ${humidity}%`;
    }

    // ค่าฝุ่น PM2.5 สด
    const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${CHANTHABURI_LAT}&longitude=${CHANTHABURI_LON}&current=pm2_5,european_aqi&timezone=Asia%2FBangkok`;
    const airRes = await fetch(airUrl);
    const airData = await airRes.json();

    if (airData.current) {
      const pm25 = Math.round(airData.current.pm2_5);
      const aqi = airData.current.european_aqi;

      const pmCard = document.querySelector('.top-bar-green h3');
      const pmDesc = document.querySelector('.top-bar-green p.font-medium');

      if (pmCard) pmCard.innerHTML = `${pm25} <span class="text-[10px] font-normal text-slate-400">µg/m³</span>`;
      if (pmDesc) {
        if (pm25 <= 25) {
          pmDesc.className = "text-[10px] text-emerald-600 font-medium mt-0.5";
          pmDesc.innerText = `คุณภาพดีมาก · AQI ${aqi}`;
        } else {
          pmDesc.className = "text-[10px] text-amber-600 font-medium mt-0.5";
          pmDesc.innerText = `ปานกลาง-ควรระวัง · AQI ${aqi}`;
        }
      }
    }
  } catch (error) {
    console.warn('ไม่สามารถเชื่อมต่อ Weather API ได้:', error);
  }
}

/**
 * 2. ดึงอัตราแลกเปลี่ยน THB/CNY สด
 */
async function fetchLiveCurrency() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/CNY');
    const data = await res.json();

    if (data && data.rates && data.rates.THB) {
      const cnyToThb = data.rates.THB.toFixed(2);
      const priceCardDesc = document.querySelector('.top-bar-purple p.truncate');
      if (priceCardDesc) {
        priceCardDesc.innerText = `1 หยวน = ${cnyToThb} ฿ · หมอนทอง 165฿`;
      }
    }
  } catch (error) {
    console.warn('ไม่สามารถเชื่อมต่อ Currency API ได้:', error);
  }
}

/**
 * 3. ดึงข้อมูลจุดความร้อน/ภัยพิบัติสด จาก GISTDA API
 */
async function fetchGistdaData() {
  try {
    const headers = { 'Accept': 'application/json' };
    if (GISTDA_CONFIG.apiKey) {
      headers['Authorization'] = `Bearer ${GISTDA_CONFIG.apiKey}`;
    }

    const response = await fetch(`${GISTDA_CONFIG.hotspotEndpoint}?province=จันทบุรี&period=24h`, {
      method: 'GET',
      headers: headers
    });

    if (response.ok) {
      const gistdaData = await response.json();
      updateGistdaUI(gistdaData);
    }
  } catch (error) {
    console.warn('เกิดข้อผิดพลาดในการดึงข้อมูล GISTDA:', error);
  }
}

/**
 * อัปเดต UI เมื่อได้รับข้อมูลจาก GISTDA
 */
function updateGistdaUI(data) {
  const hotspotCount = data && data.features ? data.features.length : 0;
  const gistdaCard = document.getElementById('gistda-hotspot-count');
  const gistdaDesc = document.getElementById('gistda-hotspot-desc');

  if (gistdaCard) gistdaCard.innerText = `${hotspotCount} จุด`;
  if (gistdaDesc) gistdaDesc.innerText = `จุดความร้อนสะสม 24 ชม. (GISTDA)`;

  // ถ้ามีการใช้ Leaflet Map ให้พล็อตจุด GeoJSON
  if (window.mapInstance && data && data.features) {
    if (window.gistdaLayer) {
      window.mapInstance.removeLayer(window.gistdaLayer);
    }
    window.gistdaLayer = L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: '#ef4444',
          color: '#ffffff',
          weight: 1,
          fillOpacity: 0.8
        });
      }
    }).addTo(window.mapInstance);
  }
}

/**
 * ฟังก์ชันหลักสำหรับปุ่มกดซิงค์ข้อมูล
 */
async function syncAllLiveData() {
  const syncBtn = document.getElementById('btn-sync-live');
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = `<i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-emerald-600 animate-spin"></i> กำลังดึงข้อมูล Live...`;
    if (window.lucide) lucide.createIcons();
  }

  await Promise.all([
    fetchLiveWeather(),
    fetchLiveCurrency(),
    fetchGistdaData()
  ]);

  if (syncBtn) {
    syncBtn.disabled = false;
    syncBtn.setAttribute('onclick', 'syncAllLiveData()');
    syncBtn.innerHTML = `<i data-lucide="rotate-cw" class="w-3.5 h-3.5 text-slate-500"></i> คลิกซิงค์สัญญาณข้อมูลสด`;
    if (window.lucide) lucide.createIcons();
  }
}
