function runTab3Calculator() {
  const rai = parseFloat(document.getElementById('tab3-slider-rai').value);
  const yieldPerRai = parseFloat(document.getElementById('tab3-slider-yield').value);
  const price = parseFloat(document.getElementById('tab3-slider-price').value);

  // อัปเดต Label แสดงผลค่าตั้งต้น
  document.getElementById('tab3-val-rai').innerText = `${rai} ไร่`;
  document.getElementById('tab3-val-yield').innerText = `${yieldPerRai.toLocaleString()} กก.`;
  document.getElementById('tab3-val-price').innerText = `${price} บาท`;

  // สูตรการคำนวณ
  const totalYield = rai * yieldPerRai; // กิโลกรัมรวม
  const revenue = totalYield * price; // รายรับรวม
  const estCostPerRai = 55000; // ต้นทุนเฉลี่ยต่อไร่ (ปุ๋ย/ยา/แรงงาน/น้ำ)
  const totalCost = rai * estCostPerRai;
  const netProfit = revenue - totalCost;
  const breakEvenPrice = totalCost / (totalYield || 1);

  // แสดงผลลัพธ์
  document.getElementById('tab3-res-revenue').innerText = `${revenue.toLocaleString()} ฿`;
  document.getElementById('tab3-res-cost').innerText = `${totalCost.toLocaleString()} ฿`;
  document.getElementById('tab3-res-profit').innerText = `${netProfit.toLocaleString()} ฿`;
  document.getElementById('tab3-res-be').innerText = `${breakEvenPrice.toFixed(1)} ฿/กก.`;

  // เปลี่ยนสีตัวเลขกำไรตามสถานะ
  const profitElem = document.getElementById('tab3-res-profit');
  if (netProfit >= 0) {
    profitElem.className = "text-2xl font-extrabold text-emerald-600 mt-1";
  } else {
    profitElem.className = "text-2xl font-extrabold text-rose-600 mt-1";
  }
}
