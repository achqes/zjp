// legal.js — dodatna zaštita od kopiranja teksta na Privacy Policy / Terms / Podrška stranicama.
// CSS "user-select: none" (u legal.css) pokriva većinu slučajeva, ali ovo je rezerva za
// browsere/kontekste gdje bi npr. desni klik ("Copy") ili copy/cut komande ipak prošle.
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('cut', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());
