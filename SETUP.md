# 🚀 zePrevoz v2.0 - Brz početak

## Što trebas?
1. **Sve datoteke** iz `/mnt/user-data/outputs/`
2. **HTTP server** (ne možeš samo otvoriti HTML u browseru - trebat će Geolocation)

## Datoteke koje trebas

```
zePrevoz/
├── index.html           ← Glavna stranica
├── style.css            ← Stilovi
├── data.js              ← Sve linije i polasci
├── physical_stops.js    ← NOVA: Koordinate svih stanica
├── app.js               ← Logika aplikacije
├── map.js               ← Mapa i vizuelizacija ruta
├── obavijesti.js        ← Notifikacije
└── README.md            ← Dokumentacija
```

## Kako pokrenuti?

### Opcija 1: Python
```bash
cd zePrevoz/
python3 -m http.server 8000
# Otvori: http://localhost:8000
```

### Opcija 2: Node.js
```bash
npm install -g http-server
cd zePrevoz/
http-server
# Otvori: http://localhost:8080
```

### Opcija 3: Live Server (VS Code)
1. Instaliraj extension "Live Server"
2. Desni klik na `index.html`
3. "Open with Live Server"

## Što radi?

✅ **Početna** - Obavijesti i omiljene linije
✅ **Linije** - Pretraga svih autobusnih linija
✅ **Mapa** - Vizuelna mapa ruta sa tvojom lokacijom
✅ **Info** - Linkovi i informacije

## Kako koristiti?

### 1. Pronađi liniju
```
Meni → Linije → Pretraži (npr. "3")
```

### 2. Vidi sve polazake
```
Odaberi liniju → Vidiš sve polazake za taj dan
```

### 3. Vidi kartu rute
```
Meni → Mapa → Otidi na Linije i odaberi liniju
Mapa automatski prikazuje rutu!
```

### 4. Pronađi stanicu
```
Klikni na bilo koju stanici na mapi
Vidiš sve buseve koji staju na toj stanici!
```

### 5. Vidi gdje si ti
```
Plavi marker sa pulsom = tvoja lokacija
(Moraš dozvoliti Geolocation pristup)
```

## Važne napomene

⚠️ **Mapa zahtjeva HTTPS ili localhost**
- Geolocation API ne radi na file:// protokolu
- Koristi `-m http.server` ili Live Server!

⚠️ **Dozvoli geolokaciju**
- Browser će te pitati: "Želiš li dozvoliti lokaciju?"
- Klikni "DA" da vidiš gdje si ti

⚠️ **Koordinate stanica**
- Svi podaci su iz **physical_stops.js**
- Ako neki marker izgleda krivo, provjeri koordinate

## Struktura koda

### physical_stops.js
```javascript
// Baza svih stanica
PHYSICAL_STOPS = {
  "Naziv Stanice": {
    isTerminus: false,
    directions: {
      "prema Mjestu": { lat, lng },
      "prema Mjestu B": { lat, lng }
    }
  }
}

// Pronađi koordinate
getStopCoordinates("Hotel Metalurg", "prema Bolnici")
// → { lat: 44.202388, lng: 17.907858 }
```

### map.js
```javascript
// Inicijalizira mapu
initBusMap()

// Crta rutu linije
drawRouteWithAnimation(lineId, directionId)

// Vidi polazake na stanici
getArrivalsForStop(stopName)

// Otvori informacije stanice
openStopSheet(stop)
```

### app.js
```javascript
// Otvori detalje linije
openLineDetail(lineId)

// Promijeni smjer vožnje
// (automatski osvježava rutu na mapi)
```

## Primjer: Kako dodati novu stanicu?

1. Otvori **physical_stops.js**
2. Pronađi gdje se nalazi (geografski)
3. Dodaj u odgovarajuću sekciju:

```javascript
// Primjer: Dodaj novu stanicu "Centar"
"Centar": {
  isTerminus: false,
  directions: {
    "prema Bolnici": { lat: 44.2030, lng: 17.9070 },
    "prema AS": { lat: 44.2035, lng: 17.9065 }
  }
}
```

4. Spremi datoteku
5. Osvježi browser

Sada će "Centar" biti vidljiva na mapi!

## Testiranje

### Test 1: Osnovni pregled
```
1. Otvori aplikaciju
2. Idi na "Linije"
3. Klikni na bilo koju liniju
4. Trebao bi vidjeti sve polazake
```

### Test 2: Mapa
```
1. Idi na "Mapa"
2. Povećaj zoom (scroller ili + gumb)
3. Na zoomu 15+ trebali bi vidjeti nazive stanica
4. Klikni na stanicu
5. Trebao bi vidjeti sve sljedeće buseve
```

### Test 3: Lokacija
```
1. Dozvoli geolokaciju kada se pita
2. Trebao bi vidjeti plavi marker sa pulsom
3. Pomakni se (ako provjeriš na mobilu)
4. Marker se trebao pomaknuti sa tobom
```

### Test 4: Ruta
```
1. Idi na "Linije"
2. Odaberi bilo koju liniju (npr. 3)
3. Idi na "Mapa" (trebala bi vidjeti rutu!)
4. Crne markeri = već vozene stanice
5. Plave markeri = buduće stanice
6. Siva linija = dio koji je vozio
7. Plava isprekidana = dio koji treba voziti
```

## Greške i rješenja

### "PHYSICAL_STOPS is not defined"
- Provjeri je li `physical_stops.js` prvi skripti u HTML-u

### Mapa je prazna / bez markera
- Osvježi stranicu
- Provjeri Console (F12) za greške
- Provjeri je li Leaflet učitan (trebao bi vidjeti OpenStreetMap)

### Lokacija ne radi
- Provjeri je li HTTPS ili localhost
- Dozvoli geolokaciju u postavkama
- Provjeri je li browser ima geolokaciju

### Stannice na krivom mjestu
- Otvori Google Maps
- Pronađi stanicu
- Vidi koordinate (desni klik → koordinate)
- Ažuriraj u physical_stops.js

## Napredne opcije

### Promijeni srednje stanice
```javascript
// U physical_stops.js, sekcija "DOM"
"Dom": {
  isTerminus: false,
  directions: {
    "prema Bolnici": { lat: 44.1930, lng: 17.9167 },
    "prema Gornjoj Zenici": { lat: 44.1940, lng: 17.9176 }
  }
}
```

### Dodaj novi terminus
```javascript
// U physical_stops.js
"Novi Grad": {
  isTerminus: true,  // ← Izraz je TRUE jer se tu bus okreće
  directions: {
    "default": { lat: 44.2100, lng: 17.9100 }
  }
}
```

### Promijeni boje na mapi
- Otvori **map.js**
- Pronađi `#007AFF` (plava) ili `#666666` (siva)
- Zamijeni sa novom bojom u HEX formatu

## Kontakt

- **Razvojac**: Marko Opačak
- **Email**: markoopacak08@gmail.com
- **Grad**: Zenica, BiH

---

**zePrevoz v2.0 - Gotovo! ✅**
