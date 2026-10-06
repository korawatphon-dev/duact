function calculateProfitability() {
  const area = parseFloat(document.getElementById('calc-area').value) || 0;
  const yieldPerRai = parseFloat(document.getElementById('calc-yield-per-rai').value) || 0;
  const price = parseFloat(document.getElementById('calc-price').value) || 0;

  const totalYield = area * yieldPerRai;
  const totalRevenue = totalYield * price;
  const totalCost = area * 33000; // ค่าประมาณการ 33,000 บ./ไร่
  const netProfit = totalRevenue - totalCost;

  document.getElementById('res-total-revenue').innerText = totalRevenue.toLocaleString();
  document.getElementById('res-total-cost').innerText = totalCost.toLocaleString();
  document.getElementById('res-net-profit').innerText = netProfit.toLocaleString();

  if (costChartInstance) {
    costChartInstance.data.datasets[0].data = [area * 18000, area * 15000];
    costChartInstance.update();
  }
}
