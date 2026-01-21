// Helper funkcija za kreiranje polazaka
function createDepartures(times, stops) {
  return times.map(time => ({ time, stops }));
}

// Helper za kopiranje istih polazaka za sve dane
function sameForAllDays(departures) {
  return {
    workdays: departures,
    saturday: departures,
    sunday: departures
  };
}

const LINES = [
  {
    id: 4,
    number: "4",
    name: "Bolnica - Donja Gračanica",
    schedule: {
      workdays: true,
      saturday: true,
      sunday: true
    },
    directions: [
      {
        id: "bolnica-gracanica",
        from: "Bolnica",
        to: "Donja Gračanica",
        departures: sameForAllDays(
          createDepartures(
            ["06:10", "07:10", "08:10", "09:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:10", "22:10", "23:10"],
            [
              { name: "Bolnica", offset: 0 },
              { name: "Crkvice", offset: 2 },
              { name: "Crkvice R", offset: 3 },
              { name: "Garnizon", offset: 7 },
              { name: "Novi Most", offset: 8 },
              { name: "Džamija", offset: 10 },
              { name: "Stara Pijaca", offset: 11 },
              { name: "Hotel Metalurg", offset: 13 },
              { name: "Zenica AS", offset: 20 },
              { name: "Donja Gračanica", offset: 27 }
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
              { name: "Donja Gračanica", offset: 0 },
              { name: "Zenica AS", offset: 8 },
              { name: "Hotel Metalurg", offset: 15 },
              { name: "Stara Pijaca", offset: 16 },
              { name: "Džamija", offset: 18 },
              { name: "Novi Most", offset: 19 },
              { name: "Garnizon", offset: 21 },
              { name: "Donje Crkvice R", offset: 22 },
              { name: "Crkvice R", offset: 25 },
              { name: "Crkvice", offset: 26 },
              { name: "Bolnica", offset: 27 }
            ]
          )
        )
      }
    ]
  }
];
