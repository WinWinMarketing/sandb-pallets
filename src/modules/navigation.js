import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initNavigation(lenis) {
  const header = document.querySelector('[data-scroll-header]');
  if (!header) return;

  let lastScroll = 0;

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      const scrollY = self.scroll();
      if (scrollY > 80) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      if (scrollY > lastScroll && scrollY > 200) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
      lastScroll = scrollY;
    },
  });

  // Mobile menu
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const links = menu.querySelectorAll('.mobile-menu__link');

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
    menu.classList.toggle('mobile-menu--open');
    menu.setAttribute('aria-hidden', isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';

    if (!isOpen) {
      gsap.fromTo(links, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: 'power3.out' });
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.click();
      toggle.focus();
    }
  });

  // Close menu on link click
  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        toggle.click();
      }
    });
  });
}
