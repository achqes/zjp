// =======================
// HELPER FUNKCIJE
// =======================
function createDepartures(times, stops) {
  return times.map(time => ({ time, stops }));
}

function sameForAllDays(departures) {
  return {
    workdays: departures,
    saturday: departures,
    sunday: departures
  };
}

// =======================
// ZENICA GRADSKE LINIJE
// =======================
const LINES = [
  
  // LINIJA 10: Autobusni Kolodvor - GORNJA ZENICA
  {
    id: 10,
    number: "10",
    name: "Autobusni Kolodvor - Gornja Zenica",
    schedule: { workdays: true, saturday: true, sunday: true },
    directions: [
      {
        id: "as-gornja",
        from: "Autobusni Kolodvor",
        to: "Gornja Zenica",
        departures: {
          workdays: createDepartures(
            ["06:30", "07:30", "09:30", "11:00", "12:00", "13:30", "15:30", "17:30", "19:30", "21:30", "23:30"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Stadion", offset: 3},
              {name: "Općina", offset: 6},
              {name: "Lovački dom", offset: 9},
              {name: "Mokušnice", offset: 11},
              {name: "Prodavnica", offset: 13},
              {name: "Turbe", offset: 15},
              {name: "Luke", offset: 18},
              {name: "Voljevac", offset: 21},
              {name: "Široka stijena", offset: 24},
              {name: "Urue (Dom)", offset: 27},
              {name: "Bare", offset: 29},
              {name: "Gornja Zenica", offset: 31}
            ]
          ),
          saturday: createDepartures(
            ["06:30", "07:30", "09:30", "11:00", "12:00", "13:30", "15:30", "17:30", "19:30", "21:30", "23:30"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Stadion", offset: 3},
              {name: "Općina", offset: 6},
              {name: "Lovački dom", offset: 9},
              {name: "Mokušnice", offset: 11},
              {name: "Prodavnica", offset: 13},
              {name: "Turbe", offset: 15},
              {name: "Luke", offset: 18},
              {name: "Voljevac", offset: 21},
              {name: "Široka stijena", offset: 24},
              {name: "Urue (Dom)", offset: 27},
              {name: "Bare", offset: 29},
              {name: "Gornja Zenica", offset: 31}
            ]
          ),
          sunday: createDepartures(
           ["07:30","12:00","15:30","19:30", "21:30", "23:30"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Stadion", offset: 3},
              {name: "Općina", offset: 6},
              {name: "Lovački dom", offset: 9},
              {name: "Mokušnice", offset: 11},
              {name: "Prodavnica", offset: 13},
              {name: "Turbe", offset: 15},
              {name: "Luke", offset: 18},
              {name: "Voljevac", offset: 21},
              {name: "Široka stijena", offset: 24},
              {name: "Urue (Dom)", offset: 27},
              {name: "Bare", offset: 29},
              {name: "Gornja Zenica", offset: 31}
            ]
          ),
        }
      },
      {
        id: "gornja-as",
        from: "Gornja Zenica",
        to: "Autobusni Kolodvor",
        departures: {
          workdays: createDepartures(
            ["05:50", "07:00", "08:20", "10:00", "11:30", "12:30", "14:00", "16:20", "18:00", "20:15", "22:00"],
            [
              {name: "Gornja Zenica", offset: 0},
              {name: "Bare", offset: 2},
              {name: "Urue (Dom)", offset: 4},
              {name: "Široka stijena", offset: 7},
              {name: "Voljevac", offset: 10},
              {name: "Luke", offset: 13},
              {name: "Turbe", offset: 16},
              {name: "Prodavnica", offset: 18},
              {name: "Mokušnice", offset: 20},
              {name: "Lovački dom", offset: 22},
              {name: "Općina", offset: 25},
              {name: "Stadion", offset: 28},
              {name: "Autobusni Kolodvor", offset: 31}
            ]
          ),
          saturday: createDepartures(
            ["05:50", "07:00", "08:20", "10:00", "11:30", "12:30", "14:00", "16:20", "18:00", "20:15", "22:00"],
            [
              {name: "Gornja Zenica", offset: 0},
              {name: "Bare", offset: 2},
              {name: "Urue (Dom)", offset: 4},
              {name: "Široka stijena", offset: 7},
              {name: "Voljevac", offset: 10},
              {name: "Luke", offset: 13},
              {name: "Turbe", offset: 16},
              {name: "Prodavnica", offset: 18},
              {name: "Mokušnice", offset: 20},
              {name: "Lovački dom", offset: 22},
              {name: "Općina", offset: 25},
              {name: "Stadion", offset: 28},
              {name: "Autobusni Kolodvor", offset: 31}
            ]
          ),
          sunday: createDepartures(
            ["05:50", "08:20","14:00", "18:00", "20:15", "22:00"],
            [
              {name: "Gornja Zenica", offset: 0},
              {name: "Bare", offset: 2},
              {name: "Urue (Dom)", offset: 4},
              {name: "Široka stijena", offset: 7},
              {name: "Voljevac", offset: 10},
              {name: "Luke", offset: 13},
              {name: "Turbe", offset: 16},
              {name: "Prodavnica", offset: 18},
              {name: "Mokušnice", offset: 20},
              {name: "Lovački dom", offset: 22},
              {name: "Općina", offset: 25},
              {name: "Stadion", offset: 28},
              {name: "Autobusni Kolodvor", offset: 31}
            ]
          )
        }
      }
    ]
  },



  // LINIJA 3: BLATUŠA - BOLNICA
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
        departures: sameForAllDays(
          createDepartures(
            ["05:30", "06:30", "07:30", "08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30"],
            [
              {name: "Blatuša", offset: 0},
              {name: "Autobusni Kolodvor", offset: 3},
              {name: "Stadion", offset: 5},
              {name: "Općina", offset: 8},
              {name: "Dom", offset: 11},
              {name: "Novi Most", offset: 14},
              {name: "Garnizon", offset: 16},
              {name: "Komplex", offset: 18},
              {name: "Babina R.", offset: 20},
              {name: "Bolnica", offset: 23}
            ]
          )
        )
      },
      {
        id: "bolnica-blatusa",
        from: "Bolnica",
        to: "Blatuša",
        departures: sameForAllDays(
          createDepartures(
            ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
            [
              {name: "Bolnica", offset: 0},
              {name: "Babina Rijeka", offset: 3},
              {name: "Komplex A", offset: 5},
              {name: "Garnizon", offset: 7},
              {name: "Novi Most", offset: 9},
              {name: "Dom A.BiH", offset: 12},
              {name: "Općina", offset: 15},
              {name: "Stadion", offset: 18},
              {name: "Autobusni Kolodvor", offset: 20},
              {name: "Blatuša", offset: 23}
            ]
          )
        )
      }
    ]
  },

  // LINIJA 1: BOLNICA - KANAL
  {
    id: 1,
    number: "1",
    name: "Bolnica - Kanal",
    schedule: { workdays: true, saturday: true, sunday: true },
    directions: [
      {
        id: "bolnica-kanal1",
        from: "Bolnica",
        to: "Kanal",
        departures: sameForAllDays(
          createDepartures(
            ["05:30", "06:30", "07:30", "08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:40", "21:40", "22:40"],
            [
              {name: "Bolnica", offset: 0},
              {name: "Garnizon", offset: 7},
              {name: "Novi Most", offset: 9},
              {name: "Džamija", offset: 11},
              {name: "Stara Pijaca", offset: 13},
              {name: "Hotel Metalurg", offset: 15},
              {name: "Autobusni Kolodvor", offset: 17},
              {name: "Nova Zenica", offset: 20},
              {name: "Prepodovi", offset: 22},
              {name: "Bebara", offset: 24},
              {name: "Kanal", offset: 26}
            ]
          )
        )
      },
      {
        id: "kanal1-bolnica",
        from: "Kanal",
        to: "Bolnica",
        departures: sameForAllDays(
          createDepartures(
            ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:10", "21:10", "22:10", "23:20"],
            [
              {name: "Kanal", offset: 0},
              {name: "Bebara", offset: 2},
              {name: "Prepodovi", offset: 4},
              {name: "Nova Zenica", offset: 6},
              {name: "Autobusni Kolodvor", offset: 9},
              {name: "Hotel Metalurg", offset: 11},
              {name: "Stara Pijaca", offset: 13},
              {name: "Džamija", offset: 15},
              {name: "Novi Most", offset: 17},
              {name: "Garnizon", offset: 19},
              {name: "Bolnica", offset: 26}
            ]
          )
        )
      }
    ]
  },

  // LINIJA 5: BOLNICA - JANJIĆI
  {
    id: 6,
    number: "6",
    name: "Autobusni Kolodvor - Janjići",
    schedule: { workdays: true, saturday: true, sunday: false },
    directions: [
      {
        id: "as-janjici",
        from: "Autobusni Kolodvor",
        to: "Janjići",
        departures: {
          workdays: createDepartures(
            ["05:20", "06:10", "09:00", "11:10", "12:15", "14:20", "15:30", "17:00", "18:20", "20:00", "22:00"],
            [
              {name: "Bolnica", offset: 0},
              {name: "Babina Rijeka", offset: 3},
              {name: "Komplex A", offset: 5},
              {name: "Garnizon", offset: 8},
              {name: "Novi Most", offset: 10},
              {name: "Džamija", offset: 12},
              {name: "Stara Pijaca", offset: 14},
              {name: "Hotel Metalurg", offset: 16},
              {name: "Pehare", offset: 22},
              {name: "Ričice (Bremina)", offset: 23},
              {name: "Sviće", offset: 25}
            ]
            ),
          saturday: createDepartures(
            ["05:20", "06:10", "09:00", "11:10", "12:15", "14:20", "15:30", "17:00", "18:20", "20:00", "22:00"],
            [
              {name: "Bolnica", offset: 0},
              {name: "Babina Rijeka", offset: 3},
              {name: "Komplex A", offset: 5},
              {name: "Garnizon", offset: 8},
              {name: "Novi Most", offset: 10},
              {name: "Džamija", offset: 12},
              {name: "Stara Pijaca", offset: 14},
              {name: "Hotel Metalurg", offset: 16},
              {name: "Pehare", offset: 22},
              {name: "Ričice (Bremina)", offset: 23},
              {name: "Sviće", offset: 25}
            ]
          )
      }

  },
      {
        id: "janjici-as",
        from: "Janjići",
        to: "Autobusni Kolodvor",
        departures: {
          workdays: createDepartures(
            ["05:40", "06:40", "09:40","11:50","13:00","14:55","16:00","17:40","18:55","20:30","22:35"],
            [
            {name: "Sviće", offset: 0},
              {name: "Ričice (Bremina)", offset: 2},
              {name: "Pehare", offset: 3},
              {name: "Hotel Metalurg", offset: 9},
              {name: "Stara Pijaca", offset: 11},
              {name: "Džamija", offset: 13},
              {name: "Novi Most", offset: 15},
              {name: "Garnizon", offset: 17},
              {name: "Komplex A", offset: 20},
              {name: "Babina Rijeka", offset: 22},
              {name: "Bolnica", offset: 25}
            ]
            ),
          sunday: createDepartures(
            ["05:40", "06:40", "09:40","11:50","13:00","14:55","16:00","17:40","18:55","20:30","22:35"],
            [
              {name: "Sviće", offset: 0},
              {name: "Ričice (Bremina)", offset: 2},
              {name: "Pehare", offset: 3},
              {name: "Hotel Metalurg", offset: 9},
              {name: "Stara Pijaca", offset: 11},
              {name: "Džamija", offset: 13},
              {name: "Novi Most", offset: 15},
              {name: "Garnizon", offset: 17},
              {name: "Komplex A", offset: 20},
              {name: "Babina Rijeka", offset: 22},
              {name: "Bolnica", offset: 25}
            ]
          ),
        }
      }
    ]
  },

  // LINIJA 5: BOLNICA - SVIĆE
  {
    id: 5,
    number: "5",
    name: "Bolnica - Sviće",
    schedule: { workdays: true, saturday: true, sunday: true },
    directions: [
      {
        id: "bolnica-svice",
        from: "Bolnica",
        to: "Sviće",
        departures: {
          workdays: createDepartures(
            ["05:15", "06:20", "07:20", "08:20", "09:20", "10:20", "11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "17:20", "18:20", "19:20", "21:20", "23:20"],
            [
              {name: "Bolnica", offset: 0},
              {name: "Babina Rijeka", offset: 3},
              {name: "Komplex A", offset: 5},
              {name: "Garnizon", offset: 8},
              {name: "Novi Most", offset: 10},
              {name: "Džamija", offset: 12},
              {name: "Stara Pijaca", offset: 14},
              {name: "Hotel Metalurg", offset: 16},
              {name: "Pehare", offset: 22},
              {name: "Ričice (Bremina)", offset: 23},
              {name: "Sviće", offset: 25}
            ]
            ),
          sunday: createDepartures(
            ["05:15", "07:20", "11:20", "15:20", "19:20", "21:20", "23:20"],
            [
              {name: "Bolnica", offset: 0},
              {name: "Babina Rijeka", offset: 3},
              {name: "Komplex A", offset: 5},
              {name: "Garnizon", offset: 8},
              {name: "Novi Most", offset: 10},
              {name: "Džamija", offset: 12},
              {name: "Stara Pijaca", offset: 14},
              {name: "Hotel Metalurg", offset: 16},
              {name: "Pehare", offset: 22},
              {name: "Ričice (Bremina)", offset: 23},
              {name: "Sviće", offset: 25}
            ]
          )
      }

  },
      {
        id: "svice-bolnica",
        from: "Sviće",
        to: "Bolnica",
        departures: {
          workdays: createDepartures(
            ["05:50", "06:50", "07:50", "08:50", "09:50", "10:50", "11:50", "12:50", "13:50", "14:50","15:50","16:50","17:50","18:50","19:50","21:50","23:50"],
            [
            {name: "Sviće", offset: 0},
              {name: "Ričice (Bremina)", offset: 2},
              {name: "Pehare", offset: 3},
              {name: "Hotel Metalurg", offset: 9},
              {name: "Stara Pijaca", offset: 11},
              {name: "Džamija", offset: 13},
              {name: "Novi Most", offset: 15},
              {name: "Garnizon", offset: 17},
              {name: "Komplex A", offset: 20},
              {name: "Babina Rijeka", offset: 22},
              {name: "Bolnica", offset: 25}
            ]
            ),
          sunday: createDepartures(
            ["05:50", "07:50", "11:50", "15:50", "19:50", "21:50", "23:50"],
            [
              {name: "Sviće", offset: 0},
              {name: "Ričice (Bremina)", offset: 2},
              {name: "Pehare", offset: 3},
              {name: "Hotel Metalurg", offset: 9},
              {name: "Stara Pijaca", offset: 11},
              {name: "Džamija", offset: 13},
              {name: "Novi Most", offset: 15},
              {name: "Garnizon", offset: 17},
              {name: "Komplex A", offset: 20},
              {name: "Babina Rijeka", offset: 22},
              {name: "Bolnica", offset: 25}
            ]
          ),
        }
      }
    ]
  },

  // LINIJA 2: KANAL - BOLNICA
  {
    id: 2,
    number: "2",
    name: "Kanal - Bolnica",
    schedule: { workdays: true, saturday: true, sunday: false },
    directions: [
      {
        id: "kanal-bolnica",
        from: "Kanal",
        to: "Bolnica",
        departures: {
          workdays: createDepartures(
            ["05:30", "06:20", "07:20", "08:20", "09:20", "10:20", "11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "17:20"],
            [
              {name: "Kanal", offset: 0},
              {name: "Nova Zenica", offset: 6},
              {name: "Autobusni Kolodvor", offset: 9},
              {name: "Hotel Metalurg", offset: 11},
              {name: "Stara Pijaca", offset: 13},
              {name: "Džamija", offset: 15},
              {name: "Garnizon", offset: 18},
              {name: "Crkvice R", offset: 22},
              {name: "Bolnica", offset: 25}
            ]
          ),
          saturday: createDepartures(
            ["05:30", "06:20", "07:20", "08:20", "09:20", "10:20", "11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "17:20"],
            [
              {name: "Kanal", offset: 0},
              {name: "Nova Zenica", offset: 6},
              {name: "Autobusni Kolodvor", offset: 9},
              {name: "Hotel Metalurg", offset: 11},
              {name: "Stara Pijaca", offset: 13},
              {name: "Džamija", offset: 15},
              {name: "Garnizon", offset: 18},
              {name: "Crkvice R", offset: 22},
              {name: "Bolnica", offset: 25}
            ]
          ),
          sunday: []
        }
      },
      {
        id: "kanal2-bolnica",
        from: "Bolnica",
        to: "Kanal",
        departures: {
          workdays: createDepartures(
            ["05:50", "06:50", "07:50", "08:50", "09:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50"],
            [
              {name: "Bolnica", offset: 0},
              {name: "Crkvice R", offset: 3},
              {name: "Garnizon", offset: 7},
              {name: "Džamija", offset: 10},
              {name: "Stara Pijaca", offset: 12},
              {name: "Hotel Metalurg", offset: 14},
              {name: "Autobusni Kolodvor", offset: 16},
              {name: "Nova Zenica", offset: 19},
              {name: "Kanal", offset: 25}
            ]
          ),
          saturday: createDepartures(
            ["05:50", "06:50", "07:50", "08:50", "09:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50"],
            [
              {name: "Bolnica", offset: 0},
              {name: "Crkvice R", offset: 3},
              {name: "Garnizon", offset: 7},
              {name: "Džamija", offset: 10},
              {name: "Stara Pijaca", offset: 12},
              {name: "Hotel Metalurg", offset: 14},
              {name: "Autobusni Kolodvor", offset: 16},
              {name: "Nova Zenica", offset: 19},
              {name: "Kanal", offset: 25}
            ]
          ),
          sunday: []
        }
      }
    ]
  },

  // LINIJA 5: RIČICE - BOLNICA
  {
    id: 11,
    number: "11",
    name: "Ričice - Bolnica",
    schedule: { workdays: true, saturday: false, sunday: false },
    directions: [
      {
        id: "ricice-bolnica",
        from: "Ričice",
        to: "Bolnica",
        departures: {
          workdays: createDepartures(
            ["06:30", "07:30", "08:30", "09:30", "10:30", "11:30", "13:30", "14:30", "15:30"],
            [
              {name: "Ričice (Bremina)", offset: 0},
              {name: "Pehare", offset: 3},
              {name: "Hotel Metalurg", offset: 9},
              {name: "Stara Pijaca", offset: 11},
              {name: "Džamija", offset: 13},
              {name: "Novi Most", offset: 15},
              {name: "Garnizon", offset: 17},
              {name: "Komplex A", offset: 20},
              {name: "Babina Rijeka", offset: 22},
              {name: "Bolnica", offset: 25}
            ]
          ),
          saturday: [],
          sunday: []
        }
      },
      {
        id: "bolnica-ricice",
        from: "Bolnica",
        to: "Ričice",
        departures: {
          workdays: createDepartures(
            ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"],
            [
              {name: "Bolnica", offset: 0},
              {name: "Babina Rijeka", offset: 3},
              {name: "Komplex A", offset: 5},
              {name: "Garnizon", offset: 8},
              {name: "Novi Most", offset: 10},
              {name: "Džamija", offset: 12},
              {name: "Stara Pijaca", offset: 14},
              {name: "Hotel Metalurg", offset: 16},
              {name: "Pehare", offset: 22},
              {name: "Ričice (Bremina)", offset: 25}
            ]
          ),
          saturday: [],
          sunday: []
        }
      }
    ]
  },

 // LINIJA 7: Autobusni Kolodvor - KLOPČE NOVO
  {
    id: 7,
    number: "7",
    name: "Autobusni Kolodvor - Klopče",
    schedule: { workdays: true, saturday: true, sunday: true },
    directions: [
      {
        id: "as-klopče",
        from: "Autobusni Kolodvor",
        to: "Klopče",
        departures: {
          workdays: createDepartures(
            ["05:20", "06:05","06:45","07:40", "09:30", "11:10", "12:30", "13:25", "14:30", "15:30", "16:25", "17:40", "18:40", "19:40", "21:40","23:40"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Hotel Metalurg", offset: 3},
              {name: "Stara Pijaca", offset: 5},
              {name: "Džamija", offset: 7},
              {name: "Garnizon", offset: 10},
              {name: "Vodorad", offset: 12},
              {name: "Radakovo", offset: 14},
              {name: "Klopče B", offset: 16},
              {name: "Klopče", offset: 21}
            ]
          ),
          saturday: createDepartures(
            ["05:20", "06:05","07:40", "09:30", "11:10", "12:30", "13:25", "15:30", "17:40", "19:40", "21:30","23:40"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Hotel Metalurg", offset: 3},
              {name: "Stara Pijaca", offset: 5},
              {name: "Džamija", offset: 7},
              {name: "Garnizon", offset: 10},
              {name: "Vodorad", offset: 12},
              {name: "Radakovo", offset: 14},
              {name: "Klopče B", offset: 16},
              {name: "Klopče", offset: 21}
            ]
          ),
          sunday: createDepartures(
            ["05:20", "06:05","07:40", "09:30", "11:10", "12:30", "13:25", "15:30", "17:40", "19:40", "21:30","23:40"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Hotel Metalurg", offset: 3},
              {name: "Stara Pijaca", offset: 5},
              {name: "Džamija", offset: 7},
              {name: "Garnizon", offset: 10},
              {name: "Vodorad", offset: 12},
              {name: "Radakovo", offset: 14},
              {name: "Klopče B", offset: 16},
              {name: "Klopče", offset: 21}
            ]
          )
        }
      },
      {
        id: "klopce-as",
        from: "Klopče",
        to: "Autobusni Kolodvor",
        departures: {
          workdays: createDepartures(
            ["05:45", "06:25", "07:05", "08:20","10:00","11:40","13:00", "13:50", "15:00", "15:50", "16:50", "18:05", "19:05", "20:05","21:55","00:05"],
            [
              {name: "Klopče", offset: 0},
              {name: "Klopče B", offset: 5},
              {name: "Radakovo", offset: 7},
              {name: "Vodorad", offset: 9},
              {name: "Garnizon", offset: 11},
              {name: "Džamija", offset: 14},
              {name: "Stara Pijaca", offset: 16},
              {name: "Hotel Metalurg", offset: 18},
              {name: "Autobusni Kolodvor", offset: 21}
            ]
          ),
          saturday: createDepartures(
            ["05:45", "06:25", "08:20","10:00","11:40","13:00", "13:50","15:50","18:05","20:05","21:55","00:05"],
            [
              {name: "Klopče", offset: 0},
              {name: "Klopče B", offset: 5},
              {name: "Radakovo", offset: 7},
              {name: "Vodorad", offset: 9},
              {name: "Garnizon", offset: 11},
              {name: "Džamija", offset: 14},
              {name: "Stara Pijaca", offset: 16},
              {name: "Hotel Metalurg", offset: 18},
              {name: "Autobusni Kolodvor", offset: 21}
            ]
          ),
          sunday: createDepartures(
            ["05:45", "06:25", "08:20","10:00","11:40","13:00", "13:50","15:50","18:05","20:05","21:55","00:05"],
            [
              {name: "Klopče", offset: 0},
              {name: "Klopče B", offset: 5},
              {name: "Radakovo", offset: 7},
              {name: "Vodorad", offset: 9},
              {name: "Garnizon", offset: 11},
              {name: "Džamija", offset: 14},
              {name: "Stara Pijaca", offset: 16},
              {name: "Hotel Metalurg", offset: 18},
              {name: "Autobusni Kolodvor", offset: 21}
            ]
          )
        }
      }
    ]
  },

  // LINIJA 7: Autobusni Kolodvor - LUKOVO POLJE
  {
    id: 8,
    number: "8",
    name: "Autobusni Kolodvor - Lukovo Polje",
    schedule: { workdays: true, saturday: true, sunday: true},
    directions: [
      {
        id: "as-lukovo",
        from: "Autobusni Kolodvor",
        to: "Lukovo Polje",
        departures: {
          workdays: createDepartures(
            ["05:45", "06:30", "07:10", "09:00", "10:10", "11:00", "12:40", "13:40", "15:30", "16:10", "17:00", "18:40", "19:40", "21:40"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Hotel Metalurg", offset: 2},
              {name: "Stara Pijaca", offset: 4},
              {name: "Džamija", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Garnizon", offset: 10},
              {name: "Otpad", offset: 12},
              {name: "DC ZPP", offset: 13},
              {name: "Babina 2", offset: 14},
              {name: "Lukovo Polje", offset: 16}
            ]
          ).concat([
            {time: "11:50", stops: [{name: "Autobusni Kolodvor", offset: 0}, {name: "Hotel Metalurg", offset: 2}, {name: "Stara Pijaca", offset: 4}, {name: "Džamija", offset: 6}, {name: "Novi Most", offset: 8}, {name: "Garnizon", offset: 10}, {name: "Otpad", offset: 12}, {name: "DC ZPP", offset: 13}, {name: "Babina 2", offset: 14}, {name: "Lukovo Polje", offset: 16}], schoolOnly: true}
          ]),
          saturday: createDepartures(
            ["05:45", "06:30", "07:10", "09:00", "10:10", "11:00", "12:40", "13:40", "15:30", "16:10", "17:00", "18:40", "19:40", "21:40"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Hotel Metalurg", offset: 2},
              {name: "Stara Pijaca", offset: 4},
              {name: "Džamija", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Garnizon", offset: 10},
              {name: "Otpad", offset: 12},
              {name: "DC ZPP", offset: 13},
              {name: "Babina 2", offset: 14},
              {name: "Lukovo Polje", offset: 16}
            ]
          ),
          sunday: createDepartures(
            ["05:45", "07:10", "09:00", "11:00", "12:40", "13:40", "15:30", "18:40","19:40","21:40"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Hotel Metalurg", offset: 2},
              {name: "Stara Pijaca", offset: 4},
              {name: "Džamija", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Garnizon", offset: 10},
              {name: "Otpad", offset: 12},
              {name: "DC ZPP", offset: 13},
              {name: "Babina 2", offset: 14},
              {name: "Lukovo Polje", offset: 16}
            ]
          )
        }
      },
      {
        id: "lukovo-as",
        from: "Lukovo Polje",
        to: "Autobusni Kolodvor",
        departures: {
          workdays: createDepartures(
            ["06:05", "06:50", "07:30", "09:20", "10:30", "11:20", "12:10", "13:00", "14:00", "15:30", "16:30", "17:20", "19:00", "20:00", "22:00"],
            [
              {name: "Lukovo Polje", offset: 0},
              {name: "Babina 2", offset: 2},
              {name: "DC ZPP", offset: 3},
              {name: "Otpad", offset: 4},
              {name: "Garnizon", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Džamija", offset: 10},
              {name: "Stara Pijaca", offset: 12},
              {name: "Hotel Metalurg", offset: 14},
              {name: "Autobusni Kolodvor", offset: 16}
            ]
          ),
          saturday: createDepartures(
            ["06:05", "06:50", "07:30", "09:20", "10:30", "11:20", "12:10", "13:00", "14:00", "15:30", "16:30", "17:20", "19:00", "20:00", "22:00"],
            [
              {name: "Lukovo Polje", offset: 0},
              {name: "Babina 2", offset: 2},
              {name: "DC ZPP", offset: 3},
              {name: "Otpad", offset: 4},
              {name: "Garnizon", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Džamija", offset: 10},
              {name: "Stara Pijaca", offset: 12},
              {name: "Hotel Metalurg", offset: 14},
              {name: "Autobusni Kolodvor", offset: 16}
            ]
          ),
          sunday: createDepartures(
            ["06:05","7:30","09:20","11:20","13:00","14:00","15:50","19:00","20:00","22:00"],
            [
              {name: "Lukovo Polje", offset: 0},
              {name: "Babina 2", offset: 2},
              {name: "DC ZPP", offset: 3},
              {name: "Otpad", offset: 4},
              {name: "Garnizon", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Džamija", offset: 10},
              {name: "Stara Pijaca", offset: 12},
              {name: "Hotel Metalurg", offset: 14},
              {name: "Autobusni Kolodvor", offset: 16}
            ]
          )
        }
      }
    ]
  },

  // LINIJA 7: Autobusni Kolodvor - Banlozi
  {
    id: 9,
    number: "9",
    name: "Autobusni Kolodvor - Banlozi",
    schedule: { workdays: true, saturday: true, sunday: true },
    directions: [
      {
        id: "as-banlozi",
        from: "Autobusni Kolodvor",
        to: "Banlozi",
        departures: {
          workdays: createDepartures(
            ["05:20","06:20","07:30","09:00","11:10","12:20","13:40","15:40","17:30","18:30","19:30","22:00","23:30"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Hotel Metalurg", offset: 2},
              {name: "Stara Pijaca", offset: 4},
              {name: "Džamija", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Garnizon", offset: 10},
              {name: "Otpad", offset: 12},
              {name: "DC ZPP", offset: 13},
              {name: "Babina 2", offset: 14},
              {name: "Lukovo Polje", offset: 16}
            ]
          ),
          saturday: createDepartures(
            ["05:45", "06:30", "07:10", "09:00", "10:10", "11:00", "12:40", "13:40", "15:30", "16:10", "17:00", "18:40", "19:40", "21:40"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Hotel Metalurg", offset: 2},
              {name: "Stara Pijaca", offset: 4},
              {name: "Džamija", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Garnizon", offset: 10},
              {name: "Otpad", offset: 12},
              {name: "DC ZPP", offset: 13},
              {name: "Babina 2", offset: 14},
              {name: "Lukovo Polje", offset: 16}
            ]
          ),
          sunday: createDepartures(
            ["05:20", "07:30", "09:00", "11:10", "13:40", "15:40", "17:30", "19:30","22:00","23:30"],
            [
              {name: "Autobusni Kolodvor", offset: 0},
              {name: "Hotel Metalurg", offset: 2},
              {name: "Stara Pijaca", offset: 4},
              {name: "Džamija", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Garnizon", offset: 10},
              {name: "Otpad", offset: 12},
              {name: "DC ZPP", offset: 13},
              {name: "Babina 2", offset: 14},
              {name: "Lukovo Polje", offset: 16}
            ]
          )
        }
      },
      {
        id: "banlozi-as",
        from: "Banlozi",
        to: "Autobusni Kolodvor",
        departures: {
          workdays: createDepartures(
            ["05:45", "06:50", "08:00", "09:45", "11:40", "12:55", "14:10", "16:10", "18:00", "19:30", "20:00", "22:30", "00:05"],
            [
              {name: "Lukovo Polje", offset: 0},
              {name: "Babina 2", offset: 2},
              {name: "DC ZPP", offset: 3},
              {name: "Otpad", offset: 4},
              {name: "Garnizon", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Džamija", offset: 10},
              {name: "Stara Pijaca", offset: 12},
              {name: "Hotel Metalurg", offset: 14},
              {name: "Autobusni Kolodvor", offset: 16}
            ]
          ),
          saturday: createDepartures(
            ["05:45", "06:50", "08:00", "09:45", "11:40", "12:55", "14:10", "16:10", "18:00", "19:30", "20:00", "22:30", "00:05"],
            [
              {name: "Lukovo Polje", offset: 0},
              {name: "Babina 2", offset: 2},
              {name: "DC ZPP", offset: 3},
              {name: "Otpad", offset: 4},
              {name: "Garnizon", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Džamija", offset: 10},
              {name: "Stara Pijaca", offset: 12},
              {name: "Hotel Metalurg", offset: 14},
              {name: "Autobusni Kolodvor", offset: 16}
            ]
          ),
          sunday: createDepartures(
            ["05:45","08:00","09:45","11:40","14:10","16:10","18:00","20:00","22:30","00:05"],
            [
              {name: "Lukovo Polje", offset: 0},
              {name: "Babina 2", offset: 2},
              {name: "DC ZPP", offset: 3},
              {name: "Otpad", offset: 4},
              {name: "Garnizon", offset: 6},
              {name: "Novi Most", offset: 8},
              {name: "Džamija", offset: 10},
              {name: "Stara Pijaca", offset: 12},
              {name: "Hotel Metalurg", offset: 14},
              {name: "Autobusni Kolodvor", offset: 16}
            ]
          )
        }
      }
    ]
  },

  // LINIJA 4: BOLNICA - DONJA GRAČANICA
  {
    id: 4,
    number: "4",
    name: "Bolnica - Donja Gračanica",
    schedule: { workdays: true, saturday: true, sunday: true },
    directions: [
      {
        id: "bolnica-gracanica",
        from: "Bolnica",
        to: "Donja Gračanica",
        departures: sameForAllDays(
          createDepartures(
            ["06:10", "07:10", "08:10", "09:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:10", "22:10", "23:10"],
            [
              {name: "Bolnica", offset: 0},
              {name: "Crkvice", offset: 2},
              {name: "Crkvice R", offset: 3},
              {name: "Garnizon", offset: 7},
              {name: "Novi Most", offset: 8},
              {name: "Džamija", offset: 10},
              {name: "Stara Pijaca", offset: 11},
              {name: "Hotel Metalurg", offset: 13},
              {name: "Autobusni Kolodvor", offset: 16},
              {name: "Ul. Prof. Juraja Neidhardta", offset: 19},
              {name: "Donja Gračanica", offset: 25}
            ]
          )
        )
      },
      {
        id: "gracanica-bolnica",
        from: "Donja Gračanica",
        to: "Bolnica",
        departures: sameForAllDays(
          createDepartures(
            ["06:40", "07:40", "08:40", "09:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "20:40", "21:40", "22:40", "23:40"],
            [
              {name: "Donja Gračanica", offset: 0},
              {name: "Kaktus", offset: 6},
              {name: "Autobusni Kolodvor", offset: 9},
              {name: "Hotel Metalurg", offset: 12},
              {name: "Stara Pijaca", offset: 13},
              {name: "Džamija", offset: 15},
              {name: "Novi Most", offset: 16},
              {name: "Garnizon", offset: 18},
              {name: "Donje Crkvice R", offset: 22},
              {name: "Crkvice R", offset: 23},
              {name: "Crkvice", offset: 24},
              {name: "Bolnica", offset: 25}
            ]
          )
        )
      }
    ]
  }
];
