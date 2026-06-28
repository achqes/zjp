# 🚌 SISTEM ZA PRIKAZIVANJE AUTOBUSA NA PRAVOJ STRANI ULICE

## Problem koji rješavamo
Svaka ulica u gradu ima **dva mjesta čekanja** - po jedno sa svake strane. Autobus koji ide od A→B koristit će samo **desnu stranu**, a povratni autobus B→A koristit će samo **lijevu stranu**. Trebali smo tačan način da povežemo fizičke markere na mapi sa smjerovima autobusa iz timetablea.

---

## Rješenje: STOP_DIRECTION_MAP

### 1. Struktura podataka

```javascript
// STOP_DIRECTION_MAP povezuje stanicu + koordinatu sa svim smjerovima koji je koriste
STOP_DIRECTION_MAP = {
  "Autobusni Kolodvor": {
    "44.208861,17.911833": [  // Leva strana ulice
      {
        lineId: 10,
        lineNumber: "10",
        directionId: "gornja-as",  // Povratak od Gornje Zenice
        directionTo: "Autobusni Kolodvor",
        directionFrom: "Gornja Zenica"
      }
    ],
    "44.208750,17.911583": [  // Desna strana ulice
      {
        lineId: 10,
        lineNumber: "10",
        directionId: "as-gornja",  // Od Autobusnog Kolodvora
        directionTo: "Gornja Zenica",
        directionFrom: "Autobusni Kolodvor"
      }
    ]
  },
  "Stadion": {
    "44.206277,17.906088": [  // Prema Bolnici
      {
        lineId: 10,
        lineNumber: "10",
        directionId: "as-gornja",
        directionTo: "Gornja Zenica",
        directionFrom: "Autobusni Kolodvor"
      }
    ],
    "44.206384,17.905961": [  // Prema AS
      {
        lineId: 10,
        lineNumber: "10",
        directionId: "gornja-as",
        directionTo: "Autobusni Kolodvor",
        directionFrom: "Gornja Zenica"
      }
    ]
  }
}
```

### 2. Kako se grade podaci

Funkcija `buildStopDirectionMap()` se poziva pri inicijalizaciji aplikacije:

```javascript
// U map.js -> initBusMap():
buildStopDirectionMap();
```

Funkcija prolazi kroz:
1. **Sve LINES** (sve autobuske linije)
2. **Sve directions** (sve smjerove - naprijed i nazad)
3. **Sve stops** u svakom smjeru
4. Za svaku stanicu pronalazi koju koordinatu koristi taj smjer
5. Sprema povezanost u STOP_DIRECTION_MAP

---

## 3. Kako se koristi

### Korak 1: Korisnik klikne na marker
```javascript
// U map.js -> updateMarkers():
const stop_obj = {
  name: "Stadion",
  lat: 44.206277,
  lng: 17.906088
};

marker.on('click', () => {
  openStopSheet(stop_obj);  // Prosledi SAMO koordinate
});
```

### Korak 2: Pronađi sve autobuse za tu koordinatu
```javascript
// U stop_direction_map.js:
function getArrivalsAtCoordinate(stopName, lat, lng) {
  const directions = getDirectionsAtCoordinate(stopName, lat, lng);
  // directions = svi smjerovi koji prolaze kroz ovu koordinatu
  
  // Pronađi sve autobuse za te smjerove
  // Sortiraj po vremenu dolaska
  // Vrati samo autobuse u sljedećih 90 minuta
}
```

### Korak 3: Prikaži u modalu
```javascript
// U map.js -> openStopSheet():
const arrivals = getArrivalsAtCoordinate(stop_obj.name, stop_obj.lat, stop_obj.lng);

// arrivals = samo autobusi koji prolaze kroz ovu STRANU ulice
// Prikaži ih u stop-sheet modalu
```

---

## Primjer: Stanica "Stadion"

### Fizička konfiguracija (physical_stops.js)
```javascript
"Stadion": {
  isTerminus: false,
  directions: {
    "prema Bolnici": { lat: 44.206277, lng: 17.906088 },      // Leva strana
    "prema AS": { lat: 44.206384, lng: 17.905961 }            // Desna strana
  }
}
```

### Linije koje prolaze kroz Stadion (data.js)
```javascript
// Linija 10: Autobusni Kolodvor → Gornja Zenica
{
  id: 10,
  directions: [
    {
      id: "as-gornja",  // Od AS prema Gornjoj Zenici
      from: "Autobusni Kolodvor",
      to: "Gornja Zenica",
      stops: [
        { name: "Autobusni Kolodvor", offset: 0 },
        { name: "Stadion", offset: 3 },        // Koristi "prema Bolnici"
        ...
      ]
    },
    {
      id: "gornja-as",  // Od Gornje Zenice prema AS
      from: "Gornja Zenica",
      to: "Autobusni Kolodvor",
      stops: [
        { name: "Gornja Zenica", offset: 0 },
        ...
        { name: "Stadion", offset: X },       // Koristi "prema AS"
        ...
      ]
    }
  ]
}
```

### Rezultat nakon `buildStopDirectionMap()`
```javascript
STOP_DIRECTION_MAP["Stadion"]["44.206277,17.906088"] = [
  {
    lineId: 10,
    lineNumber: "10",
    directionId: "as-gornja",      // Smjer 10a
    directionTo: "Gornja Zenica",
    directionFrom: "Autobusni Kolodvor"
  }
];

STOP_DIRECTION_MAP["Stadion"]["44.206384,17.905961"] = [
  {
    lineId: 10,
    lineNumber: "10",
    directionId: "gornja-as",      // Smjer 10b
    directionTo: "Autobusni Kolodvor",
    directionFrom: "Gornja Zenica"
  }
];
```

### Korisnik klikne na desnu stranu (44.206384, 17.905961)
```javascript
openStopSheet({
  name: "Stadion",
  lat: 44.206384,
  lng: 17.905961
});

// getArrivalsAtCoordinate() pronalazi:
// - directions = [{ lineId: 10, directionId: "gornja-as", ... }]
// - Traži samo autobuske smjer 10b (Gornja→AS)
// - Prikazuje samo te autobuse
```

---

## Funkcije u stop_direction_map.js

### `buildStopDirectionMap()`
- Poziva se pri inicijalizaciji
- Gradi kompletan STOP_DIRECTION_MAP
- Korisno za debug: `console.log(STOP_DIRECTION_MAP)`

### `getDirectionsAtCoordinate(stopName, lat, lng)`
- Pronalazi sve `direction.id`-eve koji prolaze kroz tu koordinatu
- Vraća niz sa informacijama o liniji i smjeru

### `getArrivalsAtCoordinate(stopName, lat, lng)`
- Pronalazi sve autobuse koji dolaze na tu koordinatu
- Vraća niz sa:
  - `lineNumber`, `lineName`
  - `directionTo`, `directionFrom`
  - `arrivalTime`, `minutesFromNow`
  - `lineId`, `directionId`

---

## Redoslijed učitavanja u HTML

```html
<!-- 1. Fizičke stanice -->
<script src="physical_stops.js"></script>

<!-- 2. Timetable linije -->
<script src="data.js"></script>

<!-- 3. NOVI: STOP_DIRECTION_MAP generator -->
<script src="stop_direction_map.js"></script>

<!-- 4. Mapa -->
<script src="map.js"></script>

<!-- 5. Glavna aplikacijska logika -->
<script src="app.js"></script>

<!-- 6. CSS -->
<link rel="stylesheet" href="style.css">
```

---

## Debug korisni savjeti

### Provjeri da li je STOP_DIRECTION_MAP pravilno sagrađen
```javascript
// U browser konzoli:
console.log(STOP_DIRECTION_MAP);

// Provjeri specifičnu stanicu:
console.log(STOP_DIRECTION_MAP["Stadion"]);

// Provjeri specifičnu koordinatu:
console.log(STOP_DIRECTION_MAP["Stadion"]["44.206384,17.905961"]);
```

### Provjeri koji smjerovi prolaze kroz koordinatu
```javascript
getDirectionsAtCoordinate("Stadion", 44.206384, 17.905961);
```

### Provjeri koji autobusi dolaze na koordinatu
```javascript
getArrivalsAtCoordinate("Stadion", 44.206384, 17.905961);
```

### Dodaj stanicu sa dvije strane
```javascript
// U physical_stops.js:
"Moja Stanica": {
  isTerminus: false,
  directions: {
    "prema Bolnici": { lat: 44.XXX, lng: 17.XXX },
    "prema AS": { lat: 44.YYY, lng: 17.YYY }
  }
}

// Sistem će automatski:
// 1. Stvoriti dva markera na mapi
// 2. Pokazati samo relevantne autobuse za svaki marker
```

---

## Često postavljana pitanja

### P: Što ako stanica nema koordinate?
O: Označi je sa `hidden: true` u `physical_stops.js`. Neće se prikazati na mapi, ali će se vozati kroz nju.

```javascript
"Lovački dom": { hidden: true, isTerminus: false, directions: { "default": { lat: 0, lng: 0 } } }
```

### P: Što ako autobus prolazi kroz stanicu ali je ne trebam na mapi?
O: Koristi `hidden: true` - stanica ostaje u redu vožnje, ali nema markera.

### P: Kako dodati stanicu samo sa jednom stranom?
O: Koristi `isTerminus: true` sa samo `default` smjerom:

```javascript
"Bolnica": { 
  isTerminus: true, 
  directions: { 
    "default": { lat: 44.207127, lng: 17.924127 } 
  } 
}
```

### P: Što ako dva smjera koriste istu koordinatu?
O: STOP_DIRECTION_MAP će sadržavati oba. To je OK - primjer je **terminusa** gdje oba smjera koriste istu točku.

---

## Sažetak - 3 datoteke su se promijenile

### 1. **NOVA: stop_direction_map.js**
- Generiše STOP_DIRECTION_MAP pri inicijalizaciji
- Funkcije: `buildStopDirectionMap()`, `getDirectionsAtCoordinate()`, `getArrivalsAtCoordinate()`

### 2. **Ažurirana: map.js**
- Poziva `buildStopDirectionMap()` u `initBusMap()`
- `openStopSheet()` koristi `getArrivalsAtCoordinate()` umjesto `getArrivalsForStop()`
- Uklonjena je `getArrivalsForStop()` funkcija (više nije potrebna)
- Markeri sada prosljeđuju samo `stop_obj` sa koordinatama

### 3. **Ostale datoteke**: physical_stops.js, data.js, app.js - ostaju iste! ✅

---

## Kako testirati

1. Otvori aplikaciju u browseru
2. Idi na "Mapa" tab
3. Klikni na bilo koji marker na mapi
4. Provjeri da li se prikazuju SAMO autobusi tog smjera
5. Klikni na drugi marker iste stanice (druga strana ulice)
6. Trebao bi da vidiš drugačije autobuse

Voilà! 🎉
