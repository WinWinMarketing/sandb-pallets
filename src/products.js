import gsap from 'gsap';

// 3D scene for products page
(async () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (isMobile || isCoarse) return;

  try {
    const { initPalletScene } = await import('@modules/palletScene');
    initPalletScene(document.getElementById('pallet-canvas-products'), { ambient: true });
  } catch (e) {
    console.warn('3D scene failed to load:', e);
  }
})();

// Product card expand/collapse
document.querySelectorAll('.product-detail-card__toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-detail-card');
    const details = card.querySelector('.product-detail-card__details');
    const isExpanded = card.classList.contains('product-detail-card--expanded');

    // Close all others
    document.querySelectorAll('.product-detail-card--expanded').forEach((c) => {
      if (c !== card) {
        c.classList.remove('product-detail-card--expanded');
        const otherDetails = c.querySelector('.product-detail-card__details');
        if (otherDetails) otherDetails.setAttribute('hidden', '');
        const otherBtn = c.querySelector('.product-detail-card__toggle');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      }
    });

    card.classList.toggle('product-detail-card--expanded');
    if (isExpanded) {
      if (details) details.setAttribute('hidden', '');
    } else {
      if (details) details.removeAttribute('hidden');
    }
    btn.setAttribute('aria-expanded', String(!isExpanded));
  });
});
