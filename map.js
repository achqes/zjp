// =======================
// ENHANCED BUS MAP SYSTEM
// - Directional stop markers (each side of street shows only relevant buses)
// - Route visualization with animation
// - User location tracking
// =======================

let mapInitialized = false;
let userLocationMarker = null;
let userLocationWatchId = null;

// =======================
// USER LOCATION TRACKING
// =======================

function startUserLocationTracking() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (position) => updateUserLocationOnMap(position.coords),
    (error) => console.log("Location access denied:", error),
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
  );

  if (!userLocationWatchId) {
    userLocationWatchId = navigator.geolocation.watchPosition(
      (position) => updateUserLocationOnMap(position.coords),
      null,
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
  }
}

function updateUserLocationOnMap(coords) {
  if (!window.busMap) return;
  const latlng = [coords.latitude, coords.longitude];

  if (userLocationMarker) {
    userLocationMarker.setLatLng(latlng);
  } else {
    const pulseIcon = L.divIcon({
      className: '',
      html: `
        <div style="width:32px;height:32px;background:radial-gradient(circle,rgba(59,130,246,0.4) 0%,transparent 70%);border-radius:50%;position:absolute;top:-16px;left:-16px;animation:pulse 2s infinite;"></div>
        <div style="width:12px;height:12px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);position:absolute;top:-6px;left:-6px;"></div>
      `,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
    userLocationMarker = L.marker(latlng, { icon: pulseIcon })
      .addTo(window.busMap)
      .bindTooltip("Tvoja lokacija", { permanent: false, direction: 'top', offset: [0, -10] });
  }
}

function stopUserLocationTracking() {
  if (userLocationWatchId) {
    navigator.geolocation.clearWatch(userLocationWatchId);
    userLocationWatchId = null;
  }
  if (userLocationMarker) {
    window.busMap.removeLayer(userLocationMarker);
    userLocationMarker = null;
  }
}

// =======================
// ROUTE VISUALIZATION
// =======================

/**
 * Otvara modal sa informacijama o stanici i proračunava dolaske
 * stop_obj = { name, lat, lng }
 */
// =======================
// STOP SHEET UI
// =======================

function openStopSheet(stop_obj) {
  const sheet = document.getElementById('stop-sheet');
  const backdrop = document.getElementById('stop-sheet-backdrop');
  const arrivalsContainer = document.getElementById('stop-sheet-arrivals');
  const stopNameEl = document.getElementById('stop-sheet-name');

  if (!sheet || !arrivalsContainer || !stopNameEl) {
    console.error("Stop sheet elementi nisu pronađeni u HTML-u!");
    return;
  }

  stopNameEl.textContent = stop_obj.name;

  // Pronađi autobuse samo za ovu specifičnu stranu ulice
  const arrivals = getArrivalsAtCoordinate(stop_obj.name, stop_obj.lat, stop_obj.lng);

  if (arrivals.length === 0) {
    arrivalsContainer.innerHTML = `
      <div class="stop-sheet-empty">
        <p>Trenutno nema planiranih polazaka u sljedećih 90 minuta.</p>
      </div>`;
  } else {
    arrivalsContainer.innerHTML = arrivals.map(bus => {
      let countdownClass, countdownText;
      if (bus.minutesFromNow <= 1) {
        countdownClass = 'stop-arrival-now';
        countdownText = 'Sada';
      } else if (bus.minutesFromNow <= 10) {
        countdownClass = 'stop-arrival-soon';
        countdownText = `${bus.minutesFromNow} min`;
      } else {
        countdownClass = 'stop-arrival-time';
        countdownText = `${bus.minutesFromNow} min`;
      }

      return `
        <div class="stop-arrival-row" onclick="openLineFromStop(${bus.lineId})">
          <div class="stop-arrival-line-badge">${bus.lineNumber}</div>
          <div class="stop-arrival-info">
            <div class="stop-arrival-direction">${bus.directionTo}</div>
            <div class="stop-arrival-from">iz ${bus.directionFrom} · ${bus.arrivalTime}</div>
          </div>
          <div class="stop-arrival-countdown">
            <span class="${countdownClass}">${countdownText}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  sheet.classList.add('open');
  backdrop.classList.add('open');
}

// Dodaj i funkciju za zatvaranje
function closeStopSheet() {
  document.getElementById('stop-sheet').classList.remove('open');
  document.getElementById('stop-sheet-backdrop').classList.remove('open');
}

// Funkcija koja omogućava da klikneš na bus u stanici i otvoriš tu liniju
function openLineFromStop(lineId) {
  closeStopSheet();
  switchToTab('lines');
  openLineDetail(lineId);
}

// =======================
// ROUTE VISUALIZATION
// =======================

let currentRouteLayer = null;

function drawRouteWithAnimation(lineId, directionId) {
  if (!window.busMap) return; // Mapa još nije inicijalizirana
  if (currentRouteLayer) {
    currentRouteLayer.clearLayers();
  } else {
    currentRouteLayer = L.featureGroup().addTo(window.busMap);
  }

  const line = LINES.find(l => l.id === lineId);
  if (!line) return;

  const direction = line.directions.find(d => d.id === directionId);
  if (!direction) return;

  const dayOfWeek = new Date().getDay();
  let dayType = 'workdays';
  if (dayOfWeek === 0) dayType = 'sunday';
  else if (dayOfWeek === 6) dayType = 'saturday';

  const departures = direction.departures[dayType] || [];
  if (departures.length === 0) return;

  const firstDeparture = departures;
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const coordsArray = [];
  let passedStopsCount = 0;

  firstDeparture.stops.forEach((stopInfo) => {
    // getStopCoordinates sada vraća null za hidden stanice
    const coords = getStopCoordinates(stopInfo.name, direction.to, direction.from);
    
    if (coords) {
      const isPassed = stopInfo.offset <= nowMinutes;
      if (isPassed) passedStopsCount++;

      coordsArray.push({ latLng: [coords.lat, coords.lng], isPassed });

      const markerColor = isPassed ? '#666666' : '#e6bc36';

      const marker = L.circleMarker([coords.lat, coords.lng], {
        radius: 7,
        fillColor: markerColor,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(currentRouteLayer);

      marker.bindTooltip(stopInfo.name, { permanent: false, direction: 'top', offset: [0, -10] });
    }
  });

  // Iscrtavanje linija samo preko valjanih koordinata
  if (coordsArray.length >= 2) {
    const passedCoords = coordsArray.slice(0, Math.max(passedStopsCount, 0)).map(s => s.latLng);
    const upcomingCoords = coordsArray.slice(Math.max(passedStopsCount - 1, 0)).map(s => s.latLng);

    if (passedCoords.length >= 2) {
      L.polyline(passedCoords, { color: '#555555', weight: 4, opacity: 0.7, lineCap: 'round', lineJoin: 'round' }).addTo(currentRouteLayer);
    }
    if (upcomingCoords.length >= 2) {
      L.polyline(upcomingCoords, { color: '#007AFF', weight: 4, opacity: 0.5, lineCap: 'round', lineJoin: 'round', dashArray: '8, 6' }).addTo(currentRouteLayer);
    }
  }

  setTimeout(() => {
      if (currentRouteLayer && currentRouteLayer.getBounds && currentRouteLayer.getBounds().isValid()) {
        window.busMap.fitBounds(currentRouteLayer.getBounds(), { padding: [20, 20] });
      }
    }, 50);
  }

  function clearRoute() {
    if (currentRouteLayer) currentRouteLayer.clearLayers();
  }

function clearRoute() {
  if (currentRouteLayer) currentRouteLayer.clearLayers();
}

// =======================
// MAP INITIALIZATION
// =======================

function initBusMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  // Sagradi mapu koja povezuje svaku fizičku lokaciju sa smjerovima
  buildStopDirectionMap();

  window.busMap = L.map('map-container', { zoomControl: false }).setView([44.2070, 17.9130], 14);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap © CARTO',
    maxZoom: 19
  }).addTo(window.busMap);

  L.control.zoom({ position: 'bottomright' }).addTo(window.busMap);

  startUserLocationTracking();

  let markers = [];

  function makeStopIcon(zoom) {
    const size = zoom >= 15 ? 14 : 10;
    return L.divIcon({
      className: '',
      html: `<div style="width:${size}px;height:${size}px;background:#007AFF;border:2.5px solid #fff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.5);"></div>`,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2]
    });
  }

  function updateMarkers() {
    const zoom = window.busMap.getZoom();
    markers.forEach(m => window.busMap.removeLayer(m));
    markers = [];

    // For each stop in PHYSICAL_STOPS, place a marker per unique coordinate
    // Each marker only shows buses that go in the directions matching that side
    for (const stopName in PHYSICAL_STOPS) {
      const stopDef = PHYSICAL_STOPS[stopName];
      const allCoords = getAllStopCoordinates(stopName);

      allCoords.forEach(coordEntry => {
        const stop_obj = {
          name: stopName,
          lat: coordEntry.lat,
          lng: coordEntry.lng
        };

        const marker = L.marker([coordEntry.lat, coordEntry.lng], { icon: makeStopIcon(zoom) })
          .addTo(window.busMap)
          .on('click', () => {
            // Prosledi samo stop_obj sa koordinatama - sve ostalo se računa iz STOP_DIRECTION_MAP
            openStopSheet(stop_obj);
          });

        if (zoom >= 15) {
          marker.bindTooltip(stopName, {
            permanent: true,
            direction: 'right',
            offset: [8, 0],
            className: 'stop-label'
          }).openTooltip();
        }

        markers.push(marker);
      });
    }
  }

  window.busMap.on('zoomend', updateMarkers);
  updateMarkers();

  // Pulse animation CSS
  const style = document.createElement('style');
  style.textContent = `@keyframes pulse{0%{transform:scale(1);opacity:1;}50%{transform:scale(1.2);opacity:0.7;}100%{transform:scale(1);opacity:1;}}`;
  document.head.appendChild(style);
}

window.addEventListener('beforeunload', () => {
  stopUserLocationTracking();
});