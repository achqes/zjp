/**
 * STOP_DIRECTION_MAP
 * Povezuje svaku fizičku koordinatu stanice sa smjerovima koji tu prolaze.
 * 
 * STOP_DIRECTION_MAP[stopName][coordKey] = [
 *   { lineId, lineNumber, directionId, directionTo, directionFrom }
 * ]
 */

const STOP_DIRECTION_MAP = {};

function buildStopDirectionMap() {
  // Inicijaliziraj sve vidljive stanice
  for (const stopName in PHYSICAL_STOPS) {
    const stop = PHYSICAL_STOPS[stopName];
    if (stop.hidden) continue;

    STOP_DIRECTION_MAP[stopName] = {};

    getAllStopCoordinates(stopName).forEach(coordEntry => {
      const coordKey = `${coordEntry.lat},${coordEntry.lng}`;
      STOP_DIRECTION_MAP[stopName][coordKey] = [];
    });
  }

  // Prođi kroz sve linije i smjerove
  LINES.forEach(line => {
    line.directions.forEach(direction => {
      const allDepartures = [
        ...(direction.departures.workdays || []),
        ...(direction.departures.saturday || []),
        ...(direction.departures.sunday || [])
      ];

      // Ukloni duplikate po vremenu
      const uniqueDepartures = Array.from(
        new Map(allDepartures.map(d => [d.time, d])).values()
      );

      uniqueDepartures.forEach(departure => {
        departure.stops.forEach(stopInfo => {
          const stopName = stopInfo.name;
          const stop = PHYSICAL_STOPS[stopName];
          if (!stop || stop.hidden) return;

          // Pronađi koordinatu za ovaj smjer (grad ili periferija)
          const coords = getStopCoordinates(stopName, direction.to, direction.from);
          if (!coords) return;

          const coordKey = `${coords.lat},${coords.lng}`;

          // Inicijaliziraj ako koordinata nije bila u getAllStopCoordinates
          if (!STOP_DIRECTION_MAP[stopName][coordKey]) {
            STOP_DIRECTION_MAP[stopName][coordKey] = [];
          }

          // Dodaj smjer ako već nije dodan
          const exists = STOP_DIRECTION_MAP[stopName][coordKey].some(
            e => e.lineId === line.id && e.directionId === direction.id
          );

          if (!exists) {
            STOP_DIRECTION_MAP[stopName][coordKey].push({
              lineId: line.id,
              lineNumber: line.number,
              directionId: direction.id,
              directionTo: direction.to,
              directionFrom: direction.from
            });
          }
        });
      });
    });
  });

  console.log("✅ STOP_DIRECTION_MAP sagrađen!", STOP_DIRECTION_MAP);
}

function getDirectionsAtCoordinate(stopName, lat, lng) {
  const coordKey = `${lat},${lng}`;
  return STOP_DIRECTION_MAP[stopName]?.[coordKey] || [];
}

function getArrivalsAtCoordinate(stopName, lat, lng) {
  const directions = getDirectionsAtCoordinate(stopName, lat, lng);
  if (directions.length === 0) return [];

  const now = new Date();
  const dayOfWeek = now.getDay();
  let dayType = 'workdays';
  if (dayOfWeek === 0) dayType = 'sunday';
  else if (dayOfWeek === 6) dayType = 'saturday';

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const arrivals = [];

  const isTerminus = PHYSICAL_STOPS[stopName]?.isTerminus || false;

  directions.forEach(directionInfo => {
    const line = LINES.find(l => l.id === directionInfo.lineId);
    if (!line) return;

    const direction = line.directions.find(d => d.id === directionInfo.directionId);
    if (!direction) return;

    // Na terminusima prikaži samo odlaske (bus kreće odavde)
    if (isTerminus && direction.from !== stopName) return;

    const departures = direction.departures[dayType] || [];

    departures.forEach(departure => {
      const stopEntry = departure.stops.find(s => s.name === stopName);
      if (!stopEntry) return;

      const [depH, depM] = departure.time.split(':').map(Number);
      const depMinutes = depH * 60 + depM;
      const arrivalMinutes = depMinutes + stopEntry.offset;
      const minutesFromNow = arrivalMinutes - nowMinutes;

      if (minutesFromNow >= -2 && minutesFromNow <= 90) {
        const totalMin = ((arrivalMinutes % 1440) + 1440) % 1440;
        const h = Math.floor(totalMin / 60);
        const m = totalMin % 60;
        const arrivalTime = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;

        arrivals.push({
          lineNumber: line.number,
          lineName: line.name,
          directionTo: direction.to,
          directionFrom: direction.from,
          arrivalTime,
          arrivalMinutes,
          minutesFromNow: Math.round(minutesFromNow),
          lineId: line.id,
          directionId: direction.id
        });
      }
    });
  });

  arrivals.sort((a, b) => a.arrivalMinutes - b.arrivalMinutes);
  return arrivals;
}