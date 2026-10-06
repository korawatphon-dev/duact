function checkChemicalMix() {
  const chemA = document.getElementById('chem-a').value;
  const chemB = document.getElementById('chem-b').value;
  const title = document.getElementById('chem-result-title');
  const detail = document.getElementById('chem-result-detail');

  if (chemA === 'copper' && chemB === 'calcium_boron') {
    title.innerText = "❌ ห้ามผสมเด็ดขาด";
    title.className = "font-bold text-rose-800";
    detail.innerText = "เกิดตกตะกอนและอาจทำให้เกิดอาการใบไหม้ในทุเรียนได้";
  } else if (chemA === 'sulfur' && chemB === 'oil') {
    title.innerText = "⚠️ ควรระวังอย่างยิ่ง";
    title.className = "font-bold text-amber-800";
    detail.innerText = "ต้องเว้นระยะอย่างน้อย 14-21 วัน เพื่อป้องกันใบไหม้";
  } else {
    title.innerText = "✓ สามารถผสมใช้งานได้";
    title.className = "font-bold text-emerald-800";
    detail.innerText = "สารสองชนิดนี้สามารถผสมกันได้ตามปกติ";
  }
}
