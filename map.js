// =======================
// ZENICA MAP - STANICE ONLY
// =======================

let map;
let stopMarkers = {};

// Zenica coordinates
const ZENICA_CENTER = [44.2035, 17.9078];

// Bus stops coordinates (dodaj sve stvarne stanice)
const BUS_STOPS = [
  { id: 1, name: "Zenica AS", lat: 44.2035, lng: 17.9078 },
  { id: 2, name: "Hotel Metalurg", lat: 44.2045, lng: 17.9088 },
  { id: 3, name: "Stadion", lat: 44.2025, lng: 17.9068 },
  { id: 4, name: "Općina", lat: 44.2055, lng: 17.9098 },
  { id: 5, name: "Bolnica", lat: 44.2065, lng: 17.9108 },
  { id: 6, name: "Novi Most", lat: 44.2075, lng: 17.9118 },
  { id: 7, name: "Garnizon", lat: 44.2085, lng: 17.9128 },
  { id: 8, name: "Blatuša", lat: 44.2015, lng: 17.9058 },
  { id: 9, name: "Stara Pijaca", lat: 44.2040, lng: 17.9083 },
  { id: 10, name: "Džamija", lat: 44.2050, lng: 17.9093 },
  { id: 11, name: "Gornja Zenica", lat: 44.2095, lng: 17.9138 },
  { id: 12, name: "Lukovo Polje", lat: 44.2105, lng: 17.9148 },
  { id: 13, name: "Klopče", lat: 44.1980, lng: 17.9030 },
  { id: 14, name: "Donja Gračanica", lat: 44.2000, lng: 17.9200 },
  { id: 15, name: "Ričice", lat: 44.2020, lng: 17.9050 },
];

// Initialize map
function initMap() {
  map = L.map('map-container', {
    zoomControl: true,
    attributionControl: false
  }).setView(ZENICA_CENTER, 13);

  // Light mode tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
  }).addTo(map);

  // Add bus stops
  BUS_STOPS.forEach(stop => {
    const marker = L.circleMarker([stop.lat, stop.lng], {
      radius: 10,
      fillColor: '#FF3B30',
      color: '#fff',
      weight: 3,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(map);

    marker.bindPopup(`<b>${stop.name}</b>`);
    marker.on('click', () => showStopInfo(stop));
    
    stopMarkers[stop.id] = marker;
  });
}

// Show stop info popup
function showStopInfo(stop) {
  const popup = document.getElementById('stop-info-popup');
  const stopName = document.getElementById('stop-name');
  const linesList = document.getElementById('stop-lines-list');

  stopName.textContent = stop.name;
  linesList.innerHTML = '';

  // Find which lines pass through this stop
  const linesAtStop = LINES.filter(line => {
    return line.directions.some(dir => {
      const allStops = dir.departures.workdays || [];
      if (allStops.length > 0) {
        return allStops[0].stops.some(s => s.name === stop.name);
      }
      return false;
    });
  });

  if (linesAtStop.length === 0) {
    linesList.innerHTML = '<p style="color: #8e8e93; text-align: center; padding: 20px;">Nema linija na ovoj stanici</p>';
  } else {
    linesAtStop.forEach(line => {
      const item = document.createElement('div');
      item.className = 'stop-line-item';
      item.innerHTML = `
        <div class="stop-line-number">${line.number}</div>
        <span>${line.name}</span>
      `;
      linesList.appendChild(item);
    });
  }

  popup.classList.remove('hidden');
}

// Close stop info
document.getElementById('close-stop-info').onclick = () => {
  document.getElementById('stop-info-popup').classList.add('hidden');
};

// Navigation
document.getElementById('nav-home').onclick = () => {
  document.getElementById('screen-lines').classList.add('active');
  document.getElementById('screen-map').classList.remove('active');
  document.getElementById('screen-line-detail').classList.remove('active');
  document.getElementById('screen-trip').classList.remove('active');
  document.getElementById('nav-home').classList.add('active');
  document.getElementById('nav-map').classList.remove('active');
  document.getElementById('main-header').classList.remove('hidden');
  document.getElementById('bottom-nav').style.display = 'flex';
};

document.getElementById('nav-map').onclick = () => {
  document.getElementById('screen-lines').classList.remove('active');
  document.getElementById('screen-line-detail').classList.remove('active');
  document.getElementById('screen-trip').classList.remove('active');
  document.getElementById('screen-map').classList.add('active');
  document.getElementById('nav-home').classList.remove('active');
  document.getElementById('nav-map').classList.add('active');
  document.getElementById('main-header').classList.add('hidden');
  document.getElementById('bottom-nav').style.display = 'flex';
  
  if (!map) {
    setTimeout(initMap, 100);
  }
};
