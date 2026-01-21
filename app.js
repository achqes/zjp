// =======================
// GLOBAL STATE
// =======================
let currentLine = null;
let currentDirection = null;
let selectedDate = new Date();

// =======================
// SWIPE TO BACK (iOS Style)
// =======================
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => { 
  touchStartX = e.touches[0].clientX; 
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', e => {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  const deltaX = touchEndX - touchStartX;
  const deltaY = Math.abs(touchEndY - touchStartY);
  
  // Swipe s lijeve ivice udesno (minimum 100px), ali samo ako nije vertikalni scroll
  if (touchStartX < 60 && deltaX > 100 && deltaY < 50) {
    const activeScreen = localStorage.getItem('currentScreen');
    if (activeScreen === 'screen-trip') {
      document.getElementById('back-to-line-detail').click();
    } else if (activeScreen === 'screen-line-detail') {
      document.getElementById('back-to-lines').click();
    }
  }
});

// =======================
// GET DAY TYPE
// =======================
function getDayType(date) {
  const day = date.getDay();
  if (day === 0) return 'sunday';
  if (day === 6) return 'saturday';
  return 'workdays';
}

// =======================
// GET DEPARTURES FOR DATE
// =======================
function getDeparturesForDate(direction, date) {
  const dayType = getDayType(date);
  
  const schedule = currentLine.schedule;
  if (dayType === 'sunday' && !schedule.sunday) return [];
  if (dayType === 'saturday' && !schedule.saturday) return [];
  if (dayType === 'workdays' && !schedule.workdays) return [];
  
  return direction.departures[dayType] || [];
}

// =======================
// UPDATE HEADER
// =======================
function updateHeader(screen) {
  const headerTitle = document.getElementById('header-title');
  const headerSubtitle = document.getElementById('header-subtitle');
  const searchBar = document.getElementById('search-bar');
  const calendarStrip = document.getElementById('calendar-strip');
  const directionsHeader = document.getElementById('directions-tabs-header');
  const mainHeader = document.getElementById('main-header');
  
  if (screen === 'screen-lines') {
    mainHeader.classList.remove('hidden');
    headerTitle.textContent = 'Timetable';
    headerTitle.classList.remove('hidden');
    headerSubtitle.classList.add('hidden');
    searchBar.classList.remove('hidden');
    calendarStrip.classList.add('hidden');
    directionsHeader.classList.add('hidden');
  } else if (screen === 'screen-line-detail') {
    mainHeader.classList.remove('hidden');
    headerTitle.textContent = 'Route departures';
    headerTitle.classList.remove('hidden');
    
    headerSubtitle.textContent = currentLine.number;
    headerSubtitle.classList.remove('hidden');
    
    searchBar.classList.add('hidden');
    calendarStrip.classList.remove('hidden');
    directionsHeader.classList.remove('hidden');
  } else if (screen === 'screen-trip') {
    mainHeader.classList.add('hidden');
    headerTitle.classList.add('hidden');
    headerSubtitle.classList.add('hidden');
    searchBar.classList.add('hidden');
    calendarStrip.classList.add('hidden');
    directionsHeader.classList.add('hidden');
  } else {
    mainHeader.classList.remove('hidden');
    searchBar.classList.add('hidden');
    calendarStrip.classList.add('hidden');
    directionsHeader.classList.add('hidden');
    headerSubtitle.classList.add('hidden');
  }
}

// =======================
// SHOW SCREEN
// =======================
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(div => {
    div.classList.remove("active");
  });
  
  document.getElementById(id).classList.add("active");
  localStorage.setItem('currentScreen', id);
  
  const backToLines = document.getElementById('back-to-lines');
  const backToDetail = document.getElementById('back-to-line-detail');
  const tripHeader = document.getElementById('trip-header-container');
  
  backToLines.classList.add('hidden');
  backToDetail.classList.add('hidden');
  
  if (id === 'screen-line-detail') {
    backToLines.classList.remove('hidden');
  } else if (id === 'screen-trip') {
    backToDetail.classList.remove('hidden');
    tripHeader.style.display = 'block';
  } else {
    tripHeader.style.display = 'none';
  }
  
  updateHeader(id);
}

// =======================
// RENDER LINES
// =======================
function renderLines() {
  const container = document.getElementById("lines-list");
  container.innerHTML = '<h3 class="section-title">Gradske linije</h3>';

  LINES.forEach((line) => {
    const item = document.createElement("div");
    item.className = "line-item";
    item.onclick = () => openLineDetail(line.id);
    item.innerHTML = `
      <div class="line-number">${line.number}</div>
      <span>${line.name}</span>
    `;
    container.appendChild(item);
  });
}

// =======================
// RENDER CALENDAR
// =======================
function renderCalendar() {
  const container = document.getElementById("calendar-strip");
  container.innerHTML = '';
  
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day";
    if (date.toDateString() === selectedDate.toDateString()) {
      dayDiv.classList.add('active');
    }
    
    dayDiv.innerHTML = `
      <div class="calendar-day-number">${date.getDate()}</div>
      <div class="calendar-day-name">${days[date.getDay()]}</div>
    `;
    
    dayDiv.onclick = () => {
      selectedDate = new Date(date);
      renderCalendar();
      renderDepartures();
      // AUTO SCROLL NA VRH KOD PROMJENE DATUMA
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    container.appendChild(dayDiv);
  }
}

// =======================
// OPEN LINE DETAIL
// =======================
function openLineDetail(lineId) {
  currentLine = LINES.find(l => l.id == lineId);
  
  if (!currentLine) {
    console.error('Line not found:', lineId);
    return;
  }
  
  currentDirection = currentLine.directions[0];

  localStorage.setItem('currentLineId', lineId);
  localStorage.setItem('currentDirectionId', currentDirection.id);

  renderCalendar();
  renderDirectionTabsHeader();
  renderDepartures();

  showScreen("screen-line-detail");
}

// =======================
// RENDER DIRECTION TABS HEADER
// =======================
function renderDirectionTabsHeader() {
  const tabs = document.getElementById("directions-tabs-header");
  
  if (!tabs) {
    console.error('directions-tabs-header element not found');
    return;
  }
  
  tabs.innerHTML = "";

  const dir = currentDirection;
  
  const tab = document.createElement("div");
  tab.className = "direction-tab-header";
  
  tab.innerHTML = `
    <div class="direction-icon-header">↕</div>
    <div class="direction-text-header">
      <span class="from-text-header">From ${dir.from}</span>
      <span>→</span>
      <span class="to-text-header">To ${dir.to}</span>
    </div>
  `;
  
  tab.onclick = () => {
    const currentIndex = currentLine.directions.findIndex(d => d.id === currentDirection.id);
    const nextIndex = (currentIndex + 1) % currentLine.directions.length;
    currentDirection = currentLine.directions[nextIndex];
    
    localStorage.setItem('currentDirectionId', currentDirection.id);
    
    renderDirectionTabsHeader();
    renderDepartures();
  };
  
  tabs.appendChild(tab);
}

// =======================
// CALCULATE ARRIVAL TIME
// =======================
function calculateArrivalTime(startTime, duration) {
  const [h, m] = startTime.split(':').map(Number);
  const totalMinutes = h * 60 + m + duration;
  const endH = Math.floor(totalMinutes / 60) % 24;
  const endM = totalMinutes % 60;
  return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
}

// =======================
// GET DEPARTURE STATUS
// =======================
function getDepartureStatus(startTime, endTime) {
  const now = new Date();
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;
  
  if (currentMinutes < startMinutes) return 'future';
  if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) return 'active';
  return 'past';
}

// =======================
// RENDER DEPARTURES
// =======================
function renderDepartures() {
  const list = document.getElementById("departures-list");
  list.innerHTML = "";

  const departures = getDeparturesForDate(currentDirection, selectedDate);
  
  if (departures.length === 0) {
    list.innerHTML = '<p style="text-align:center; padding:40px; color:#8E8E93;">Nema polazaka ovog dana</p>';
    return;
  }

  const firstDeparture = departures[0];
  const totalDuration = firstDeparture.stops[firstDeparture.stops.length - 1].offset;

  departures.forEach(departure => {
    const startTime = departure.time;
    const endTime = calculateArrivalTime(startTime, totalDuration);
    
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    const status = isToday ? getDepartureStatus(startTime, endTime) : 'future';
    
    const card = document.createElement("div");
    card.className = `departure-card ${status}`;
    
    card.innerHTML = `
      <span class="departure-time-start">${startTime}</span>
      <span class="departure-separator"></span>
      <span class="departure-time-end">${endTime}</span>
    `;
    
    card.onclick = () => openTrip(departure);
    list.appendChild(card);
  });
}

// =======================
// OPEN TRIP
// =======================
function openTrip(departure) {
  localStorage.setItem('currentDepartureTime', departure.time);

  document.getElementById('trip-header-line').textContent = `${currentLine.number} - ${currentLine.name}`;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tripDate = new Date(selectedDate);
  tripDate.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((tripDate - today) / (1000 * 60 * 60 * 24));
  
  let dateText = 'Today';
  if (diffDays === 1) {
    dateText = 'Tomorrow';
  } else if (diffDays > 1) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    dateText = `${days[tripDate.getDay()]}, ${tripDate.getDate()} ${months[tripDate.getMonth()]}`;
  }
  
  document.getElementById('trip-date').textContent = dateText;

  const list = document.getElementById("stops-list");
  
  function updateStops() {
    list.innerHTML = "";

    const [depH, depM] = departure.time.split(":").map(Number);
    const departureDate = new Date(selectedDate);
    departureDate.setHours(depH, depM, 0, 0);

    const now = new Date();
    const diffMinutes = (now - departureDate) / (1000 * 60);

    // Pronađi TRENUTNU stanicu gdje je bus
    let currentStopIndex = -1;
    for (let i = 0; i < departure.stops.length; i++) {
      if (diffMinutes < departure.stops[i].offset) {
        currentStopIndex = i - 1;
        break;
      }
    }
    
    if (currentStopIndex === -1) {
      currentStopIndex = departure.stops.length - 1;
    }
    
    if (diffMinutes < 0) {
      currentStopIndex = 0;
    }

    departure.stops.forEach((stop, index) => {
      const arrivalMinutes = stop.offset;
      const timeLeft = arrivalMinutes - diffMinutes;

      const row = document.createElement("div");
      
      let iconClass = '';
      let statusClass = '';
      let rowClass = 'stop-row';
      
      if (index < currentStopIndex) {
        iconClass = 'passed';
        statusClass = 'gray';
        rowClass += ' passed';
      } else if (index === currentStopIndex) {
        iconClass = 'active';
        statusClass = 'green';
        rowClass += ' active';
      } else {
        iconClass = 'future';
        rowClass += ' future';
      }

      row.className = rowClass;

      const arrivalDate = new Date(departureDate.getTime() + arrivalMinutes * 60000);
      const arrivalTime = `${String(arrivalDate.getHours()).padStart(2, '0')}:${String(arrivalDate.getMinutes()).padStart(2, '0')}`;

      // Bus ikona SAMO na trenutnoj stanici
      const busIcon = (index === currentStopIndex) 
        ? '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>'
        : '';

      let timeDisplay = arrivalTime;
      const isToday = selectedDate.toDateString() === new Date().toDateString();
      
      // BOLD MINUTES - samo za buduce stanice danas
      if (isToday && timeLeft > 0 && timeLeft <= 10 && index >= currentStopIndex) {
        const mins = Math.round(timeLeft);
        timeDisplay = `<span class="time-number" style="font-weight: 800;">${mins}</span> <span class="time-unit">min</span>`;
      }

      row.innerHTML = `
        <div class="stop-icon ${iconClass}">
          ${busIcon}
        </div>
        <div class="stop-content ${statusClass}">
          <span class="stop-name">${stop.name}</span>
          <span class="stop-time">${timeDisplay}</span>
        </div>
      `;

      list.appendChild(row);
    });
  }

  updateStops();
  showScreen("screen-trip");

  if (window.tripInterval) clearInterval(window.tripInterval);
  window.tripInterval = setInterval(updateStops, 30000);
}

// =======================
// BACK BUTTONS
// =======================
document.getElementById("back-to-lines").onclick = () => {
  localStorage.removeItem('currentScreen');
  localStorage.removeItem('currentLineId');
  localStorage.removeItem('currentDirectionId');
  localStorage.removeItem('currentDepartureTime');
  showScreen("screen-lines");
};

document.getElementById("back-to-line-detail").onclick = () => {
  if (window.tripInterval) clearInterval(window.tripInterval);
  localStorage.removeItem('currentDepartureTime');
  showScreen("screen-line-detail");
};

// =======================
// SEARCH
// =======================
document.getElementById("search-input").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const items = document.querySelectorAll(".line-item");
  
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? "flex" : "none";
  });
});

// =======================
// RESTORE STATE
// =======================
function restoreState() {
  const savedScreen = localStorage.getItem('currentScreen');
  const savedLineId = localStorage.getItem('currentLineId');
  const savedDirectionId = localStorage.getItem('currentDirectionId');
  const savedDepartureTime = localStorage.getItem('currentDepartureTime');

  if (savedScreen && savedLineId) {
    currentLine = LINES.find(l => l.id == savedLineId);
    
    if (currentLine) {
      currentDirection = currentLine.directions.find(d => d.id === savedDirectionId) || currentLine.directions[0];
      
      if (savedScreen === 'screen-line-detail') {
        renderCalendar();
        renderDirectionTabsHeader();
        renderDepartures();
        showScreen('screen-line-detail');
      } else if (savedScreen === 'screen-trip' && savedDepartureTime) {
        const dayType = getDayType(selectedDate);
        const departures = currentDirection.departures[dayType] || [];
        const departure = departures.find(d => d.time === savedDepartureTime);
        if (departure) {
          openTrip(departure);
        } else {
          showScreen('screen-lines');
        }
      } else {
        showScreen('screen-lines');
      }
    } else {
      showScreen('screen-lines');
    }
  } else {
    showScreen('screen-lines');
  }
}

// =======================
// INITIALIZATION
// =======================
renderLines();
restoreState();
