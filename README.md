# zePrevoz - Napredniji Bus Transit App
## Verzija 2.0 - Kompletni sistem sa direktnim stanicama i vizuelizacijom ruta

### 🎯 Što je novo?

#### 1. **SISTEM DIREKTNIH STANICA** (physical_stops.js)
Sada app razumije da svaka međustanica ima **DVIJE FIZIČKE LOKACIJE**:
- Jednu na svakoj strani ceste
- Svaka strana ide u drugom smjeru

**Primjer: Hotel Metalurg**
- Prema Kanalu: 44.203085, 17.907881
- Prema Bolnici: 44.202388, 17.907858

**Terminusi** (gdje se bus okreće) imaju samo JEDNU lokaciju:
- Bolnica, Donja Gračanica, Gornja Zenica, itd.

#### 2. **VIZUELIZACIJA RUTA** (map.js)
Kad otvoriš liniju, mapa pokazuje:
- ✅ **Tamnija linija** - dio rute koji je bus već prošao
- ✅ **Svjetlija isprekidana linija** - dio rute koji bus još treba voziti
- ✅ **Markeri za sve stanice** - različitih boja (sive = već prošle, plave = buduće)
- ✅ **Automatski zoom** - mapa se prilagođava da vidiš cijelu rutu

#### 3. **PRAĆENJE LOKACIJE KORISNIKA** (map.js)
- 📍 Tvoja lokacija se prikazuje na mapi
- 🔵 Pulsirajući plavi marker sa halo efektom
- 🔄 Automatski se ažurira dok se krećeš

#### 4. **PRIKAZ POLAZAKA NA STANICI**
Kad klikneš na stanicu:
- Vidiš sve buseve koji staju na toj stanici u sljedećih 90 minuta
- Broj minuta do polaska
- Broj linije i smjer vožnje

---

### 📁 Datoteke sistema

#### **physical_stops.js** (Nova!)
```javascript
PHYSICAL_STOPS - Baza svih stanica sa koordinatama za oba smjera
getStopCoordinates(stopName, direction) - Pronađi koordinate stanice
getAllStopCoordinates(stopName) - Svi markeri za stanicu
```

#### **map.js** (Poboljšan)
```javascript
initBusMap() - Inicijalizira mapu sa stanicama
drawRouteWithAnimation(lineId, directionId) - Crta rutu sa animacijom
startUserLocationTracking() - Počinje pratiti korisnikovu lokaciju
openStopSheet(stop) - Otvara list sa polascima za stanicu
getArrivalsForStop(stopName) - Pronalazi sve sljedeće buseve
```

#### **app.js** (Ažuriran)
- Sada automatski crta rutu kad otvorisš liniju
- Ruta se osvježi kad promijenisš smjer
- Mapu prikazuje rutu kad je odabrana linija

#### **index.html** (Ažuriran)
- Dodano: `<script src="physical_stops.js"></script>`

---

### 🗺️ Kako radi mapa?

**1. Otvaranje mapy**
```
Meni → Mapa
```

**2. Odabir linije**
```
Meni → Linije → Odaberi liniju
```
Mapa automatski prikazuje rutu te linije!

**3. Promjena smjera**
Klikni na strelicu (↕) u header-u da vidiš povratni smjer. Mapa se osvježi!

**4. Klik na stanicu**
```
Klikni na marker stanice → Otvara se list sa polascima
```

**5. Tvoja lokacija**
Plavi marker sa pulsom = gdje si ti sada

---

### 📍 BAZA STANICA - Sve koordinate

#### **LINIJA 3: Blatuša - Bolnica**

**Autobusni Kolodvor** (Terminus)
- default: 44.203177, 17.907980

**Stadion** (Međustanica)
- prema Bolnici: 44.206277, 17.906089
- prema Gornjoj Zenici: 44.206277, 17.906089
- prema AS: 44.206277, 17.906089

**Općina** (Međustanica)
- prema Bolnici: 44.201600, 17.903590
- prema Gornjoj Zenici: 44.201671, 17.903779

**Dom** (Međustanica)
- prema Bolnici: 44.192980, 17.916724
- prema Gornjoj Zenici: 44.193980, 17.917564

**Novi Most** (Međustanica)
- prema Kanalu: 44.194666, 17.919026
- prema Bolnici: 44.193997, 17.918806

**Garnizon** (Međustanica)
- prema Bolnici: 44.195364, 17.923079
- prema Gornjoj Zenici: 44.194782, 17.922204

**Komplex** (Međustanica)
- prema Bolnici: 44.198618, 17.925553
- prema Sviću: 44.197804, 17.924934

**Babina R.** (Međustanica)
- prema Bolnici: 44.204113, 17.927446
- prema Blatuši: 44.201749, 17.926410

**Bolnica** (Terminus)
- default: 44.207127, 17.924127

---

#### **LINIJA 1 & 2: Bolnica - Kanal**

**Hotel Metalurg** (Međustanica)
- prema Kanalu: 44.203085, 17.907881
- prema Bolnici: 44.202388, 17.907858

**Stara Pijaca** (Međustanica)
- prema Kanalu: 44.200197, 17.911260
- prema Bolnici: 44.200302, 17.910438

**Džamija** (Međustanica)
- prema Kanalu: 44.199047, 17.916977
- prema Bolnici: 44.199138, 17.916430

**Nova Zenica / Željezarska** (Međustanica)
- prema Kanalu: 44.218301, 17.911349
- prema Bolnici: 44.218483, 17.911314

**Kanal** (Terminus)
- default: 44.218301, 17.911349

---

#### **LINIJA 4: Bolnica - Donja Gračanica**

**Crkvice** (Međustanica)
- prema Bolnici: 44.203933, 17.922595
- prema Donjoj Gračanici: 44.203082, 17.921683

**Crkvice R** (Međustanica)
- prema Bolnici: 44.200938, 17.920434
- prema Donjoj Gračanici: 44.200663, 17.920311

**Donje Crkvice R** (Međustanica)
- prema Bolnici: 44.197656, 17.922559
- prema Donjoj Gračanici: 44.198790, 17.921259

**Donja Gračanica** (Terminus)
- default: 44.230133, 17.906800

---

#### **LINIJA 10: Autobusni Kolodvor - Gornja Zenica**

**Lovački dom** (Međustanica)
- prema Gornjoj Zenici: 44.195083, 17.910388
- prema AS: 44.195143, 17.910349

**Mokušnice** (Međustanica)
- prema Gornjoj Zenici: 44.195083, 17.910388
- prema AS: 44.195143, 17.910349

**Prodavnica** (Međustanica)
- prema Gornjoj Zenici: 44.188023, 17.907296

**Gornja Zenica** (Terminus)
- default: 44.229040, 17.885560

---

#### **LINIJA 5 & 6: Bolnica - Sviće/Janjići**

**Pehare** (Međustanica)
- prema Bolnici: 44.220807, 17.916430
- prema Sviću: 44.220736, 17.916439

**Ričice** (Međustanica)
- prema Sviću: 44.222483, 17.919280

---

#### **LINIJA 9: Autobusni Kolodvor - Banlozi**

**Babina 2** (Međustanica)
- prema Lukovu Polju: 44.209200, 17.925500
- prema AS: 44.208618, 17.925553

**DC ZPP** (Međustanica)
- prema Lukovu Polju: 44.208880, 17.925553
- prema AS: 44.198618, 17.925553

**Otpad** (Međustanica)
- prema Lukovu Polju: 44.197804, 17.924934
- prema AS: 44.198618, 17.925553

**Lukovo Polje / Banlozi** (Terminus)
- default: 44.210560, 17.925560

---

#### **LINIJA 4 povratno: Donja Gračanica - Bolnica**

**Ul. Prof. Juraja Neidhardta / Nova Zenica** (Međustanica)
- prema Donjoj Gračanici: 44.207368, 17.906119
- prema Bolnici: 44.206918, 17.906919

**Kaktus** (Međustanica)
- prema Donjoj Gračanici: 44.207368, 17.906119
- prema Bolnici: 44.206918, 17.906919

---

### 🔧 Kako dodati nove stanice?

1. Otvori **physical_stops.js**
2. Dodaj novu stanicu u **PHYSICAL_STOPS** objekt:

```javascript
"Naziv Stanice": {
  isTerminus: false,  // ili true ako je terminusom
  directions: {
    "prema Mjestu A": { lat: 44.XXXX, lng: 17.XXXX },
    "prema Mjestu B": { lat: 44.XXXX, lng: 17.XXXX }
  }
}
```

3. Spremi i osvježi stranicu

---

### 🎨 Boje na mapi

- 🔵 **Plava** - Buduće stanice (koje bus još treba posjetiti)
- ⚫ **Siva** - Prošle stanice (koje je bus već posjetio)
- 🔵 **Pulsiraća plava** - Tvoja lokacija

---

### ⚙️ Tehnički detalji

**PHYSICAL_STOPS struktura:**
```javascript
{
  "Naziv Stanice": {
    isTerminus: boolean,           // Je li ovo mjesto gdje se bus okreće?
    directions: {
      "smjer 1": { lat: ..., lng: ... },  // Koordinate za jedan smjer
      "smjer 2": { lat: ..., lng: ... }   // Koordinate za drugi smjer
    }
  }
}
```

**Kako funkcije pronalaze stanice:**
1. `getStopCoordinates(stopName, direction)` - Traži točne koordinate
2. Ako ne nađe točan smjer, radi "fuzzy match"
3. Ako ništa ne nađe, koristi prvi dostupan smjer

---

### 📱 Kompatibilnost

- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ iOS (Apple Maps integracija)
- ✅ Android (Google Maps integracija)
- ✅ Geolocation (zahtjeva dozvolu korisnika)

---

### 🐛 Rješavanje problema

**Problem: Mapa ne prikazuje rutu**
- Provjeri je li linija odabrana
- Osvježi stranicu (F5)
- Provjeri je li `drawRouteWithAnimation` funkcija dostupna

**Problem: Lokacija se ne prikazuje**
- Dozvoli pristupu geolokaciji u postavkama browsera
- Provjeri je li browser podržava Geolocation API

**Problem: Stanice na krivim mjestima**
- Provjeri koordinate u physical_stops.js
- Korisni alati: Google Maps, OpenStreetMap

---

### 📊 Što je još trebalo?

Za potpunu funkcionalnost trebalo bi:
- ✅ Direktne stanice na obje strane ceste
- ✅ Vizuelizacija ruta
- ✅ Praćenje korisnikove lokacije
- ⏳ Live pozicija buseva (zahtjeva GPS na busevima)
- ⏳ Real-time kašnjenja (zahtjeva GPS podatke)
- ⏳ Alert-i kada se bus približava

---

### 👨‍💻 Verzija

**zePrevoz v2.0**
- Razvojni tim: Marko Opačak
- Datum: Lipanj 2026
- Lokacija: Zenica, BiH

Šta je trebalo završiti: ✅ **GOTOVO!**
