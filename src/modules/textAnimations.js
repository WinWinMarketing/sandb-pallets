import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function initTextAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-split]').forEach((el) => {
      el.style.visibility = 'visible';
    });
    return;
  }

  // Section labels — chars stagger
  document.querySelectorAll('.section-label[data-split]').forEach((el) => {
    el.style.visibility = 'visible';
    const split = new SplitType(el, { types: 'chars' });
    el.setAttribute('role', 'text');
    el.setAttribute('aria-label', el.textContent.trim());

    gsap.from(split.chars, {
      opacity: 0,
      y: 15,
      stagger: 0.02,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Section titles — chars stagger
  document.querySelectorAll('.section-title[data-split]').forEach((el) => {
    el.style.visibility = 'visible';
    const split = new SplitType(el, { types: 'chars' });
    el.setAttribute('role', 'text');
    el.setAttribute('aria-label', el.textContent.trim());

    gsap.from(split.chars, {
      opacity: 0,
      y: 30,
      stagger: 0.015,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Page hero titles
  document.querySelectorAll('.page-hero__title[data-split]').forEach((el) => {
    el.style.visibility = 'visible';
    const split = new SplitType(el, { types: 'chars' });
    el.setAttribute('role', 'text');
    el.setAttribute('aria-label', el.textContent.trim());

    gsap.from(split.chars, {
      opacity: 0,
      y: '80%',
      stagger: 0.02,
      duration: 0.8,
      ease: 'power4.out',
      delay: 0.3,
    });
  });
}
