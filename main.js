// ============================================================
// Luca Valentini — Portfolio (shared across all pages)
// ============================================================

// ---- Footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Nav: scrolled state, mobile toggle, active link ----
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const navToggle = document.getElementById('navToggle');
  if (navToggle) navToggle.addEventListener('click', () => nav.classList.toggle('open'));

  // active link based on current file
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  nav.querySelectorAll('.nav__links a').forEach((a) => {
    const target = (a.getAttribute('href') || '').toLowerCase();
    if (target === here || (here === '' && target === 'index.html')) {
      if (!a.classList.contains('nav__cta')) a.classList.add('active');
    }
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// ---- Media fallback: show a placeholder when the asset file is missing ----
// Images start visible; if they fail to load, mark the frame empty.
document.querySelectorAll('.media__frame img').forEach((img) => {
  const frame = img.closest('.media__frame');
  const markEmpty = () => frame.classList.add('is-empty');
  if (img.complete && img.naturalWidth === 0) markEmpty();
  img.addEventListener('error', markEmpty);
});

// Videos start as placeholder; reveal only if the file actually loads metadata.
document.querySelectorAll('.media__frame--video video').forEach((video) => {
  const frame = video.closest('.media__frame');
  frame.classList.add('is-empty');
  const reveal = () => frame.classList.remove('is-empty');
  video.addEventListener('loadeddata', reveal);
  video.addEventListener('canplay', reveal);
  video.addEventListener('error', () => frame.classList.add('is-empty'));
  // nudge the browser to check the source
  try { video.load(); } catch (e) {}
});

// ---- Scroll-reveal ----
const revealEls = document.querySelectorAll(
  '.section, .case, .projcard, .projmini, .pillar, .tl, .skillgroup, .about'
);
revealEls.forEach((el) => el.classList.add('reveal'));
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealEls.forEach((el) => io.observe(el));

// Foto de perfil del hero: si assets/me.jpg todavía no existe, ocultarla en vez de
// mostrar el ícono de imagen rota.
document.querySelectorAll('.hero__avatar').forEach((img) => {
  const hide = () => { img.hidden = true; };
  if (img.complete && img.naturalWidth === 0) hide();
  img.addEventListener('error', hide);
});
