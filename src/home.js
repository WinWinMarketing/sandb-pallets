import { initPreloader } from '@modules/preloader';
import { initMarquee } from '@modules/marquee';
import { store } from '@modules/store';
import gsap from 'gsap';
import SplitType from 'split-type';

const sceneReady = (async () => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (isMobile || isCoarse) return;

  try {
    const { initPalletScene } = await import('@modules/palletScene');
    return initPalletScene(document.getElementById('pallet-canvas'));
  } catch (e) {
    console.warn('3D scene failed to load:', e);
  }
})();

initPreloader(sceneReady).then(() => {
  // Hero text animation
  const heroTitle = document.querySelector('[data-hero-title]');
  if (heroTitle) {
    heroTitle.style.visibility = 'visible';
    const split = new SplitType(heroTitle, { types: 'chars' });
    heroTitle.setAttribute('role', 'text');
    heroTitle.setAttribute('aria-label', heroTitle.textContent.trim());
    gsap.from(split.chars, {
      y: '110%',
      opacity: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: 'power4.out',
    });
  }

  const heroLabel = document.querySelector('[data-hero-label]');
  if (heroLabel) {
    heroLabel.style.visibility = 'visible';
    const split = new SplitType(heroLabel, { types: 'chars' });
    gsap.from(split.chars, {
      opacity: 0,
      y: 15,
      stagger: 0.015,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.4,
    });
  }

  gsap.to('[data-hero-subtitle]', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.6 });
  gsap.to('[data-hero-cta]', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.7 });
  gsap.to('[data-hero-badges]', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.8 });

  initMarquee(store.lenis);
});
