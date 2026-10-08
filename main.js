// ============================================================
// Luca Valentini · Portfolio (compartido por todas las páginas)
// Sin dependencias. El sitio funciona sin JS: esto solo mejora.
// No usa cookies, localStorage ni sessionStorage.
// ============================================================

// ---- Año del footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Link activo en la navegación (barra superior y archivos)
const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
document.querySelectorAll('.nav__links a, .files a').forEach((a) => {
  if ((a.getAttribute('href') || '').toLowerCase() === here) {
    a.classList.add('active');
    a.setAttribute('aria-current', 'page');
  }
});

// ---- YouTube con carga diferida (facade)
// Antes del click solo hay una miniatura alojada en el sitio: no se contacta a
// YouTube ni a Google. Al hacer click se crea el iframe de youtube-nocookie.com.
document.querySelectorAll('a.yt[data-yt]').forEach((link) => {
  link.addEventListener('click', (e) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey) return; // abrir en pestaña nueva sigue funcionando
    e.preventDefault();
    const id = link.dataset.yt;
    const box = document.createElement('div');
    box.className = 'yt';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    iframe.title = link.dataset.title || 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    box.appendChild(iframe);
    link.replaceWith(box);
    iframe.focus();
  });
});

// ---- Imágenes ampliables (lightbox con <dialog> nativo)
// Sin JS, el link abre la imagen sola. Con JS se abre encima de la página;
// Esc, el botón o un click en el fondo la cierran y el foco vuelve al link.
const zooms = document.querySelectorAll('a.zoom');
if (zooms.length && typeof HTMLDialogElement === 'function') {
  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Enlarged image');
  dlg.innerHTML = '<img alt=""><div class="lightbox__bar"><span class="lightbox__cap"></span><button type="button" class="lightbox__close">Close</button></div>';
  document.body.appendChild(dlg);
  const img = dlg.querySelector('img');
  const cap = dlg.querySelector('.lightbox__cap');
  let opener = null;
  dlg.querySelector('.lightbox__close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { img.removeAttribute('src'); if (opener) opener.focus(); });
  zooms.forEach((a) => {
    a.addEventListener('click', (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;
      e.preventDefault();
      opener = a;
      const inner = a.querySelector('img');
      img.src = a.getAttribute('href');
      img.alt = inner ? inner.alt : a.textContent.trim();
      cap.textContent = img.alt;
      dlg.showModal();
    });
  });
}

// ---- Filtros de Projects
// Sin JS la barra queda oculta y se ven todos los proyectos.
const filters = document.querySelector('.filters');
if (filters) {
  const cards = [...document.querySelectorAll('.projects > [data-tags]')];
  const status = document.getElementById('filter-status');
  const tagsOf = (c) => c.dataset.tags.split(' ');
  filters.querySelectorAll('button').forEach((b) => {
    const f = b.dataset.filter;
    b.querySelector('.count').textContent = f === 'all' ? cards.length : cards.filter((c) => tagsOf(c).includes(f)).length;
    b.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      let shown = 0;
      cards.forEach((c) => {
        const on = f === 'all' || tagsOf(c).includes(f);
        c.hidden = !on;
        if (on) shown += 1;
      });
      if (status) status.textContent = `Showing ${shown} project${shown === 1 ? '' : 's'}`;
    });
  });
  filters.hidden = false;
}

// ---- Formulario de contacto (Web3Forms)
const form = document.getElementById('contact-form');
if (form) {
  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');
  const MESSAGES = {
    valueMissing: 'This field is required.',
    typeMismatch: 'Enter a valid email address.',
    tooShort: (el) => `Write at least ${el.minLength} characters.`,
    tooLong: (el) => `Keep it under ${el.maxLength} characters.`,
  };

  const errorFor = (el) => {
    const v = el.validity;
    if (v.valid) return '';
    for (const key of Object.keys(MESSAGES)) {
      if (v[key]) return typeof MESSAGES[key] === 'function' ? MESSAGES[key](el) : MESSAGES[key];
    }
    return 'Check this field.';
  };
  const showError = (el) => {
    const out = document.getElementById(`${el.id}-err`);
    const msg = errorFor(el);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (out) out.textContent = msg;
    return !msg;
  };
  const setStatus = (state, text) => {
    status.dataset.state = state;
    status.textContent = text;
  };

  const fields = [...form.querySelectorAll('input:not([type="hidden"]):not([name="botcheck"]), select, textarea')];
  // Valida al salir del campo, y vuelve a validar mientras se corrige un error.
  fields.forEach((el) => {
    el.addEventListener('blur', () => { if (el.value) showError(el); });
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') showError(el); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = fields.filter((el) => !showError(el));
    if (invalid.length) {
      invalid[0].focus();
      setStatus('error', 'Please fix the highlighted fields.');
      return;
    }
    const key = form.querySelector('[name="access_key"]').value;
    if (key.startsWith('REEMPLAZAR')) {
      setStatus('error', 'The form is not set up yet. Please email me directly.');
      return;
    }

    button.disabled = true;
    setStatus('sending', 'Sending…');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || `HTTP ${res.status}`);
      form.reset();
      fields.forEach((el) => el.removeAttribute('aria-invalid'));
      setStatus('success', "Thanks, your message is on its way. I'll reply by email.");
    } catch (err) {
      setStatus('error', 'It didn’t send. Please try again, or email lucavalentini25@gmail.com.');
    } finally {
      button.disabled = false;
    }
  });
}
