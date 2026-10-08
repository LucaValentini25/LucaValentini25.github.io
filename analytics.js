// ============================================================
// Analytics sin cookies: Umami Cloud (https://umami.is)
// No usa cookies ni localStorage, así que no requiere banner de consentimiento.
// Mide: páginas vistas, visitas y páginas por visita, referrer, país, navegador,
// sistema operativo y dispositivo. No identifica personas.
//
// COMPLETAR: pegar acá el Website ID que da Umami al crear el sitio
// (Settings → Websites → Add website → dominio lucavalentini25.github.io).
// Mientras diga REEMPLAZAR, no se carga nada ni se contacta a Umami.
// ============================================================
(function () {
  const WEBSITE_ID = 'REEMPLAZAR-UMAMI-WEBSITE-ID';
  const DOMAIN = 'lucavalentini25.github.io'; // no cuenta visitas en localhost ni en previews

  if (WEBSITE_ID.startsWith('REEMPLAZAR') || location.hostname !== DOMAIN) return;

  const s = document.createElement('script');
  s.defer = true;
  s.src = 'https://cloud.umami.is/script.js';
  s.dataset.websiteId = WEBSITE_ID;
  s.dataset.domains = DOMAIN;
  s.dataset.doNotTrack = 'true'; // respeta "Do Not Track" del navegador
  document.head.appendChild(s);
})();
