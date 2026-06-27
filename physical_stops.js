// =======================
// PHYSICAL STOPS DATABASE
// Each intermediate stop has two physical locations (two sides of street)
// Terminuses have only one location (bus turns around there)
// 
// DIRECTION KEY:
//   "iz" = departing FROM that area (outbound from center / toward terminus)
//   "u"  = going TO that area (inbound toward center / toward Bolnica/AS)
//
// For each non-terminus stop we store two coords:
//   one for each side of the road, matched by direction.to
// =======================

const PHYSICAL_STOPS = {

  // ===== AUTOBUSNI KOLODVOR (Terminus) =====
  "Autobusni Kolodvor": {
    isTerminus: true,
    directions: {
      "default": { lat: 44.203177, lng: 17.907980 }
    }
  },

  // ===== STADION =====
  // "iz Blatuše" = bus leaving Blatuša heading to Bolnica  → one side
  // going back toward Blatuša → other side
  "Stadion": {
    isTerminus: false,
    directions: {
      // Towards Bolnica / Gornja Zenica (iz blatuse heading bolnica)
      "prema Bolnici":       { lat: 44.20627710515332, lng: 17.90608899116281 },
      "prema Gornjoj Zenici":{ lat: 44.20627710515332, lng: 17.90608899116281 },
      "prema Kanalu":        { lat: 44.20627710515332, lng: 17.90608899116281 },
      // Towards Blatuša / AS (other side)
      "prema AS":            { lat: 44.206384, lng: 17.905961 },
      "prema Blatuši":       { lat: 44.206384, lng: 17.905961 },
      // Autobusni Kolodvor heading outbound
      "prema Autobusnom Kolodvoru": { lat: 44.206384, lng: 17.905961 }
    }
  },

  // ===== OPĆINA =====
  "Općina": {
    isTerminus: false,
    directions: {
      "prema Bolnici":        { lat: 44.20160008608379, lng: 17.903589965166535 },
      "prema Gornjoj Zenici": { lat: 44.20160008608379, lng: 17.903589965166535 },
      "prema Kanalu":         { lat: 44.20160008608379, lng: 17.903589965166535 },
      "prema AS":             { lat: 44.20167123870408, lng: 17.90377907987277 },
      "prema Blatuši":        { lat: 44.20167123870408, lng: 17.90377907987277 },
      "prema Autobusnom Kolodvoru": { lat: 44.20167123870408, lng: 17.90377907987277 }
    }
  },

  // ===== HOTEL METALURG =====
  "Hotel Metalurg": {
    isTerminus: false,
    directions: {
      "prema Kanalu":         { lat: 44.203085562739055, lng: 17.90788055026581 },
      "prema Gornjoj Zenici": { lat: 44.203085562739055, lng: 17.90788055026581 },
      "prema Donjoj Gračanici": { lat: 44.203085562739055, lng: 17.90788055026581 },
      "prema Klopčama":       { lat: 44.203085562739055, lng: 17.90788055026581 },
      "prema Banlozima":      { lat: 44.203085562739055, lng: 17.90788055026581 },
      "prema Janjićima":      { lat: 44.203085562739055, lng: 17.90788055026581 },
      "prema Ričicama":       { lat: 44.203085562739055, lng: 17.90788055026581 },
      "prema Bolnici":        { lat: 44.202388069803504, lng: 17.907857790961557 },
      "prema AS":             { lat: 44.202388069803504, lng: 17.907857790961557 },
      "prema Autobusnom Kolodvoru": { lat: 44.202388069803504, lng: 17.907857790961557 }
    }
  },

  // ===== STARA PIJACA =====
  "Stara Pijaca": {
    isTerminus: false,
    directions: {
      "prema Kanalu":         { lat: 44.20019727431863, lng: 17.91125998736952 },
      "prema Gornjoj Zenici": { lat: 44.20019727431863, lng: 17.91125998736952 },
      "prema Donjoj Gračanici": { lat: 44.20019727431863, lng: 17.91125998736952 },
      "prema Klopčama":       { lat: 44.20019727431863, lng: 17.91125998736952 },
      "prema Banlozima":      { lat: 44.20019727431863, lng: 17.91125998736952 },
      "prema Janjićima":      { lat: 44.20019727431863, lng: 17.91125998736952 },
      "prema Ričicama":       { lat: 44.20019727431863, lng: 17.91125998736952 },
      "prema Bolnici":        { lat: 44.20030194487854, lng: 17.910437905198847 },
      "prema AS":             { lat: 44.20030194487854, lng: 17.910437905198847 },
      "prema Autobusnom Kolodvoru": { lat: 44.20030194487854, lng: 17.910437905198847 }
    }
  },

  // ===== DŽAMIJA =====
  "Džamija": {
    isTerminus: false,
    directions: {
      "prema Kanalu":         { lat: 44.199047010534166, lng: 17.91697658853584 },
      "prema Gornjoj Zenici": { lat: 44.199047010534166, lng: 17.91697658853584 },
      "prema Donjoj Gračanici": { lat: 44.199047010534166, lng: 17.91697658853584 },
      "prema Klopčama":       { lat: 44.199047010534166, lng: 17.91697658853584 },
      "prema Banlozima":      { lat: 44.199047010534166, lng: 17.91697658853584 },
      "prema Janjićima":      { lat: 44.199047010534166, lng: 17.91697658853584 },
      "prema Ričicama":       { lat: 44.199047010534166, lng: 17.91697658853584 },
      "prema Bolnici":        { lat: 44.19913767526397, lng: 17.916429525515966 },
      "prema AS":             { lat: 44.19913767526397, lng: 17.916429525515966 },
      "prema Autobusnom Kolodvoru": { lat: 44.19913767526397, lng: 17.916429525515966 }
    }
  },

  // ===== NOVI MOST =====
  "Novi Most": {
    isTerminus: false,
    directions: {
      "prema Kanalu":         { lat: 44.19466506154098, lng: 17.919025710934665 },
      "prema Gornjoj Zenici": { lat: 44.19466506154098, lng: 17.919025710934665 },
      "prema Donjoj Gračanici": { lat: 44.19466506154098, lng: 17.919025710934665 },
      "prema Banlozima":      { lat: 44.19466506154098, lng: 17.919025710934665 },
      "prema Janjićima":      { lat: 44.19466506154098, lng: 17.919025710934665 },
      "prema Ričicama":       { lat: 44.19466506154098, lng: 17.919025710934665 },
      "prema Bolnici":        { lat: 44.19399664094276, lng: 17.91880630901313 },
      "prema AS":             { lat: 44.19399664094276, lng: 17.91880630901313 },
      "prema Autobusnom Kolodvoru": { lat: 44.19399664094276, lng: 17.91880630901313 }
    }
  },

  // ===== GARNIZON =====
  "Garnizon": {
    isTerminus: false,
    directions: {
      "prema Kanalu":         { lat: 44.19478223843914, lng: 17.922204148075206 },
      "prema Gornjoj Zenici": { lat: 44.19478223843914, lng: 17.922204148075206 },
      "prema Donjoj Gračanici": { lat: 44.19478223843914, lng: 17.922204148075206 },
      "prema Klopčama":       { lat: 44.19478223843914, lng: 17.922204148075206 },
      "prema Banlozima":      { lat: 44.19478223843914, lng: 17.922204148075206 },
      "prema Janjićima":      { lat: 44.19478223843914, lng: 17.922204148075206 },
      "prema Ričicama":       { lat: 44.19478223843914, lng: 17.922204148075206 },
      "prema Bolnici":        { lat: 44.1953643664406, lng: 17.923079012409534 },
      "prema AS":             { lat: 44.1953643664406, lng: 17.923079012409534 },
      "prema Autobusnom Kolodvoru": { lat: 44.1953643664406, lng: 17.923079012409534 }
    }
  },

  // ===== DOM =====
  "Dom": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.19197365890935, lng: 17.91756403675267 },
      "prema AS":             { lat: 44.19197365890935, lng: 17.91756403675267 },
      "prema Bolnici":        { lat: 44.19297994910718, lng: 17.91672355033063 },
      "prema Autobusnom Kolodvoru": { lat: 44.19297994910718, lng: 17.91672355033063 }
    }
  },

  "Dom A.BiH": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.19197365890935, lng: 17.91756403675267 },
      "prema AS":             { lat: 44.19197365890935, lng: 17.91756403675267 },
      "prema Bolnici":        { lat: 44.19297994910718, lng: 17.91672355033063 },
      "prema Autobusnom Kolodvoru": { lat: 44.19297994910718, lng: 17.91672355033063 }
    }
  },

  // ===== LOVAČKI DOM =====
  "Lovački dom": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.195083482434825, lng: 17.91038772679143 },
      "prema AS":             { lat: 44.19514309740447, lng: 17.910348834764992 },
      "prema Autobusnom Kolodvoru": { lat: 44.19514309740447, lng: 17.910348834764992 }
    }
  },

  // ===== MOKUŠNICE =====
  "Mokušnice": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.195083482434825, lng: 17.91038772679143 },
      "prema AS":             { lat: 44.19514309740447, lng: 17.910348834764992 },
      "prema Autobusnom Kolodvoru": { lat: 44.19514309740447, lng: 17.910348834764992 }
    }
  },

  // ===== PRODAVNICA =====
  "Prodavnica": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.18802330926334, lng: 17.9072961256979 },
      "prema AS":             { lat: 44.17607123178927, lng: 17.907921802260983 },
      "prema Autobusnom Kolodvoru": { lat: 44.17607123178927, lng: 17.907921802260983 }
    }
  },

  // ===== TURBE, LUKE, VOLJEVAC, ŠIROKA STIJENA, URUE (DOM), BARE =====
  // (coordinates approximate as user didn't supply them; keeping similar area)
  "Turbe": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.18802330926334, lng: 17.9072961256979 },
      "prema AS":             { lat: 44.17607123178927, lng: 17.907921802260983 },
      "prema Autobusnom Kolodvoru": { lat: 44.17607123178927, lng: 17.907921802260983 }
    }
  },
  "Luke": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.18802330926334, lng: 17.9072961256979 },
      "prema AS":             { lat: 44.17607123178927, lng: 17.907921802260983 },
      "prema Autobusnom Kolodvoru": { lat: 44.17607123178927, lng: 17.907921802260983 }
    }
  },
  "Voljevac": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.200000, lng: 17.896000 },
      "prema AS":             { lat: 44.200100, lng: 17.895900 },
      "prema Autobusnom Kolodvoru": { lat: 44.200100, lng: 17.895900 }
    }
  },
  "Široka stijena": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.207000, lng: 17.890000 },
      "prema AS":             { lat: 44.207100, lng: 17.889900 },
      "prema Autobusnom Kolodvoru": { lat: 44.207100, lng: 17.889900 }
    }
  },
  "Urue (Dom)": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.215000, lng: 17.887000 },
      "prema AS":             { lat: 44.215100, lng: 17.886900 },
      "prema Autobusnom Kolodvoru": { lat: 44.215100, lng: 17.886900 }
    }
  },
  "Bare": {
    isTerminus: false,
    directions: {
      "prema Gornjoj Zenici": { lat: 44.220000, lng: 17.886000 },
      "prema AS":             { lat: 44.220100, lng: 17.885900 },
      "prema Autobusnom Kolodvoru": { lat: 44.220100, lng: 17.885900 }
    }
  },

  // ===== KOMPLEX / KOMPLEX A =====
  "Komplex": {
    isTerminus: false,
    directions: {
      "prema Sviću":          { lat: 44.19780442323462, lng: 17.924934024941297 },
      "prema Janjićima":      { lat: 44.19780442323462, lng: 17.924934024941297 },
      "prema Bolnici":        { lat: 44.198618164311306, lng: 17.925553017625532 },
      "prema AS":             { lat: 44.198618164311306, lng: 17.925553017625532 },
      "prema Autobusnom Kolodvoru": { lat: 44.198618164311306, lng: 17.925553017625532 }
    }
  },
  "Komplex A": {
    isTerminus: false,
    directions: {
      "prema Sviću":          { lat: 44.19780442323462, lng: 17.924934024941297 },
      "prema Janjićima":      { lat: 44.19780442323462, lng: 17.924934024941297 },
      "prema Bolnici":        { lat: 44.198618164311306, lng: 17.925553017625532 },
      "prema AS":             { lat: 44.198618164311306, lng: 17.925553017625532 },
      "prema Autobusnom Kolodvoru": { lat: 44.198618164311306, lng: 17.925553017625532 }
    }
  },

  // ===== BABINA RIJEKA =====
  "Babina R.": {
    isTerminus: false,
    directions: {
      "prema Sviću":          { lat: 44.20411341663231, lng: 17.92744621614209 },
      "prema Janjićima":      { lat: 44.20411341663231, lng: 17.92744621614209 },
      "prema Ričicama":       { lat: 44.20411341663231, lng: 17.92744621614209 },
      "prema Blatuši":        { lat: 44.20174889585972, lng: 17.92641029749131 },
      "prema Bolnici":        { lat: 44.20174889585972, lng: 17.92641029749131 },
      "prema AS":             { lat: 44.20174889585972, lng: 17.92641029749131 },
      "prema Autobusnom Kolodvoru": { lat: 44.20174889585972, lng: 17.92641029749131 }
    }
  },
  "Babina Rijeka": {
    isTerminus: false,
    directions: {
      "prema Sviću":          { lat: 44.20411341663231, lng: 17.92744621614209 },
      "prema Janjićima":      { lat: 44.20411341663231, lng: 17.92744621614209 },
      "prema Ričicama":       { lat: 44.20411341663231, lng: 17.92744621614209 },
      "prema Blatuši":        { lat: 44.20174889585972, lng: 17.92641029749131 },
      "prema Bolnici":        { lat: 44.20174889585972, lng: 17.92641029749131 },
      "prema AS":             { lat: 44.20174889585972, lng: 17.92641029749131 },
      "prema Autobusnom Kolodvoru": { lat: 44.20174889585972, lng: 17.92641029749131 }
    }
  },

  // ===== ŽELJEZARSKA (replaces Nova Zenica / Bebara / Prepodovi on Kanal route) =====
  "Željezarska": {
    isTerminus: false,
    directions: {
      "prema Kanalu":         { lat: 44.21830102299925, lng: 17.9113493291695 },
      "prema Gornjoj Zenici": { lat: 44.21830102299925, lng: 17.9113493291695 },
      "prema Bolnici":        { lat: 44.21848276137042, lng: 17.91131424245087 },
      "prema AS":             { lat: 44.21848276137042, lng: 17.91131424245087 },
      "prema Autobusnom Kolodvoru": { lat: 44.21848276137042, lng: 17.91131424245087 }
    }
  },

  // ===== NOVA ZENICA (on lines 1, 2 toward Kanal) =====
  "Nova Zenica": {
    isTerminus: false,
    directions: {
      "prema Kanalu":         { lat: 44.20736774239239, lng: 17.90611937871607 },
      "prema Gornjoj Zenici": { lat: 44.20736774239239, lng: 17.90611937871607 },
      "prema Donjoj Gračanici": { lat: 44.20736774239239, lng: 17.90611937871607 },
      "prema Bolnici":        { lat: 44.20691774087285, lng: 17.906919274186272 },
      "prema AS":             { lat: 44.20691774087285, lng: 17.906919274186272 },
      "prema Autobusnom Kolodvoru": { lat: 44.20691774087285, lng: 17.906919274186272 }
    }
  },

  // ===== BEBARA & PREPODOVI (old stop names on line 1 - map to Željezarska area) =====
  "Bebara": {
    isTerminus: false,
    directions: {
      "prema Kanalu":         { lat: 44.21830102299925, lng: 17.9113493291695 },
      "prema Bolnici":        { lat: 44.21848276137042, lng: 17.91131424245087 },
      "prema AS":             { lat: 44.21848276137042, lng: 17.91131424245087 },
      "prema Autobusnom Kolodvoru": { lat: 44.21848276137042, lng: 17.91131424245087 }
    }
  },
  "Prepodovi": {
    isTerminus: false,
    directions: {
      "prema Kanalu":         { lat: 44.21830102299925, lng: 17.9113493291695 },
      "prema Bolnici":        { lat: 44.21848276137042, lng: 17.91131424245087 },
      "prema AS":             { lat: 44.21848276137042, lng: 17.91131424245087 },
      "prema Autobusnom Kolodvoru": { lat: 44.21848276137042, lng: 17.91131424245087 }
    }
  },

  // ===== CRKVICE (Linija 4) =====
  "Crkvice": {
    isTerminus: false,
    directions: {
      "prema Donjoj Gračanici": { lat: 44.203082437363214, lng: 17.921683679669293 },
      "prema Bolnici":          { lat: 44.203933036949145, lng: 17.922609498093127 },
      "prema AS":               { lat: 44.203933036949145, lng: 17.922609498093127 },
      "prema Autobusnom Kolodvoru": { lat: 44.203933036949145, lng: 17.922609498093127 }
    }
  },

  // ===== CRKVICE R =====
  "Crkvice R": {
    isTerminus: false,
    directions: {
      "prema Donjoj Gračanici": { lat: 44.20066282622752, lng: 17.92031118364446 },
      "prema Kanalu":           { lat: 44.19920079115488, lng: 17.92073350362417 },
      "prema Bolnici":          { lat: 44.20093793816354, lng: 17.920434039398113 },
      "prema AS":               { lat: 44.20093793816354, lng: 17.920434039398113 },
      "prema Autobusnom Kolodvoru": { lat: 44.20093793816354, lng: 17.920434039398113 }
    }
  },

  // ===== DONJE CRKVICE R =====
  "Donje Crkvice R": {
    isTerminus: false,
    directions: {
      "prema Donjoj Gračanici": { lat: 44.198790396211365, lng: 17.9212586737633 },
      "prema Bolnici":          { lat: 44.19765563657254, lng: 17.92255872481087 },
      "prema AS":               { lat: 44.19765563657254, lng: 17.92255872481087 },
      "prema Autobusnom Kolodvoru": { lat: 44.19765563657254, lng: 17.92255872481087 }
    }
  },

  // ===== UL. PROF. JURAJA NEIDHARDTA =====
  "Ul. Prof. Juraja Neidhardta": {
    isTerminus: false,
    directions: {
      "prema Donjoj Gračanici": { lat: 44.20736774239239, lng: 17.90611937871607 },
      "prema Bolnici":          { lat: 44.20691774087285, lng: 17.906919274186272 },
      "prema AS":               { lat: 44.20691774087285, lng: 17.906919274186272 },
      "prema Autobusnom Kolodvoru": { lat: 44.20691774087285, lng: 17.906919274186272 }
    }
  },

  // ===== KAKTUS =====
  "Kaktus": {
    isTerminus: false,
    directions: {
      "prema Bolnici":          { lat: 44.20691774087285, lng: 17.906919274186272 },
      "prema AS":               { lat: 44.20691774087285, lng: 17.906919274186272 },
      "prema Autobusnom Kolodvoru": { lat: 44.20691774087285, lng: 17.906919274186272 }
    }
  },

  // ===== PEHARE =====
  "Pehare": {
    isTerminus: false,
    directions: {
      "prema Sviću":    { lat: 44.22073646305007, lng: 17.91643867988429 },
      "prema Janjićima": { lat: 44.22073646305007, lng: 17.91643867988429 },
      "prema Ričicama":  { lat: 44.22073646305007, lng: 17.91643867988429 },
      "prema Bolnici":   { lat: 44.22080677614405, lng: 17.9164296580455 },
      "prema AS":        { lat: 44.22080677614405, lng: 17.9164296580455 },
      "prema Autobusnom Kolodvoru": { lat: 44.22080677614405, lng: 17.9164296580455 }
    }
  },

  // ===== RIČICE / RIČICE (BREMINA) =====
  "Ričice": {
    isTerminus: false,
    directions: {
      "prema Sviću":    { lat: 44.22248260501955, lng: 17.91928010541197 },
      "prema Janjićima": { lat: 44.22248260501955, lng: 17.91928010541197 },
      "prema Bolnici":   { lat: 44.22248260501955, lng: 17.91928010541197 },
      "prema AS":        { lat: 44.22248260501955, lng: 17.91928010541197 }
    }
  },
  "Ričice (Bremina)": {
    isTerminus: false,
    directions: {
      "prema Sviću":    { lat: 44.22248260501955, lng: 17.91928010541197 },
      "prema Janjićima": { lat: 44.22248260501955, lng: 17.91928010541197 },
      "prema Ričicama":  { lat: 44.22248260501955, lng: 17.91928010541197 },
      "prema Bolnici":   { lat: 44.22248260501955, lng: 17.91928010541197 },
      "prema AS":        { lat: 44.22248260501955, lng: 17.91928010541197 }
    }
  },

  // ===== LOVAČKI DOM (see above) - MOKUŠNICE above as well =====

  // ===== BABINA 2, DC ZPP, OTPAD (Linija 9) =====
  "Babina 2": {
    isTerminus: false,
    directions: {
      "prema Lukovu Polju": { lat: 44.209200, lng: 17.925500 },
      "prema Banlozima":    { lat: 44.209200, lng: 17.925500 },
      "prema AS":           { lat: 44.208618, lng: 17.925553 },
      "prema Autobusnom Kolodvoru": { lat: 44.208618, lng: 17.925553 }
    }
  },
  "DC ZPP": {
    isTerminus: false,
    directions: {
      "prema Lukovu Polju": { lat: 44.208880, lng: 17.925553 },
      "prema Banlozima":    { lat: 44.208880, lng: 17.925553 },
      "prema AS":           { lat: 44.198618, lng: 17.925553 },
      "prema Autobusnom Kolodvoru": { lat: 44.198618, lng: 17.925553 }
    }
  },
  "Otpad": {
    isTerminus: false,
    directions: {
      "prema Lukovu Polju": { lat: 44.197804, lng: 17.924934 },
      "prema Banlozima":    { lat: 44.197804, lng: 17.924934 },
      "prema AS":           { lat: 44.198618, lng: 17.925553 },
      "prema Autobusnom Kolodvoru": { lat: 44.198618, lng: 17.925553 }
    }
  },

  // ===== KLOPČE STOPS (Linija 7) =====
  "Vodorad": {
    isTerminus: false,
    directions: {
      "prema Klopčama": { lat: 44.197000, lng: 17.926000 },
      "prema AS":       { lat: 44.197100, lng: 17.925900 },
      "prema Autobusnom Kolodvoru": { lat: 44.197100, lng: 17.925900 }
    }
  },
  "Radakovo": {
    isTerminus: false,
    directions: {
      "prema Klopčama": { lat: 44.196000, lng: 17.927000 },
      "prema AS":       { lat: 44.196100, lng: 17.926900 },
      "prema Autobusnom Kolodvoru": { lat: 44.196100, lng: 17.926900 }
    }
  },
  "Klopče B": {
    isTerminus: false,
    directions: {
      "prema Klopčama": { lat: 44.195000, lng: 17.928000 },
      "prema AS":       { lat: 44.195100, lng: 17.927900 },
      "prema Autobusnom Kolodvoru": { lat: 44.195100, lng: 17.927900 }
    }
  },

  // ===== TERMINUSES =====
  "Bolnica": {
    isTerminus: true,
    directions: { "default": { lat: 44.207127, lng: 17.924127 } }
  },
  "Donja Gračanica": {
    isTerminus: true,
    directions: { "default": { lat: 44.230133, lng: 17.906800 } }
  },
  "Gornja Zenica": {
    isTerminus: true,
    directions: { "default": { lat: 44.229040, lng: 17.885560 } }
  },
  "Blatuša": {
    isTerminus: true,
    directions: {
      // Two sides of the Blatuša terminus stop
      "prema Blatuši": { lat: 44.208865, lng: 17.911778 },
      "default":       { lat: 44.208723, lng: 17.911583 }
    }
  },
  "Lukovo Polje": {
    isTerminus: true,
    directions: { "default": { lat: 44.210560, lng: 17.925560 } }
  },
  "Banlozi": {
    isTerminus: true,
    directions: { "default": { lat: 44.210560, lng: 17.925560 } }
  },
  "Kanal": {
    isTerminus: true,
    directions: { "default": { lat: 44.21830102299925, lng: 17.9113493291695 } }
  },
  "Klopče": {
    isTerminus: true,
    directions: { "default": { lat: 44.188000, lng: 17.940000 } }
  },
  "Sviće": {
    isTerminus: true,
    directions: { "default": { lat: 44.229000, lng: 17.920000 } }
  },
  "Janjići": {
    isTerminus: true,
    directions: { "default": { lat: 44.229000, lng: 17.920000 } }
  },
  "Ričice": {
    isTerminus: true,
    directions: { "default": { lat: 44.22248260501955, lng: 17.91928010541197 } }
  }
};

/**
 * Get coordinates for a stop based on direction (direction.to value)
 * Tries exact match first, then partial match, then fallback
 */
function getStopCoordinates(stopName, direction) {
  const stop = PHYSICAL_STOPS[stopName];
  if (!stop) return null;

  if (stop.isTerminus) {
    // For terminus: try direction match first, then default
    if (direction && stop.directions[direction]) return stop.directions[direction];
    return stop.directions.default || Object.values(stop.directions)[0];
  }

  if (!direction) {
    return Object.values(stop.directions)[0];
  }

  // Exact match
  if (stop.directions[direction]) {
    return stop.directions[direction];
  }

  // Partial match — check if any key contains the direction word or vice versa
  const dirLower = direction.toLowerCase();
  for (const key in stop.directions) {
    const keyLower = key.toLowerCase();
    if (dirLower.includes(keyLower.replace('prema ', '')) || keyLower.includes(dirLower.replace('prema ', ''))) {
      return stop.directions[key];
    }
  }

  // Fallback to first available
  return Object.values(stop.directions)[0];
}

/**
 * Get all unique physical locations for a stop (for placing map markers)
 * Returns array of {lat, lng, direction} objects — one per unique coordinate
 */
function getAllStopCoordinates(stopName) {
  const stop = PHYSICAL_STOPS[stopName];
  if (!stop) return [];

  // Deduplicate by coordinate string
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

/**
 * Given a stop name and a specific lat/lng,
 * return which directions (direction.to values) use that side of the stop.
 */
function getDirectionsForStopCoord(stopName, lat, lng) {
  const stop = PHYSICAL_STOPS[stopName];
  if (!stop) return [];
  const directions = [];
  for (const [dir, coords] of Object.entries(stop.directions)) {
    if (Math.abs(coords.lat - lat) < 0.000005 && Math.abs(coords.lng - lng) < 0.000005) {
      directions.push(dir);
    }
  }
  return directions;
}
