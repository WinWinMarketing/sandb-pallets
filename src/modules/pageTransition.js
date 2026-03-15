import gsap from 'gsap';

export function initPageTransition() {
  // Check if browser supports cross-document View Transitions
  const hasViewTransitions = typeof document.startViewTransition === 'function';
  if (hasViewTransitions) return; // CSS handles it

  // GSAP fallback for Firefox
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  // Entrance: if we came from a transition, play reveal
  if (sessionStorage.getItem('page-transitioning')) {
    sessionStorage.removeItem('page-transitioning');
    gsap.set(overlay, { scaleY: 1, transformOrigin: 'top' });
    gsap.to(overlay, {
      scaleY: 0,
      duration: 0.5,
      ease: 'power4.inOut',
      delay: 0.1,
    });
  }

  // Handle bfcache
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      gsap.set(overlay, { scaleY: 0 });
    }
  });

  // Intercept internal links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    if (link.hostname !== window.location.hostname) return;
    if (link.getAttribute('href').startsWith('#')) return;
    if (link.target === '_blank') return;
    if (e.ctrlKey || e.metaKey) return;

    e.preventDefault();
    const href = link.getAttribute('href');

    sessionStorage.setItem('page-transitioning', '1');

    gsap.set(overlay, { transformOrigin: 'bottom' });
    gsap.to(overlay, {
      scaleY: 1,
      duration: 0.5,
      ease: 'power4.inOut',
      onComplete: () => {
        window.location.href = href;
      },
    });
  });
}
