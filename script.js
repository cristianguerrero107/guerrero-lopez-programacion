// script.js
// Cambia solo el texto del header al hacer clic en las opciones, sin tocar el logo.
// Ahora permite navegación normal y también responde a cambios de hash (para que al
// hacer clic en un ancla como #quienes-somos se actualice el header incluso si
// la página navega al ancla).

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNav');
  const headerTextEl = document.getElementById('headerText');
  const headerSubEl = document.getElementById('headerSub');

  if (!nav || !headerTextEl) return;

  function setHeaderFromLink(link) {
    if (!link) return;
    const nuevoTexto = link.dataset.title || link.textContent.trim();
    headerTextEl.textContent = nuevoTexto;

    const nuevoSub = link.dataset.sub;
    if (typeof nuevoSub === 'string') headerSubEl.textContent = nuevoSub;

    nav.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  }

  // Click: update header but allow the link to work (no preventDefault)
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    setHeaderFromLink(link);
  });

  // When the hash changes (e.g. user clicks an anchor or navigates), update header
  function updateFromHash() {
    const hash = (location.hash || '').replace(/^#/, '');
    if (!hash) return;
    const link = nav.querySelector(`a[href="#${hash}"]`);
    if (link) setHeaderFromLink(link);
  }

  window.addEventListener('hashchange', updateFromHash);

  // Run once on load in case user opened a URL with a hash or we want to sync
  // the header with the current hash / first nav item.
  if (location.hash) {
    updateFromHash();
  } else {
    // No hash: set header from the first active link or from the first nav link
    const active = nav.querySelector('a.active') || nav.querySelector('a');
    if (active) setHeaderFromLink(active);
  }

  // Small debug aid: show errors in console if clicks don't trigger
  // (you can remove this later)
  // console.log('header switcher initialized');
});
