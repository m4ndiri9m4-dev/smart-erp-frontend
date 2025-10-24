// Leaflet map for admin dashboard
const mapEl = document.getElementById('map');
if (mapEl) {
  const map = L.map('map').setView([14.6, 120.98], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'© OpenStreetMap'
  }).addTo(map);

  const employees = [
    { name:'Juan Dela Cruz', lat:14.601, lng:120.982, project:'Alpha', time:'8:00AM' },
    { name:'Maria Santos', lat:14.605, lng:120.990, project:'Beta', time:'8:05AM' }
  ];

  employees.forEach(e=>{
    L.marker([e.lat,e.lng]).addTo(map)
     .bindPopup(`<b>${e.name}</b><br>${e.project}<br>${e.time}`);
  });
}
