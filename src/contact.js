import { initContactForm } from '@modules/contactForm';

initContactForm();

// 3D scene for contact page
(async () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (isMobile || isCoarse) return;

  try {
    const { initPalletScene } = await import('@modules/palletScene');
    initPalletScene(document.getElementById('pallet-canvas-contact'), { ambient: true });
  } catch (e) {
    console.warn('3D scene failed to load:', e);
  }
})();
