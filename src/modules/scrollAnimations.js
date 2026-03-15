import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Generic reveal animations
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Stat counters
  document.querySelectorAll('[data-counter]').forEach((el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
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

  // Clip-path reveals
  document.querySelectorAll('[data-clip-reveal]').forEach((el) => {
    gsap.fromTo(el,
      { clipPath: 'inset(6% 3% 6% 3% round 12px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
        },
      }
    );
  });

  // Footer reveals
  const footerEls = document.querySelectorAll('.footer__top > *, .footer__bottom > *');
  if (footerEls.length) {
    gsap.from(footerEls, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }
}
