// script.js
// Cambia solo el texto del header al hacer clic en las opciones, sin tocar el logo.
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNav');
  const headerTextEl = document.getElementById('headerText');
  const headerSubEl = document.getElementById('headerSub');

  if (!nav || !headerTextEl) return;

  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    // Si quieres que el enlace siga navegando normalmente, comenta la siguiente línea:
    e.preventDefault();

    // Usamos data-title si está presente; si no, el texto del enlace
    const nuevoTexto = link.dataset.title || link.textContent.trim();
    headerTextEl.textContent = nuevoTexto;

    // Si quieres actualizar el subtítulo, añade data-sub en el enlace (opcional)
    const nuevoSub = link.dataset.sub;
    if (typeof nuevoSub === 'string') {
      headerSubEl.textContent = nuevoSub;
    }

    // Marcar el enlace activo visualmente (requiere CSS .active)
    nav.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  });
});
