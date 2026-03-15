export function initCardGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('[data-card-glow]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
}
