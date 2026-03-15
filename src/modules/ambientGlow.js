export function initAmbientGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.querySelector('.ambient-glow');
  if (!glow) return;

  let x = 0, y = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animate() {
    x += (targetX - x) * 0.06;
    y += (targetY - y) * 0.06;
    glow.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}
