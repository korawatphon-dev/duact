const mapLocations = {
  chanthaburi: {
    badge: "ภาคตะวันออก",
    title: "จันทบุรี",
    subtitle: "เมืองหลวงทุเรียนไทย",
    area: "385,000 ไร่",
    yield: "520,000 ตัน"
  },
  chumphon: {
    badge: "ภาคใต้",
    title: "ชุมพร",
    subtitle: "ประตูสู่ทุเรียนใต้",
    area: "260,000 ไร่",
    yield: "340,000 ตัน"
  }
};

function selectMapLocation(key) {
  const data = mapLocations[key];
  if (!data) return;

  document.getElementById('map-region-badge').innerText = data.badge;
  document.getElementById('map-region-title').innerText = data.title;
  document.getElementById('map-region-subtitle').innerText = data.subtitle;
  document.getElementById('map-stat-area').innerText = data.area;
  document.getElementById('map-stat-yield').innerText = data.yield;
}
