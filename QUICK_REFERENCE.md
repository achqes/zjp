# ⚡ QUICK REFERENCE - API Cheat Sheet

## 🚀 Brzi Pregled Glavnih Funkcija

---

## physical_stops.js

### PHYSICAL_STOPS Objekt
```javascript
// Baza svih stanica
PHYSICAL_STOPS = {
  "Naziv Stanice": {
    isTerminus: boolean,
    directions: {
      "smjer": { lat: number, lng: number }
    }
  }
}

// Primjer:
PHYSICAL_STOPS["Hotel Metalurg"] = {
  isTerminus: false,
  directions: {
    "prema Bolnici": { lat: 44.202388, lng: 17.907858 },
    "prema Kanalu": { lat: 44.203085, lng: 17.907881 }
  }
}
```

### getStopCoordinates(stopName, direction)
```javascript
// Pronalazi koordinate stanice za smjer
getStopCoordinates("Hotel Metalurg", "prema Bolnici")
// → { lat: 44.202388, lng: 17.907858 }

// Za terminuse (smjer nije bitan):
getStopCoordinates("Bolnica", "bilo šta")
// → { lat: 44.207127, lng: 17.924127 }

// Fuzzy match (ako smjer ne postoji točno):
getStopCoordinates("Stadion", "prema Zenici")
// → pronalazi "prema Gornjoj Zenici" i vraća koordinate
```

### getAllStopCoordinates(stopName)
```javascript
// Vrati sve fizičke lokacije stanice
getAllStopCoordinates("Hotel Metalurg")
// → [
//   { lat: 44.202388, lng: 17.907858 },
//   { lat: 44.203085, lng: 17.907881 }
// ]

// Za terminus (samo jedna):
getAllStopCoordinates("Bolnica")
// → [{ lat: 44.207127, lng: 17.924127 }]
```

---

## map.js

### initBusMap()
```javascript
// Inicijalizira Leaflet mapu
initBusMap();
// Kreira window.busMap sa:
// - OpenStreetMap tile layer
// - Zoom kontrolama
// - Markerima svih stanica
// - Geolocation tracking-om
```

### drawRouteWithAnimation(lineId, directionId)
```javascript
// Crta rutu sa animacijom (siva/plava)
drawRouteWithAnimation(3, "blatusa-bolnica");

// Što se dešava:
// 1. Pronalazi sve stanice u toj liniji/smjeru
// 2. Crta markere (sivi = vozeni, plavi = buduci)
// 3. Crta sivu liniju za vozene dijelove
// 4. Crta plavu isprekidanu liniju za buduće
// 5. Automatski zoom na cijelu rutu

// Parametri:
// - lineId: broj linije (3, 10, 1, itd.)
// - directionId: ID smjera ("blatusa-bolnica", "bolnica-blatusa", itd.)
```

### clearRoute()
```javascript
// Uklanja sve rute sa mape
clearRoute();
// Čisti currentRouteLayer i sve markere
```

### startUserLocationTracking()
```javascript
// Počinje pratiti GPS lokaciju korisnika
startUserLocationTracking();
// Kreira pulsirajući marker na mapi
// Ažurira se automatski

// Zahtjeva:
// - Browser sa Geolocation API
// - HTTPS ili localhost
// - Dozvolu korisnika
```

### stopUserLocationTracking()
```javascript
// Zaustavlja GPS praćenje
stopUserLocationTracking();
// Uklanja marker sa mape
// Zaustavlja watchPosition
```

### updateUserLocationOnMap(coords)
```javascript
// Ažurira marker korisnikove lokacije
updateUserLocationOnMap({
  latitude: 44.2070,
  longitude: 17.9130,
  accuracy: 30
});
```

### getArrivalsForStop(stopName)
```javascript
// Pronalazi sve buseve koji staju na stanici
getArrivalsForStop("Hotel Metalurg");
// → [
//   {
//     lineNumber: "3",
//     lineName: "Blatuša - Bolnica",
//     direction: "Bolnica",
//     arrivalTime: "14:30",
//     minutesFromNow: 5,
//     lineId: 3
//   },
//   ... više redova ...
// ]

// Filtrira:
// - Samo sljedećih 90 minuta
// - Ne starije od 2 minute
// - Sortira po vremenu dolaska
// - Razlika workdays/saturday/sunday
```

### openStopSheet(stop)
```javascript
// Otvara modal sa polascima na stanici
openStopSheet({
  name: "Hotel Metalurg",
  lat: 44.202388,
  lng: 17.907858
});

// Prikazuje:
// - Naziv stanice
// - Sve sljedeće buseve
// - Vrijeme dolaska
// - Link na Google/Apple Maps
```

### closeStopSheet()
```javascript
// Zatvara modal sa polascima
closeStopSheet();
// Smooth animacija zatvara (300ms)
```

### openLineFromStop(lineId)
```javascript
// Prebaca sa stopp sheet-a na detalje linije
openLineFromStop(3);
// Kombinira closeStopSheet() + openLineDetail()
```

---

## app.js

### switchToTab(tab)
```javascript
// Prebaca između glavnih tab-a
switchToTab('map');
switchToTab('lines');
switchToTab('home');
switchToTab('info');

// Što se dešava:
// 1. Sprema u localStorage
// 2. Postavlja active klasu
// 3. Prikazuje odgovarajući screen
// 4. Ako je 'map': inicijalizira mapu
// 5. Ako je 'map' i ima linije: crta rutu
```

### openLineDetail(lineId)
```javascript
// Otvara detalje linije (polasci)
openLineDetail(3);  // Linija 3

// Što se dešava:
// 1. Pronalazi liniju
// 2. Postavlja prvi smjer kao default
// 3. Prikazuje raspored polazaka
// 4. Crta rutu na mapi (ako je inicijalizirana)
// 5. Učitava korisničke preference
```

### renderDepartures()
```javascript
// Osvježava list polazaka
renderDepartures();

// Prikazuje:
// - Sve polazake za odabrani dan
// - Vrijeme dolaska na svaku stanicu
// - Ukupno vrijeme vožnje
```

### renderLines()
```javascript
// Prikazuje sve autobusne linije
renderLines();

// Sortira po ID-u
// Prikazuje broj i naziv linije
```

### toggleLineFavorite()
```javascript
// Dodaj/uklanja liniju iz omiljenih
toggleLineFavorite();

// Ako je ⭐ (omljena):
//   Uklanja iz favorites
//   Postavlja na ☆
// Ako je ☆ (nije):
//   Dodaje u favorites
//   Postavlja na ⭐
```

### renderFavorites()
```javascript
// Osvježava list omiljenih linija
renderFavorites();

// Prikazuje:
// - Sve omiljene linije sa linijama
// - ili poruka ako nema
```

### renderNotifications()
```javascript
// Prikazuje sve aktivne notifikacije
renderNotifications();

// Filtrira istekle notifikacije
// Sortira po vremenu
```

---

## GLOBALS (window scope)

### currentLine
```javascript
// Trenutno odabrana linija
currentLine = { id: 3, number: "3", name: "Blatuša - Bolnica", ... }

// null ako nema odabrane
```

### currentDirection
```javascript
// Trenutno odabrani smjer linije
currentDirection = { id: "blatusa-bolnica", from: "Blatuša", to: "Bolnica", ... }
```

### selectedDate
```javascript
// Datum za koji korisnik gleda raspored
selectedDate = new Date();  // Danas
```

### favorites
```javascript
// Array ID-eva omiljenih linija
favorites = [3, 10, 1]  // Omiljene linije 3, 10, 1

// Sprema se u localStorage
```

### window.busMap
```javascript
// Leaflet mapa objekat
window.busMap.setView([44.2070, 17.9130], 14);
window.busMap.fitBounds(...);
window.busMap.invalidateSize();

// null ako mapa nije inicijalizirana
```

### currentRouteLayer
```javascript
// Leaflet feature group sa rutom
// Sadrži sve markere i linije trenutne rute
currentRouteLayer.clearLayers();  // Uklanja sve sa mape
```

### userLocationMarker
```javascript
// Leaflet marker sa korisnikovom lokacijom
// null ako nema ili praćenja nije pokrenut
```

### userLocationWatchId
```javascript
// ID from navigator.geolocation.watchPosition()
// Koristi se za navigator.geolocation.clearWatch()
```

---

## CONSTANTS (data.js)

### LINES Array
```javascript
LINES = [
  {
    id: 3,
    number: "3",
    name: "Blatuša - Bolnica",
    schedule: { workdays: true, saturday: true, sunday: true },
    directions: [
      {
        id: "blatusa-bolnica",
        from: "Blatuša",
        to: "Bolnica",
        departures: {
          workdays: [ { time: "05:30", stops: [...] }, ... ],
          saturday: [...],
          sunday: [...]
        }
      },
      { ... povratni smjer ... }
    ]
  },
  ... više linija ...
]
```

### OBAVIJESTI Array
```javascript
OBAVIJESTI = [
  {
    id: 1,
    badge: "Podsjećamo",
    badgeColor: "#8b1616",
    icon: "📢",
    title: "Naslov",
    content: "Tekst sa HTML",
    timestamp: "2026-02-25T12:00:00Z",
    expiresInDays: 1000
  },
  ...
]
```

### TERMINUSES Set
```javascript
TERMINUSES = new Set([
  "Autobusni Kolodvor",
  "Bolnica",
  "Donja Gračanica",
  "Gornja Zenica",
  "Blatuša",
  "Lukovo Polje",
  "Banlozi",
  "Kanal"
]);
```

---

## HELPER FUNKCIJE

### calculateArrivalTime(startTime, duration)
```javascript
// Izračunava vrijeme dolaska
calculateArrivalTime("05:30", 23);
// → "05:53"

// Koristi offset iz LINES.directions[].departures[].stops[].offset
```

### isSchoolDay(date)
```javascript
// Provjeri je li dan su školski dan
isSchoolDay(new Date());
// → true/false

// Koristi se za razlikovanje raspored radnim danima
```

### isNotificationExpired(notification)
```javascript
// Provjeri je li notifikacija istekla
isNotificationExpired(notification);
// → true/false
```

### formatNotificationTime(timestamp)
```javascript
// Formatira vrijeme za notifikacije
formatNotificationTime("2026-02-25T12:00:00Z");
// → "Prije 2 h" ili "Jučer" ili "Prije 5 dana"
```

---

## LOKALNI STORAGE KLJUČEVI

```javascript
localStorage.getItem('zenicaBusFavorites')     // JSON array ID-eva
localStorage.getItem('currentLineId')          // Brojka ili null
localStorage.getItem('currentDirectionId')     // String ili null
localStorage.getItem('lastActiveTab')          // 'home'|'lines'|'map'|'info'
localStorage.getItem('currentScreen')          // Screen ID
localStorage.getItem('currentDepartureTime')   // HH:MM ili null
```

---

## EVENT LISTENERS

```javascript
// Mapiranje kroz sve nav stavke
document.querySelectorAll('.nav-item').forEach(...);

// Mapiranje kroz sve linije
LINES.forEach(line => {
  // onClick: openLineDetail(line.id)
});

// Mapiranje kroz sve direktne tab-ove
document.querySelectorAll('.home-tab').forEach(...);

// Mapiranje kroz sve stanice
for (const stopName in PHYSICAL_STOPS) { ... }
```

---

## CSS KLASE

```css
/* Glavne klase */
.screen { display: none; }        /* Ekrani */
.screen.active { display: block; } /* Aktivni ekran */

.nav-item { ... }                 /* Bottom navigacijski items */
.nav-item.active { ... }          /* Aktivni nav item */

.line-item { ... }                /* Stavka u listi linija */
.stop-arrival-row { ... }         /* Red u stanici */

/* Stop sheet */
.stop-sheet { ... }               /* Modal */
.stop-sheet.open { ... }          /* Otvoren modal */
.stop-sheet-backdrop { ... }      /* Pozadina */

/* Kalendar */
.calendar-day { ... }             /* Dan u kalendaru */
.calendar-day.active { ... }      /* Odabrani dan */

/* Zastavice - soon, now */
.stop-arrival-soon { color: #ff9500; } /* Do 5 minuta */
.stop-arrival-now { color: #ff3b30; }  /* Sada */
```

---

##常用 KOMBINACIJE

### Slijed: Korisnike otvara aplikaciju

```javascript
// 1. Browser učitava index.html
// 2. Učitavaju se sve script datoteke
// 3. Poziva se initHomeScreen()
// 4. Poziva se renderHomeScreen()
// 5. Prikazuju se notifikacije i omiljene
```

### Slijed: Korisnik odabira liniju

```javascript
// 1. onClick na liniju → openLineDetail(3)
// 2. Postavlja currentLine i currentDirection
// 3. Poziva renderDepartures()
// 4. Pokazuje sve polazake
// 5. Ako je map inicijalilan: drawRouteWithAnimation()
```

### Slijed: Korisnik ide na mapu

```javascript
// 1. switchToTab('map')
// 2. Inicijalizira busMap
// 3. Ako je linija odabrana: drawRouteWithAnimation()
// 4. Prikazuje sve stanice kao markeri
// 5. Pokazuje korisnikovu lokaciju
```

### Slijed: Korisnik klikne na stanicu

```javascript
// 1. onClick na marker → openStopSheet(stop)
// 2. Pronalazi sve buseve: getArrivalsForStop()
// 3. Prikazuje modal sa polascima
// 4. Ako korisnik odabere bus: openLineFromStop()
```

---

## 🚨 ČESTA GREŠKA

```javascript
// KRIVO: Ne postoji `direction` u PHYSICAL_STOPS
getStopCoordinates("Hotel Metalurg", "AS");
// → pronalazi "prema AS" ili vraća prvi dostupan

// TOČNO: Koristi točan smjer
getStopCoordinates("Hotel Metalurg", "prema Bolnici");
// → { lat: 44.202388, lng: 17.907858 }

// KRIVO: Koristiš `direction.to` umjesto imena
drawRouteWithAnimation(3, "Bolnica");
// Trebalo bi: drawRouteWithAnimation(3, "blatusa-bolnica")

// TOČNO: Koristi direction.id
drawRouteWithAnimation(3, "blatusa-bolnica");
// Crta rutu Blatuša → Bolnica
```

---

## 💡 SAVJETI

1. **Za Debug**: `console.log(PHYSICAL_STOPS)` da vidiš sve stanice
2. **Za Rad**: Uvijek koristi `getStopCoordinates()` umjesto direktnog pristupa
3. **Za Nove Stanice**: Kopiraj postojeću i promijeni koordinate
4. **Za Greške**: Provjeri Browser Console (F12) za detalje
5. **Za Mobile**: Testiraj na stvarnom telefonu sa GPS-om

---

**Zadnja ažuriranja**: 27. Lipnja 2026
**Verzija**: 2.0
**Status**: ✅ Gotovo
