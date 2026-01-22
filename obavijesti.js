// =======================
// OBAVIJESTI DATA
// =======================

const OBAVIJESTI = [
  {
    id: 1,
    badge: "Obavijest",
    title: "JAVNI PRIJEVOZ",
    content: "Autobusni promet je redovit bez ikakvih promjena.",
    timestamp: "2026-01-22T12:00:00Z"
  }
];

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
