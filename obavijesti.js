// =======================
// OBAVIJESTI DATA
// =======================
// Svaka obavijest ima title, time i colored line (lijeva traka) koji se
// mogu pojedinačno uključiti/isključiti preko showTitle / showTime / showLine.
// Boja trake se mijenja preko lineColor (hex).
const OBAVIJESTI = [
  {
    id: 2,
    title: "Promet na podsljednjim dnevnim polascima se odvija brže!",
    content: "Kako bi bio siguran da ćeš stići na svoje odredište, preporučujemo da na svoju željenu stanicu dođeš 5 do 10 minuta ranije. <br><br>Ponekad vozači zbog praznih cesta stignu ranije. Nemoj dopustiti da ti bus pobjegne!",
    timestamp: "2026-02-25T12:00:00Z",
    expiresInDays: 10000, // Notifikacija nestaje nakon 1000 dana
    lineColor: "#ffb20d",
    showTitle: true,
    showTime: false,
    showLine: true
  },
    {
    id: 1,
    title: "napokon ste tu!",
    content: "Ovo je prva verzija aplikacije kreirana s ciljem da olakša svakodnevno kretanje busevima u Zenici. <br><br>Primjetio si grešku u rasporedu ili imaš prijedlog za novu funkcionalnost? Javi se na <b>@napokonapp<b> na Instagramu.",
    timestamp: "2026-02-25T12:00:00Z",
    expiresInDays: 10000, // Notifikacija nestaje nakon 1000 dana
    lineColor: "#ffb20d",
    showTitle: true,
    showTime: false,
    showLine: true
  },
      {
    id: 3,
    title: "Android verzija je u izradi!",
    content: "Tvoji prijatelji koriste Android? Prenesi im vijest da napokon stiže ubrzo i na Google Play Store.",
    timestamp: "2026-02-25T12:00:00Z",
    expiresInDays: 10000, // Notifikacija nestaje nakon 1000 dana
    lineColor: "#ffb20d",
    showTitle: true,
    showTime: false,
    showLine: true
      },
        {
    id: 4,
    title: "Primjetio si netačan red vožnje?",
    content: "Trudimo se da sve linije i polasci budu tačni, ali ako baš red vožnje za tvoju liniju nije, slobodno nam se javi na Instagram <b>@napokonapp<b> i reci nam o kojoj liniji je riječ.",
    timestamp: "2026-02-25T12:00:00Z",
    expiresInDays: 10000, // Notifikacija nestaje nakon 1000 dana
    lineColor: "#ffb20d",
    showTitle: true,
    showTime: false,
    showLine: true
  }
];

// Funkcija za provjeru da li je notifikacija istekla
function isNotificationExpired(notification) {
  const now = new Date();
  const expiryDate = new Date(notification.timestamp);
  expiryDate.setDate(expiryDate.getDate() + notification.expiresInDays);
  return now > expiryDate;
}

// Funkcija za formatiranje vremena
function formatNotificationTime(timestamp) {
  const now = new Date();
  const notifDate = new Date(timestamp);
  const diffMs = now - notifDate;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `Prije ${diffMins} min`;
  } else if (diffHours < 24) {
    return `Prije ${diffHours} h`;
  } else if (diffDays === 1) {
    return 'Jučer';
  } else if (diffDays < 7) {
    return `Prije ${diffDays} dana`;
  } else {
    const day = notifDate.getDate();
    const month = notifDate.getMonth() + 1;
    return `${day}.${month}.`;
  }
}
