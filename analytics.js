// ============================================================
// Analytics sin cookies: Umami Cloud (https://umami.is)
// No usa cookies ni localStorage, así que no requiere banner de consentimiento.
// Mide: páginas vistas, visitas y páginas por visita, referrer, país, navegador,
// sistema operativo y dispositivo. No identifica personas.
//
// Website ID de Umami (cargado el 08/10/2026). Si se recrea el sitio en Umami,
// reemplazarlo acá (Settings → Websites → lucavalentini.dev).
// Solo se carga en el dominio real: localhost y previews no cuentan.
// ============================================================
(function () {
  const WEBSITE_ID = '00365882-d921-4aa7-abd2-eebc42bb58cc';
  const DOMAIN = 'lucavalentini.dev'; // dominio propio desde el 26/10/2026; github.io redirige acá

  if (WEBSITE_ID.startsWith('REEMPLAZAR') || location.hostname !== DOMAIN) return;

  const s = document.createElement('script');
  s.defer = true;
  s.src = 'https://cloud.umami.is/script.js';
  s.dataset.websiteId = WEBSITE_ID;
  s.dataset.domains = DOMAIN;
  s.dataset.doNotTrack = 'true'; // respeta "Do Not Track" del navegador
  document.head.appendChild(s);
})();
