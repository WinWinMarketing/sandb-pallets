import gsap from 'gsap';

export function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  const ball = cursor.querySelector('.cursor__ball');
  document.documentElement.classList.add('has-custom-cursor');

  const setX = gsap.quickSetter(cursor, 'x', 'px');
  const setY = gsap.quickSetter(cursor, 'y', 'px');

  window.addEventListener('mousemove', (e) => {
    setX(e.clientX);
    setY(e.clientY);
  });

  const interactiveSelectors = 'a, button, [data-magnetic], input, textarea, select, .product-card, .blog-card, .cta-card';

  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });
}
