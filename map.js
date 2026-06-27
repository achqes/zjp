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
// ARRIVALS FOR A SPECIFIC STOP + DIRECTION SIDE
// directionsFilter: array of direction.to strings this marker side serves
// =======================

function getArrivalsForStop(stopName, directionsFilter) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  let dayType = 'workdays';
  if (dayOfWeek === 0) dayType = 'sunday';
  else if (dayOfWeek === 6) dayType = 'saturday';

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const arrivals = [];

  LINES.forEach(line => {
    line.directions.forEach(direction => {
      // If we have a directionsFilter, only show buses whose direction.to matches
      if (directionsFilter && directionsFilter.length > 0) {
        const dirTo = direction.to;
        const matches = directionsFilter.some(df => {
          // df is like "prema Bolnici", dirTo is like "Bolnica"
          const dfClean = df.replace('prema ', '').toLowerCase();
          return dirTo.toLowerCase().includes(dfClean) || dfClean.includes(dirTo.toLowerCase());
        });
        if (!matches) return;
      }

      const departures = direction.departures[dayType] || [];
      departures.forEach(departure => {
        const stopEntry = departure.stops.find(s => s.name === stopName);
        if (!stopEntry) return;

        const [depH, depM] = departure.time.split(':').map(Number);
        const depMinutes = depH * 60 + depM;
        const arrivalMinutes = depMinutes + stopEntry.offset;
        const minutesFromNow = arrivalMinutes - nowMinutes;

        if (minutesFromNow >= -2 && minutesFromNow <= 90) {
          const totalMin = arrivalMinutes % (24 * 60);
          const h = Math.floor(((totalMin % 1440) + 1440) % 1440 / 60);
          const m = ((totalMin % 60) + 60) % 60;
          const arrivalTime = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;

          arrivals.push({
            lineNumber: line.number,
            lineName: line.name,
            direction: direction.to,
            directionId: direction.id,
            arrivalTime,
            minutesFromNow: Math.round(minutesFromNow),
            lineId: line.id
          });
        }
      });
    });
  });

  arrivals.sort((a, b) => a.minutesFromNow - b.minutesFromNow);
  return arrivals;
}

// =======================
// STOP SHEET UI
// =======================

function openStopSheet(stop, directionsFilter) {
  const existing = document.getElementById('stop-sheet');
  if (existing) existing.remove();

  const arrivals = getArrivalsForStop(stop.name, directionsFilter);

  const sheet = document.createElement('div');
  sheet.id = 'stop-sheet';
  sheet.className = 'stop-sheet';

  const mapsUrl = /iPad|iPhone|iPod/.test(navigator.userAgent)
    ? `maps://maps.apple.com/?daddr=${stop.lat},${stop.lng}&dirflg=d`
    : `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}&travelmode=transit`;

  let arrivalsHTML = '';
  if (arrivals.length === 0) {
    arrivalsHTML = `
      <div class="stop-sheet-empty">
        <span style="font-size:32px;opacity:0.4">🚌</span>
        <p>Nema polazaka u sljedećih 90 minuta</p>
      </div>`;
  } else {
    arrivalsHTML = arrivals.map(a => {
      let timeLabel = '';
      if (a.minutesFromNow <= 0) {
        timeLabel = `<span class="stop-arrival-now">Sada</span>`;
      } else if (a.minutesFromNow <= 5) {
        timeLabel = `<span class="stop-arrival-soon">${a.minutesFromNow} min</span>`;
      } else {
        timeLabel = `<span class="stop-arrival-time">${a.minutesFromNow} min</span>`;
      }

      return `
        <div class="stop-arrival-row" onclick="openLineFromStop(${a.lineId})">
          <div class="stop-arrival-line-badge">${a.lineNumber}</div>
          <div class="stop-arrival-info">
            <div class="stop-arrival-direction">→ ${a.direction}</div>
            <div class="stop-arrival-clock">${a.arrivalTime}</div>
          </div>
          <div class="stop-arrival-countdown">${timeLabel}</div>
        </div>`;
    }).join('');
  }

  sheet.innerHTML = `
    <div class="stop-sheet-handle"></div>
    <div class="stop-sheet-header">
      <div class="stop-sheet-title-row">
        <div class="stop-sheet-icon">🚏</div>
        <div class="stop-sheet-name">${stop.name}</div>
        <button class="stop-sheet-close" onclick="closeStopSheet()">✕</button>
      </div>
      <a class="stop-sheet-directions-btn" href="${mapsUrl}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.71 11.29l-9-9a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42l9 9a1 1 0 0 0 1.42 0l9-9a1 1 0 0 0 0-1.42zM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/></svg>
        Upute do stanice
      </a>
    </div>
    <div class="stop-sheet-section-title">Sljedeći polasci</div>
    <div class="stop-sheet-arrivals">${arrivalsHTML}</div>
  `;

  document.body.appendChild(sheet);

  const backdrop = document.createElement('div');
  backdrop.id = 'stop-sheet-backdrop';
  backdrop.className = 'stop-sheet-backdrop';
  backdrop.onclick = closeStopSheet;
  document.body.appendChild(backdrop);

  requestAnimationFrame(() => {
    sheet.classList.add('open');
    backdrop.classList.add('open');
  });
}

function closeStopSheet() {
  const sheet = document.getElementById('stop-sheet');
  const backdrop = document.getElementById('stop-sheet-backdrop');
  if (sheet) { sheet.classList.remove('open'); setTimeout(() => sheet.remove(), 300); }
  if (backdrop) { backdrop.classList.remove('open'); setTimeout(() => backdrop.remove(), 300); }
}

function openLineFromStop(lineId) {
  closeStopSheet();
  setTimeout(() => {
    switchToTab('lines');
    setTimeout(() => openLineDetail(lineId), 50);
  }, 200);
}

// =======================
// ROUTE VISUALIZATION
// =======================

let currentRouteLayer = null;

function drawRouteWithAnimation(lineId, directionId) {
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

  const firstDeparture = departures[0];
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const coordsArray = [];
  let passedStopsCount = 0;

  firstDeparture.stops.forEach((stopInfo, index) => {
    const coords = getStopCoordinates(stopInfo.name, direction.to);
    if (coords) {
      const isPassed = stopInfo.offset <= nowMinutes;
      if (isPassed) passedStopsCount++;

      coordsArray.push({ latLng: [coords.lat, coords.lng], isPassed });

      const markerColor = isPassed ? '#666666' : '#007AFF';

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
    if (currentRouteLayer.getBounds().isValid()) {
      window.busMap.fitBounds(currentRouteLayer.getBounds(), { padding: [50, 50] });
    }
  }, 100);
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
        // Find which directions use this exact coordinate
        const sidesDirections = getDirectionsForStopCoord(stopName, coordEntry.lat, coordEntry.lng);

        const stop_obj = {
          name: stopName,
          lat: coordEntry.lat,
          lng: coordEntry.lng
        };

        const marker = L.marker([coordEntry.lat, coordEntry.lng], { icon: makeStopIcon(zoom) })
          .addTo(window.busMap)
          .on('click', () => {
            // Pass the directions this side serves so we only show relevant buses
            openStopSheet(stop_obj, sidesDirections);
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
