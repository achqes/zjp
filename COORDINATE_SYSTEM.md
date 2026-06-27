# 📍 Koordinatni Sistem - Kako funkcionira direktni sistem stanica

## Osnovna ideja

Svaka **međustanica** na autobusnom redu ima **DVE FIZIČKE LOKACIJE** na mapi:
- Jednu **na svakoj strani ceste**
- Svaka je za drugi smjer vožnje

**Terminusi** (gdje se autobus okreće) imaju samo **JEDNU lokaciju**.

---

## 🗺️ Primjer: Hotel Metalurg (Linija 1)

```
                  C E S T A
                  =========

SJEVER           |            |           JUGU
KANALA      [M1] |            | [M2]     BOLNICE
                 |            |
              Hotel         Hotel
              Metalurg      Metalurg
              M1            M2
        44.203085        44.202388
        17.907881        17.907858
               ↓                ↓
        PREMA KANALU     PREMA BOLNICI
```

### Kako se koristi u kodu?

```javascript
// Ako autobus ide IZ Kanala PREMA Bolnici:
const coords = getStopCoordinates("Hotel Metalurg", "prema Bolnici");
// → { lat: 44.202388, lng: 17.907858 }  ← M2 strana

// Ako autobus ide IZ Bolnice PREMA Kanalu:
const coords = getStopCoordinates("Hotel Metalurg", "prema Kanalu");
// → { lat: 44.203085, lng: 17.907881 }  ← M1 strana
```

---

## 📍 Primjer: Bolnica (Terminus)

```
                  C E S T A
                  =========

            |              |
            |   B O L N I C A   |
            |   [T]             |
            |   44.207127       |
            |   17.924127       |
                    ↓
            AUTOBUS SE OKREĆE
            (nema druge strane!)
```

### Kako se koristi u kodu?

```javascript
// Bolnica je terminus - ima samo jednu lokaciju:
const coords = getStopCoordinates("Bolnica", "bilo šta");
// Uvijek vraća → { lat: 44.207127, lng: 17.924127 }
```

---

## 🚌 Linija 3: Blatuša → Bolnica (Praktični primjer)

```
Blatuša          Autobusni          Stadion           Bolnica
(T)             Kolodvor (T)         (M)              (T)
 │                  │                 │                │
 │                  │                 │                │
 └──────────────────┴─────────────────┴────────────────┘
        SMJER: Prema Bolnici
        
STANICE U LINIJI:
1. Blatuša (Terminus)
   - default: 44.197527, 17.905085

2. Autobusni Kolodvor (Terminus)  
   - default: 44.203177, 17.907980

3. Stadion (Međustanica)
   - prema Bolnici: 44.206277, 17.906089
   - prema Gornjoj Zenici: 44.206277, 17.906089
   - prema AS: 44.206277, 17.906089

4. Općina (Međustanica)
   - prema Bolnici: 44.201600, 17.903590
   - prema Gornjoj Zenici: 44.201671, 17.903779

... itd ...

N. Bolnica (Terminus)
   - default: 44.207127, 17.924127
```

---

## 📊 PHYSICAL_STOPS Struktura

```javascript
PHYSICAL_STOPS = {
  
  // MIĘDUSTANICA - ima dva smjera
  "Stadion": {
    isTerminus: false,  // ← KLJUČNA RAZLIKA!
    directions: {
      "prema Bolnici": { lat: 44.206277, lng: 17.906089 },
      "prema Gornjoj Zenici": { lat: 44.206277, lng: 17.906089 },
      "prema AS": { lat: 44.206277, lng: 17.906089 }
    }
  },
  
  // TERMINUS - samo jedna lokacija
  "Bolnica": {
    isTerminus: true,  // ← KLJUČNA RAZLIKA!
    directions: {
      "default": { lat: 44.207127, lng: 17.924127 }  // samo jedan smjer
    }
  }
}
```

---

## 🔍 Kako Pronalazak Stanice Radi?

### Funkcija: `getStopCoordinates(stopName, direction)`

```
INPUT: stopName = "Hotel Metalurg"
       direction = "prema Bolnici"

PROCES:
1. Pronađi stanicu u PHYSICAL_STOPS
   ✓ Pronašao "Hotel Metalurg"

2. Ako je terminus?
   ✗ Nije (isTerminus = false)
   
3. Ako ima točan smjer?
   ✓ DA! "prema Bolnici" postoji
   
4. Vrati koordinate tog smjera
   → { lat: 44.202388, lng: 17.907858 }

OUTPUT: { lat: 44.202388, lng: 17.907858 }
```

---

## 🚍 Primjer: Kako se autobus mapira na stanicu?

### Scenario: Linija 1 - Kanal → Bolnica

```javascript
// Linija 1 smjer "Kanal → Bolnica" sadrži:
{
  stops: [
    { name: "Kanal", offset: 0 },
    { name: "Željezarska", offset: 5 },
    { name: "Nova Zenica", offset: 10 },
    { name: "Hotel Metalurg", offset: 15 },
    { name: "Stara Pijaca", offset: 18 },
    { name: "Džamija", offset: 20 },
    { name: "Novi Most", offset: 22 },
    { name: "Garnizon", offset: 24 },
    { name: "Crkvice R", offset: 28 },
    { name: "Bolnica", offset: 32 }
  ]
}

// Kad aplikacija želi pokazati rutu, ona:
// 1. Ide kroz sve stanice
// 2. Za svaku stanicu pronalazi koordinate
// 3. Kreira liniju na mapi

// Primjer za "Hotel Metalurg":
const direction = "prema Bolnici"  // ← KLJUČNO! To je smjer cijele linije
const coords = getStopCoordinates("Hotel Metalurg", direction);
// → { lat: 44.202388, lng: 17.907858 }  ← M2 strana
```

---

## 🛣️ Kako Aplikacija Crta Rutu?

### Kod u `map.js` - `drawRouteWithAnimation()`

```javascript
function drawRouteWithAnimation(lineId, directionId) {
  
  // 1. Pronađi liniju i smjer
  const line = LINES.find(l => l.id === lineId);
  const direction = line.directions.find(d => d.id === directionId);
  
  // 2. Za svaku stanicu u tom smjeru:
  direction.departures[dayType][0].stops.forEach(stopInfo => {
    
    // 3. PRONAĐI KOORDINATE STANICE U TOM SMJERU!
    const coords = getStopCoordinates(
      stopInfo.name,        // npr. "Hotel Metalurg"
      direction.to          // npr. "Bolnica" ← smjer linije!
    );
    
    // 4. PROVJERI JE LI JE STANICA JE VOZENA?
    const isPassed = stopInfo.offset <= nowMinutes;
    
    // 5. KREIRAJ MARKER
    if (isPassed) {
      // SIVI marker - već vozena stanica
      L.circleMarker([coords.lat, coords.lng], {
        color: '#999999'  // Siva
      }).addTo(map);
    } else {
      // PLAVI marker - buduća stanica
      L.circleMarker([coords.lat, coords.lng], {
        color: '#007AFF'  // Plava
      }).addTo(map);
    }
  });
  
  // 6. KREIRAJ LINIJE IZMEĐU STANICA
  // - Siva linija za vozene dijelove
  // - Plava isprekidana za buduće dijelove
}
```

---

## 🌐 Primjer Kompleksne Linije

### Linija 4: Bolnica ↔ Donja Gračanica

Ova linija ima **6 Crkvica-varijacija**:

```javascript
// STANICE:
- Bolnica (T)           ← Terminus
- Crkvice (M)           ← Međustanica
- Crkvice R (M)         ← Međustanica (malo drugačija lokacija)
- Donje Crkvice R (M)   ← Međustanica (najniža)
- Donja Gračanica (T)   ← Terminus

// PROBLEMO: Koja je koja kada app vršta rutu?
// RJEŠENJE: `direction.to` govori smjer!

// Kad ide Bolnica → Donja Gračanica:
getStopCoordinates("Crkvice", "prema Donjoj Gračanici")
→ 44.203082, 17.921683  ← Donja koordinata

// Kad ide Donja Gračanica → Bolnica:
getStopCoordinates("Crkvice", "prema Bolnici")
→ 44.203933, 17.922595  ← Gornja koordinata
```

---

## 🎯 Ključne Razlike

| Svojstvo | Međustanica | Terminus |
|----------|------------|----------|
| **Broj lokacija** | 2 (obje strane ceste) | 1 (gdje se okreće) |
| **isTerminus** | `false` | `true` |
| **directions** | Više smjerova | Samo `"default"` |
| **Primjena** | Hotel Metalurg, Stadion | Bolnica, Gornja Zenica |

---

## 🔧 Kako Dodati Novu Stanici?

### Primjer 1: Međustanica sa dva smjera

```javascript
"Novo Mjesto": {
  isTerminus: false,
  directions: {
    "prema Bolnici": { lat: 44.2000, lng: 17.9000 },
    "prema AS": { lat: 44.2010, lng: 17.9010 }
  }
}
```

### Primjer 2: Novi terminus

```javascript
"Novi Kolodvor": {
  isTerminus: true,
  directions: {
    "default": { lat: 44.2050, lng: 17.9050 }
  }
}
```

---

## 📱 Kako Aplikacija Koristi Sistem?

### Scenarij 1: Korisnik otvara Liniju 3

```
1. Klikne na "Linija 3" u aplikaciji
2. Aplikacija učita "Blatuša → Bolnica" smjer
3. Aplikacija poziva drawRouteWithAnimation(3, "blatusa-bolnica")
4. Za svaku stanicu:
   - Pronalazi koordinate sa smjerom "prema Bolnici"
   - Crta marker (siv ako je vozena, plav ako je buduća)
   - Crta linije između markera
5. Mapa pokazuje TOČNU rutu!
```

### Scenarij 2: Korisnik želi vidjeti autobuse na stanici

```
1. Klikne na marker "Hotel Metalurg"
2. Aplikacija poziva getArrivalsForStop("Hotel Metalurg")
3. Aplikacija prolazi kroz sve linije
4. Za svaku liniju koja ide kroz "Hotel Metalurg":
   - Pronalazi koordinate
   - Ako je korisnik u blizini te koordinate, prikazuje
5. Prikazuje sve buseve koji prolaze kroz tu stanicu!
```

---

## ⚠️ Česta Greška i Rješenje

### KRIVO:
```javascript
// Nema smjera u "directions" objektu
"Stadion": {
  isTerminus: false,
  directions: {
    // GREŠKA: Korisnik ide sa AS a aplikacija čeka "prema Bolnici"!
    "AS": { lat: 44.206277, lng: 17.906089 },
  }
}
```

### TOČNO:
```javascript
"Stadion": {
  isTerminus: false,
  directions: {
    // ✓ Koristi smjer prema terminusu!
    "prema Bolnici": { lat: 44.206277, lng: 17.906089 },
    "prema AS": { lat: 44.206277, lng: 17.906089 },
    "prema Gornjoj Zenici": { lat: 44.206277, lng: 17.906089 }
  }
}
```

---

## 🧮 Matematika Markera

Kada aplikacija crta liniju kroz koordinate:

```
Stadion (prema Bolnici)     → 44.206277, 17.906089
   ↓
Općina (prema Bolnici)      → 44.201600, 17.903590
   ↓
Dom (prema Bolnici)         → 44.192980, 17.916724
   ↓
Novi Most (prema Bolnici)   → 44.193997, 17.918806
   ↓
... itd ...
   ↓
Bolnica                     → 44.207127, 17.924127


RUTA NA MAPI:
Stadion -------- Općina -------- Dom -------- Novi Most ... Bolnica
  ●                ●              ●              ●               ●
```

---

## ✅ Validacija Koordinata

Prije nego što dodaš nove koordinate, provjeri:

1. **Je li U ZENICI?**
   - Latitude: 44.15 - 44.25
   - Longitude: 17.88 - 17.93

2. **Je li NA CESTI?**
   - Otvori Google Maps
   - Pronađi stanicu
   - Desni klik → Koordinate
   - Provjeri je li na ulici

3. **Je li U SMISLU?**
   - Ako je M1 prema Kanalu, trebala bi biti na toj strani
   - Ako je M2 prema Bolnici, trebala bi biti na drugoj strani

---

## 🎓 Zaključak

**Direktni sistem stanica** omogućava aplikaciji:
- ✓ Točnu lokaciju stanice za svaki smjer
- ✓ Pravilan prikaz ruta na mapi
- ✓ Točne notifikacije ("Bus stoji ovdje")
- ✓ Bolje iskustvo za korisnike

**Ključne funkcije:**
- `getStopCoordinates(name, direction)` - Pronađi točnu lokaciju
- `drawRouteWithAnimation()` - Crta rutu sa animacijom
- `getArrivalsForStop()` - Pronađi sve buseve na stanici

**Sve je automatsko!** Aplikacija koristi `direction.to` da bi znala u kojem smjeru ide autobus, pa može pronaći točne koordinate za svaku stanicu.

---

**Završeno! Sistem je potpuno funkcionalan. ✅**
