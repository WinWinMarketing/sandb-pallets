import '@styles/main.css';
import { initSmoothScroll } from '@modules/smoothScroll';
import { initNavigation } from '@modules/navigation';
import { initCustomCursor } from '@modules/customCursor';
import { initAmbientGlow } from '@modules/ambientGlow';
import { initMagneticEffect } from '@modules/magneticEffect';
import { initCardGlow } from '@modules/cardGlow';
import { initTextAnimations } from '@modules/textAnimations';
import { initScrollAnimations } from '@modules/scrollAnimations';
import { initPageTransition } from '@modules/pageTransition';
import { store } from '@modules/store';

const lenis = initSmoothScroll();
store.lenis = lenis;
initNavigation(lenis);
initPageTransition();
initCustomCursor();
initAmbientGlow();
initMagneticEffect();
initCardGlow();

// Wait for fonts then init text/scroll animations
document.fonts.ready.then(() => {
  initTextAnimations();
  initScrollAnimations();
});
