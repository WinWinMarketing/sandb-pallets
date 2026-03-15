import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return null;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const target = el.getAttribute('href');
      if (target && target !== '#') {
        e.preventDefault();
        lenis.scrollTo(target, { duration: 1.2 });
      }
    });
  });

  // Back to top button
  const backTop = document.querySelector('.footer__back-top');
  if (backTop) {
    backTop.addEventListener('click', () => lenis.scrollTo(0, { duration: 1.5 }));
  }

  return lenis;
}
