// =======================
// OBAVIJESTI DATA
// =======================
// Svaka obavijest ima title, time i colored line (lijeva traka) koji se
// mogu pojedinačno uključiti/isključiti preko showTitle / showTime / showLine.
// Boja trake se mijenja preko lineColor (hex).
const OBAVIJESTI = [
  {
    id: 1,
    title: "Promet na podsljednjim dnevnim polascima se odvija brže!",
    content: "Kako bi bio siguran da ćeš stići na svoje odredište, preporučujemo da na svoju željenu stanicu dođeš 5 do 10 minuta ranije. <br><br>Ponekad vozači zbog praznih cesta stignu ranije. Nemoj dopustiti da ti bus pobjegne!",
    timestamp: "2026-02-25T12:00:00Z",
    expiresInDays: 1000, // Notifikacija nestaje nakon 1000 dana
    lineColor: "#8b1616",
    showTitle: true,
    showTime: true,
    showLine: true
  },
  {
    id: 2,
    title: "Gdje mi je bus?",
    content: "Vremena polazaka na usputnim stanicama su okvirna i informativnog karaktera. Zbog stanja u prometu, bus <em>može</em> stići <strong>±3 minute</strong> u odnosu na upisani termin. <br><br><strong>Preporuka</strong>: Dođi na stanicu malo ranije kako bi tvoje putovanje bilo sigurno!",
    timestamp: "2026-02-25T08:00:00Z",
    expiresInDays: 1000,
    lineColor: "#1752aa",
    showTitle: true,
    showTime: true,
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
