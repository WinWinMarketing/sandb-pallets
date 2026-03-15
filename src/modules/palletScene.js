import {
  Scene, PerspectiveCamera, WebGLRenderer,
  BoxGeometry, EdgesGeometry, LineSegments, LineBasicMaterial,
  Group,
} from 'three';
import gsap from 'gsap';

function createPallet(color) {
  const pallet = new Group();
  const material = new LineBasicMaterial({ color, transparent: true, opacity: 0.7 });

  function addPlank(w, h, d, x, y, z) {
    const geo = new BoxGeometry(w, h, d);
    const edges = new EdgesGeometry(geo);
    const line = new LineSegments(edges, material);
    line.position.set(x, y, z);
    pallet.add(line);
    geo.dispose();
  }

  // Top deck boards (7 boards)
  for (let i = -3; i <= 3; i++) {
    addPlank(4, 0.12, 0.55, 0, 0.55, i * 0.65);
  }

  // Stringers (3 beams)
  addPlank(0.3, 0.35, 4.2, -1.5, 0.3, 0);
  addPlank(0.3, 0.35, 4.2, 0, 0.3, 0);
  addPlank(0.3, 0.35, 4.2, 1.5, 0.3, 0);

  // Bottom deck boards (3 boards)
  addPlank(4, 0.12, 0.55, 0, 0.05, -1.95);
  addPlank(4, 0.12, 0.55, 0, 0.05, 0);
  addPlank(4, 0.12, 0.55, 0, 0.05, 1.95);

  return pallet;
}

export function initPalletScene(canvas, options = {}) {
  if (!canvas) return Promise.resolve();

  const { ambient = false } = options;
  const scene = new Scene();
  const camera = new PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 2, 6);
  camera.lookAt(0, 0.3, 0);

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const pallet = createPallet(0xD4A039);
  if (ambient) {
    pallet.children.forEach((child) => {
      child.material.opacity = 0.15;
    });
    camera.position.set(0, 3, 8);
  }
  pallet.rotation.x = 0.3;
  pallet.rotation.y = -0.5;
  scene.add(pallet);

  // Idle rotation
  gsap.to(pallet.rotation, { y: Math.PI * 2 - 0.5, duration: 25, repeat: -1, ease: 'none' });

  // Render on GSAP ticker
  function render() {
    renderer.render(scene, camera);
  }
  gsap.ticker.add(render);

  // Resize
  const ro = new ResizeObserver(() => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  ro.observe(canvas.parentElement || canvas);

  return Promise.resolve();
}
