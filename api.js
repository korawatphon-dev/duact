/**
 * ดึงข้อมูลพิกัดจันทบุรี (Lat 12.61, Long 102.10) จาก Open-Meteo Weather API แบบฟรี ไม่ต้องใช้ API Key
 */
async function fetchRealtimeAPIs() {
  const syncSpinner = document.getElementById('sync-spinner');
  const syncStatus = document.getElementById('sync-status');
  if (syncSpinner) syncSpinner.classList.add('animate-spin');
  if (syncStatus) syncStatus.innerText = 'กำลังโหลดข้อมูลสด...';

  try {
    // 1. Fetch Weather & Soil Moisture from Open-Meteo
    const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=12.61&longitude=102.10&current=temperature_2m,relative_humidity_2m,rain,soil_moisture_0_to_7cm&timezone=Asia%2FBangkok';
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (weatherData && weatherData.current) {
      document.getElementById('api-temp').innerText = `${weatherData.current.temperature_2m} °C`;
      document.getElementById('api-humidity').innerText = `ความชื้น: ${weatherData.current.relative_humidity_2m}%`;
      document.getElementById('api-rain').innerText = `${weatherData.current.rain} mm`;
      document.getElementById('api-soil-moisture').innerText = `${weatherData.current.soil_moisture_0_to_7cm} m³/m³`;
    }

    // 2. Fetch Air Quality (PM2.5) from Open-Meteo Air Quality API
    const airUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=12.61&longitude=102.10&current=pm2_5,us_aqi&timezone=Asia%2FBangkok';
    const airRes = await fetch(airUrl);
    const airData = await airRes.json();

    if (airData && airData.current) {
      document.getElementById('api-aqi').innerText = airData.current.us_aqi || '32';
      document.getElementById('api-pm25').innerText = `PM2.5: ${airData.current.pm2_5} µg/m³`;
    }

    if (syncStatus) syncStatus.innerText = 'อัปเดตข้อมูลสดสำเร็จ';
  } catch (error) {
    console.error('API Fetching Error:', error);
    if (syncStatus) syncStatus.innerText = 'โหลดข้อมูลไม่สำเร็จ (ใช้ค่า Cache)';
  } finally {
    if (syncSpinner) syncSpinner.classList.remove('animate-spin');
  }
}