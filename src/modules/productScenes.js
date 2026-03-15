import {
  Scene, PerspectiveCamera, WebGLRenderer,
  BoxGeometry, EdgesGeometry, LineSegments, LineBasicMaterial,
  Group,
} from 'three';
import gsap from 'gsap';

const ACCENT = 0xB8860B;
const ACCENT_LIGHT = 0xD4A039;

function createLineMaterial(color = ACCENT, opacity = 0.6) {
  return new LineBasicMaterial({ color, transparent: true, opacity });
}

function addPlank(group, material, w, h, d, x, y, z) {
  const geo = new BoxGeometry(w, h, d);
  const edges = new EdgesGeometry(geo);
  const line = new LineSegments(edges, material);
  line.position.set(x, y, z);
  group.add(line);
  geo.dispose();
}

function createStandardPallet(material) {
  const g = new Group();
  for (let i = -3; i <= 3; i++) addPlank(g, material, 4, 0.12, 0.55, 0, 0.55, i * 0.65);
  addPlank(g, material, 0.3, 0.35, 4.2, -1.5, 0.3, 0);
  addPlank(g, material, 0.3, 0.35, 4.2, 0, 0.3, 0);
  addPlank(g, material, 0.3, 0.35, 4.2, 1.5, 0.3, 0);
  addPlank(g, material, 4, 0.12, 0.55, 0, 0.05, -1.95);
  addPlank(g, material, 4, 0.12, 0.55, 0, 0.05, 0);
  addPlank(g, material, 4, 0.12, 0.55, 0, 0.05, 1.95);
  return g;
}

function createCustomPallet(material) {
  const g = new Group();
  for (let i = -2; i <= 2; i++) addPlank(g, material, 5, 0.15, 0.7, 0, 0.6, i * 0.9);
  addPlank(g, material, 0.4, 0.4, 4.5, -2, 0.3, 0);
  addPlank(g, material, 0.4, 0.4, 4.5, 0, 0.3, 0);
  addPlank(g, material, 0.4, 0.4, 4.5, 2, 0.3, 0);
  addPlank(g, material, 5, 0.15, 0.7, 0, 0.05, -1.8);
  addPlank(g, material, 5, 0.15, 0.7, 0, 0.05, 0);
  addPlank(g, material, 5, 0.15, 0.7, 0, 0.05, 1.8);
  return g;
}

function createCrate(material) {
  const g = new Group();
  addPlank(g, material, 3, 0.1, 3, 0, 0.05, 0);
  addPlank(g, material, 0.1, 2, 3, -1.45, 1.05, 0);
  addPlank(g, material, 0.1, 2, 3, 1.45, 1.05, 0);
  addPlank(g, material, 3, 2, 0.1, 0, 1.05, -1.45);
  addPlank(g, material, 3, 2, 0.1, 0, 1.05, 1.45);
  addPlank(g, material, 3, 0.1, 3, 0, 2.1, 0);
  return g;
}

function createLumber(material) {
  const g = new Group();
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      const y = row * 0.35;
      const x = (col - 1) * 1.2;
      addPlank(g, material, 1, 0.3, 4, x, y, 0);
    }
  }
  return g;
}

function createHeatTreated(material) {
  const g = createStandardPallet(material);
  const stamp = new Group();
  addPlank(stamp, createLineMaterial(ACCENT_LIGHT, 0.9), 0.8, 0.02, 0.6, 0, 0.62, 0);
  g.add(stamp);
  return g;
}

const BUILDERS = {
  pallet: (m) => createStandardPallet(m),
  custom: (m) => createCustomPallet(m),
  recycled: (m) => createStandardPallet(createLineMaterial(0x8B7355, 0.45)),
  crate: (m) => createCrate(m),
  heattreated: (m) => createHeatTreated(m),
  lumber: (m) => createLumber(m),
};

export function initProductScenes() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvases = document.querySelectorAll('[data-product-scene]');
  if (!canvases.length) return;

  canvases.forEach((canvas) => {
    const type = canvas.getAttribute('data-product-scene');
    const builder = BUILDERS[type] || BUILDERS.pallet;

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 2.5, 6);
    camera.lookAt(0, 0.5, 0);

    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const material = createLineMaterial();
    const mesh = builder(material);
    mesh.rotation.x = 0.3;
    mesh.rotation.y = -0.5;
    scene.add(mesh);

    gsap.to(mesh.rotation, { y: Math.PI * 2 - 0.5, duration: 20, repeat: -1, ease: 'none' });

    function render() { renderer.render(scene, camera); }
    gsap.ticker.add(render);

    const ro = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w && h) {
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    });
    ro.observe(canvas.parentElement || canvas);
  });
}
