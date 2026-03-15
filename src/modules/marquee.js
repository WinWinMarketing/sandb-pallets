import gsap from 'gsap';

export function initMarquee(lenis) {
  const track = document.querySelector('[data-marquee-track]');
  if (!track) return;

  // Duplicate content for seamless loop
  track.innerHTML += track.innerHTML;

  const tween = gsap.to(track, {
    xPercent: -50,
    repeat: -1,
    duration: 30,
    ease: 'none',
  });

  // Speed up on scroll velocity
  if (lenis) {
    let speed = 1;
    lenis.on('scroll', ({ velocity }) => {
      speed = 1 + Math.abs(velocity) * 0.15;
      speed = Math.min(speed, 4);
    });

    gsap.ticker.add(() => {
      speed = gsap.utils.interpolate(speed, 1, 0.07);
      tween.timeScale(speed);
      gsap.set(track, { skewX: (speed - 1) * -1.5 });
    });
  }
}
