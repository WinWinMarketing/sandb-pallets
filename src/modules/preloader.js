import gsap from 'gsap';

export function initPreloader(sceneReadyPromise) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
    document.body.classList.add('is-loaded');
    return Promise.resolve();
  }

  const preloader = document.getElementById('preloader');
  const counter = document.querySelector('[data-preloader-counter]');
  const bar = document.querySelector('[data-preloader-bar]');
  const letters = document.querySelectorAll('[data-preloader-letter]');

  if (!preloader) return Promise.resolve();

  // Entrance
  const entranceTl = gsap.timeline();
  entranceTl.from(letters, {
    y: '110%',
    opacity: 0,
    stagger: 0.08,
    duration: 0.8,
    ease: 'power4.out',
  });

  // Resource loading
  const fontReady = document.fonts.ready;
  const imagesReady = Promise.all(
    [...document.querySelectorAll('img[src]')].map((img) =>
      img.complete ? Promise.resolve() : new Promise((r) => { img.onload = r; img.onerror = r; })
    )
  );
  const safetyTimeout = new Promise((r) => setTimeout(r, 6000));

  const counterObj = { val: 0 };
  gsap.to(counterObj, {
    val: 60,
    duration: 2,
    ease: 'power1.inOut',
    onUpdate: () => {
      const v = Math.round(counterObj.val);
      if (counter) counter.textContent = v;
      if (bar) bar.style.width = `${v}%`;
      preloader.setAttribute('aria-valuenow', v);
    },
  });

  return Promise.race([
    Promise.all([fontReady, imagesReady, sceneReadyPromise || Promise.resolve()]),
    safetyTimeout,
  ]).then(() => {
    return new Promise((resolve) => {
      gsap.to(counterObj, {
        val: 100,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          const v = Math.round(counterObj.val);
          if (counter) counter.textContent = v;
          if (bar) bar.style.width = `${v}%`;
          preloader.setAttribute('aria-valuenow', v);
        },
        onComplete: () => {
          const exitTl = gsap.timeline({ onComplete: resolve });
          exitTl
            .to([counter, bar.parentElement], { opacity: 0, y: -20, duration: 0.4 })
            .to(letters, { y: '-110%', opacity: 0, stagger: 0.03, duration: 0.5 }, '-=0.2')
            .to(preloader, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '-=0.3')
            .set(preloader, { display: 'none' });
          document.body.classList.add('is-loaded');
        },
      });
    });
  });
}
