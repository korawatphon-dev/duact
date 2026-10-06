const mixDatabase = {
  'copper-oil': {
    safe: false,
    title: '⚠️ ข้อควรระวัง: ไม่แนะนำให้ผสมกัน',
    desc: 'สารกลุ่มคอปเปอร์ผสมกับน้ำมันปิโตรเลียมสเปรย์ตกตะกอนง่าย และอาจทำให้เกิดอาการใบไหม้ในทุเรียนระยะยอดอ่อน'
  },
  'copper-fosetyl': {
    safe: false,
    title: '❌ ห้ามผสมเด็ดขาด',
    desc: 'การผสมคอปเปอร์กับฟอสอีทิล-อะลูมิเนียม จะเกิดปฏิกิริยาเป็นพิษต่อพืชอย่างรุนแรง (Phytotoxicity)'
  },
  'abamectin-oil': {
    safe: true,
    title: '✅ สามารถผสมร่วมกันได้ (เสริมฤทธิ์)',
    desc: 'ปิโตรเลียมสเปรย์ออยล์ช่วยแทรกซึมและแทรกเคลือบใบ เพิ่มประสิทธิภาพอะบาเมกตินในการกำจัดไรแดงและเพลี้ยไฟ'
  }
};

function checkChemicalMix() {
  const c1 = document.getElementById('mix-chem1').value;
  const c2 = document.getElementById('mix-chem2').value;
  const box = document.getElementById('mix-result-box');
  const title = document.getElementById('mix-status-title');
  const desc = document.getElementById('mix-status-desc');

  if (c1 === c2) {
    box.className = "p-4 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 space-y-1 text-xs";
    title.innerText = "ℹ️ สารชนิดเดียวกัน";
    desc.innerText = "ท่านเลือกสารเคมีชนิดเดียวกัน ไม่จำเป็นต้องผสมซ้ำ";
    return;
  }

  const key1 = `${c1}-${c2}`;
  const key2 = `${c2}-${c1}`;
  const match = mixDatabase[key1] || mixDatabase[key2];

  if (match) {
    if (match.safe) {
      box.className = "p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1 text-xs";
    } else {
      box.className = "p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1 text-xs";
    }
    title.innerText = match.title;
    desc.innerText = match.desc;
  } else {
    box.className = "p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1 text-xs";
    title.innerText = "ℹ️ ผสมได้ตามข้อแนะนำสากล";
    desc.innerText = "ควรละลายสารทีละชนิดตามลำดับ (ผง -> น้ำ -> น้ำมัน) และทดลองผสมในภาชนะเล็กก่อนฉีดพ่นจริง";
  }
}
