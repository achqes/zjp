// =======================
// PHYSICAL STOPS DATABASE
// =======================
// "periferija" = strana na kojoj staju busevi koji idu PREMA periferiji (iz AS/Bolnice)
// "grad"       = strana na kojoj staju busevi koji idu PREMA gradu (iz periferije)
//
// Logika: gledamo direction.from
// - Bus koji KRECE iz periferije (Janjici, Klopce...) = GRAD strana
// - Bus koji KRECE iz grada (AS, Bolnica...) = PERIFERIJA strana

const PERIFERIJA_ORIGINS = [
  "Kanal", "Svice", "Janjici", "Gornja Zenica",
  "Klopce", "Lukovo Polje", "Banlozi", "Ricice",
  "Donja Gracanica", "Blatusa"
];

// Originalni nazivi sa dijakriticima
const PERIFERIJA_ORIGINS_FULL = [
  "Kanal", "Sviće", "Janjići", "Gornja Zenica",
  "Klopče", "Lukovo Polje", "Banlozi", "Ričice",
  "Donja Gračanica", "Blatuša"
];

const PHYSICAL_STOPS = {

  // ===== TERMINUSI (Okretišta) =====

  "Bolnica":          { isTerminus: true, directions: { "default": { lat: 44.207127, lng: 17.924127 } } },
  "Donja Gračanica":  { isTerminus: true, directions: { "default": { lat: 44.230133, lng: 17.906800 } } },
  "Gornja Zenica":    { isTerminus: true, directions: { "default": { lat: 44.229040, lng: 17.885560 } } },
  "Lukovo Polje":     { isTerminus: true, directions: { "default": { lat: 44.19023155834505, lng: 17.9404901583691 } } },
  "Kanal":            { isTerminus: true, directions: { "default": { lat: 44.23070958711065, lng: 17.90541393711451 } } },
  "Klopče":           { isTerminus: true, directions: { "default": { lat: 44.188000, lng: 17.940000 } } },
  "Sviće":            { isTerminus: true, directions: { "default": { lat: 44.229000, lng: 17.920000 } } },
  "Janjići":          { isTerminus: true, directions: { "default": { lat: 44.229000, lng: 17.920000 } } },
  "Blatuša":          { isTerminus: true, directions: { "default": { lat: 44.211139, lng: 17.913764 } } },
  "Banlozi":          { isTerminus: true, directions: { "default": { lat: 44.256030, lng: 17.882673 } } },
  "Ričice":           { isTerminus: true, directions: { "default": { lat: 44.222400, lng: 17.919360 } } },

  // ===== USPUTNE STANICE =====
  // "periferija" = marker gdje staju busevi koji idu iz grada prema periferiji
  // "grad"       = marker gdje staju busevi koji dolaze iz periferije prema gradu

  "Autobusni Kolodvor": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.208861, lng: 17.911833 },
      "grad":       { lat: 44.208750, lng: 17.911583 }
    }
  },
    "Hotel Rudara": {
    isTerminus: false,
    directions: {
      "grad":       { lat: 44.203217339077284, lng: 17.902772429928905 },
      "periferija": { lat: 44.20348086066552, lng: 17.90305904389039 }
    }
  },

    "Pehare": {
    isTerminus: false,
    directions: {
      "grad":       { lat: 44.220842808614876, lng: 17.91646332310573 },
      "periferija": { lat: 44.220767281033666, lng: 17.91647167182983 }
    }
  },

    "Željeznička": {
    isTerminus: false,
    directions: {
      "grad":       { lat: 44.209355450511616, lng: 17.914142881289973 },
      "periferija": { lat: 44.20924389766198, lng: 17.914279336623647 }
    }
  },
    "Ambulanta Pehare": {
    isTerminus: false,
    directions: {
      "grad":       { lat: 44.2185012214739, lng: 17.91129496137988 },
      "periferija": { lat: 44.21831766117962, lng: 17.91134102675896 }
    }
  }, 

  
  "Wiip": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.228840412477496, lng: 17.909041401683204 },
      "grad":       { lat: 44.206384, lng: 17.905961 }
    }
  },


  "Stadion": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.206277, lng: 17.906088 },
      "grad":       { lat: 44.206384, lng: 17.905961 }
    }
  },

  "Općina": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.201600, lng: 17.903589 },
      "grad":       { lat: 44.201671, lng: 17.903779 }
    }
  },

  "Hotel Metalurg": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.203085, lng: 17.907880 },
      "grad":       { lat: 44.202388, lng: 17.907857 }
    }
  },

  "Stara Pijaca": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.200197, lng: 17.911259 },
      "grad":       { lat: 44.200301, lng: 17.910437 }
    }
  },

  "Džamija": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.199047, lng: 17.916976 },
      "grad":       { lat: 44.199137, lng: 17.916429 }
    }
  },

  "Novi Most": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.194665, lng: 17.919025 },
      "grad":       { lat: 44.193996, lng: 17.918806 }
    }
  },

  "Garnizon": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.194782, lng: 17.922204 },
      "grad":       { lat: 44.195364, lng: 17.923079 }
    }
  },

  "Nova Zenica": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.207367, lng: 17.906119 },
      "grad":       { lat: 44.206917, lng: 17.906919 }
    }
  },

  "Babina Rijeka": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.204113, lng: 17.927446 },
      "grad":       { lat: 44.201748, lng: 17.926410 }
    }
  },

  "Babina R.": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.204113, lng: 17.927446 },
      "grad":       { lat: 44.201748, lng: 17.926410 }
    }
  },

  "Crkvice": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.203082, lng: 17.921683 },
      "grad":       { lat: 44.203933, lng: 17.922609 }
    }
  },

  "Crkvice R": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.200662, lng: 17.920311 },
      "grad":       { lat: 44.200937, lng: 17.920434 }
    }
  },

  "Đački Dom": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.19294040902225, lng: 17.916748689966564 },
      "grad":       { lat: 44.19189226154793, lng: 17.91763490791409 }
    }
  },


  "Sarajevska": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.196358192888276, lng: 17.910559461552374 },
      "grad":       { lat: 44.19577100646202, lng: 17.911975752090147 }
    }
  },

  
  "Londža": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.19547691472177, lng: 17.919078551030776 },
      "grad":       { lat: 44.19615853941993, lng: 17.918973133162975 }
    }
  },

  
  "Crkvice R": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.200662, lng: 17.920311 },
      "grad":       { lat: 44.200937, lng: 17.920434 }
    }
  },

  "Donje Crkvice R": {
    isTerminus: false,
    directions: {
      "periferija": { lat: 44.198790, lng: 17.921258 },
      "grad":       { lat: 44.197655, lng: 17.922558 }
    }
  },

  // ===== SKRIVENE STANICE =====

  "Lovački dom":       { hidden: true },
  "Mokušnice":         { hidden: true },
  "Prodavnica":        { hidden: true },
  "Turbe":             { hidden: true },
  "Luke":              { hidden: true },
  "Voljevac":          { hidden: true },
  "Široka stijena":    { hidden: true },
  "Urue (Dom)":        { hidden: true },
  "Bare":              { hidden: true },
  "Komplex":           { hidden: true },
  "Komplex A":         { hidden: true },
  "Željezarska":       { hidden: true },
  "Bebara":            { hidden: true },
  "Prepodovi":         { hidden: true },
  "Ričice (Bremina)":  { hidden: true },
  "Babina 2":          { hidden: true },
  "DC ZPP":            { hidden: true },
  "Otpad":             { hidden: true },
  "Vodorad":           { hidden: true },
  "Radakovo":          { hidden: true },
  "Klopče B":          { hidden: true },
  "Dom":               { hidden: true },
  "Dom A.BiH":         { hidden: true }
};

// =======================
// HELPER FUNKCIJE
// =======================

function getStopCoordinates(stopName, directionTo, directionFrom) {
  const stop = PHYSICAL_STOPS[stopName];
  if (!stop || stop.hidden) return null;

  if (stop.isTerminus) return stop.directions.default;

  // Bus koji KRECE IZ periferije ide na GRAD stranu
  // Bus koji KRECE IZ grada ide na PERIFERIJA stranu
  const fromPeriferija = PERIFERIJA_ORIGINS_FULL.includes(directionFrom);
  const side = fromPeriferija ? "grad" : "periferija";

  return stop.directions[side] || Object.values(stop.directions)[0];
}

function getAllStopCoordinates(stopName) {
  const stop = PHYSICAL_STOPS[stopName];
  if (!stop || stop.hidden) return [];

  const seen = new Set();
  const result = [];
  for (const [dir, coords] of Object.entries(stop.directions)) {
    const key = `${coords.lat},${coords.lng}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push({ lat: coords.lat, lng: coords.lng, direction: dir });
    }
  }
  return result;
}

function getDirectionsForStopCoord(stopName, lat, lng) {
  const stop = PHYSICAL_STOPS[stopName];
  if (!stop || stop.hidden) return [];
  const directions = [];
  for (const [dir, coords] of Object.entries(stop.directions)) {
    if (Math.abs(coords.lat - lat) < 0.000005 && Math.abs(coords.lng - lng) < 0.000005) {
      directions.push(dir);
    }
  }
  return directions;
}