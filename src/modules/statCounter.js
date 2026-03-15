import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initStatCounters() {
  document.querySelectorAll('[data-counter]').forEach((el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    if (isNaN(target)) return;
    const counter = { val: 0 };
    gsap.to(counter, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      snap: { val: 1 },
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = Math.round(counter.val);
      },
    });
  });
}
