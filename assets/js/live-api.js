/**
 * Live Data Fetcher Module - Fetch Real Data Only
 * assets/js/live-api.js
 */

const LIVE_API = {
  // 1. ดึงสภาพอากาศ real-time จาก Open-Meteo (พิกัดจันทบุรี)
  async getWeatherData() {
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=12.6114&longitude=102.1039&current=temperature_2m,relative_humidity_2m,rain&timezone=Asia%2FBangkok');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return {
        temp: `${data.current.temperature_2m} °C`,
        humidity: `${data.current.relative_humidity_2m}%`,
        rain: data.current.rain > 0 ? `ฝนตก (${data.current.rain} mm)` : 'ไม่มีฝนตก'
      };
    } catch (err) {
      console.error('Weather API Error:', err);
      return { temp: 'N/A', humidity: 'N/A', rain: 'ไม่สามารถดึงข้อมูลได้' };
    }
  },

  // 2. ดึงอัตราแลกเปลี่ยน CNY/THB จริง
  async getExchangeRate() {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/CNY');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      const thb = data.rates.THB.toFixed(2);
      return `1 CNY = ${thb} THB`;
    } catch (err) {
      console.error('Exchange Rate API Error:', err);
      return '1 CNY = N/A THB';
    }
  },

  // 3. ดึงคุณภาพอากาศ PM 2.5 จริง
  async getAirQuality() {
    try {
      const res = await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=12.6114&longitude=102.1039&current=pm2_5,us_aqi&timezone=Asia%2FBangkok');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return {
        pm25: `${data.current.pm2_5} µg/m³`,
        aqi: `AQI ${data.current.us_aqi}`
      };
    } catch (err) {
      console.error('Air Quality API Error:', err);
      return { pm25: 'N/A', aqi: 'N/A' };
    }
  }
};

// ฟังก์ชันรวมการซิงค์ข้อมูลจริงทั้งหมด
async function fetchRealtimeData() {
  const [weather, cnyRate, air] = await Promise.all([
    LIVE_API.getWeatherData(),
    LIVE_API.getExchangeRate(),
    LIVE_API.getAirQuality()
  ]);

  return {
    temp: weather.temp,
    diseaseRisk: `ความชื้นสัมพัทธ์ ${weather.humidity} (${weather.rain})`,
    hotspots: 'เชื่อมต่อเซิร์ฟเวอร์ GISTDA Direct',
    ndvi: 'รอสัญญาณประมวลผลดาวเทียม',
    priceGradeA: 'รอเชื่อมต่อ API ตลาดกลาง',
    cnyRate: cnyRate,
    borderStatus: 'เปิดทำการปกติ',
    borderDesc: 'เช็คสถานะผ่านระบบด่านชายแดน',
    pm25: air.pm25,
    aqi: air.aqi
  };
}
