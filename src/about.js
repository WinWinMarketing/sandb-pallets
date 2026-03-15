import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.about-timeline__item').forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    x: 40,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
});
