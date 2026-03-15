# Technical Reference — Premium One-Page Site

Reference document for building a high-end, animation-heavy one-page website. Based on a production site built for a political campaign that achieved award-worthy visual quality using vanilla JS (no React/Vue).

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **Vite** | 8.x | Build tool, dev server, HMR |
| **GSAP 3** | 3.14+ | Animation engine (tweens, timelines, ScrollTrigger) |
| **Lenis** | 1.3+ | Smooth virtual scrolling, synced with ScrollTrigger |
| **SplitType** | 0.3+ | Text splitting into chars/words/lines for granular animation |
| **Vanilla JS** | ES Modules | No framework — lightweight, fast |

### Install

```bash
npm create vite@latest . -- --template vanilla
npm install gsap lenis split-type
```

### Vite Config

```js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/repo-name/',  // set for GitHub Pages, remove for custom domain
  root: '.',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@modules': resolve(__dirname, 'src/modules'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
  },
  server: { port: 3000 },
});
```

---

## Project Structure

```
├── index.html                    # Single HTML file, all sections
├── vite.config.js
├── package.json
├── public/                       # Static assets (images, favicon)
├── src/
│   ├── main.js                   # Entry point, imports all modules
│   ├── modules/
│   │   ├── preloader.js          # Entrance animation with counter
│   │   ├── smoothScroll.js       # Lenis setup + ScrollTrigger sync
│   │   ├── textAnimations.js     # SplitType text reveals (hero + sections)
│   │   ├── scrollAnimations.js   # All scroll-triggered animations
│   │   ├── magneticEffect.js     # Magnetic hover on buttons/links
│   │   ├── customCursor.js       # Custom cursor replacing default pointer
│   │   ├── marquee.js            # Infinite scroll marquee with velocity
│   │   ├── ambientGlow.js        # Cursor-following radial gradient
│   │   ├── cardGlow.js           # Card border glow following cursor
│   │   └── contactForm.js        # Form validation + animated labels
│   └── styles/
│       ├── main.css              # Imports all partials
│       ├── reset.css             # Modern CSS reset
│       ├── variables.css         # Design tokens (colors, type, spacing)
│       ├── typography.css        # Base type styles, section labels/titles
│       ├── layout.css            # All section layouts
│       ├── components.css        # Buttons, reusable components
│       ├── animations.css        # Noise, cursor, overlays, reduced motion
│       └── responsive.css        # Breakpoints + loading/loaded states
└── .github/workflows/deploy.yml  # GitHub Pages auto-deploy
```

---

## CSS Architecture

### Design Tokens (variables.css)

All design decisions live in CSS custom properties. Change these to rebrand the entire site.

```css
:root {
  /* Colors */
  --color-bg: #0c0a08;              /* deep dark background */
  --color-bg-elevated: #141210;      /* cards, alternate sections */
  --color-bg-warm: #1a1714;          /* warm alternate sections */
  --color-accent-primary: #dc0000;   /* main brand accent */
  --color-accent-secondary: #004c99; /* secondary accent */
  --color-text: #f0ece2;             /* primary text (off-white) */
  --color-text-muted: #9a918a;       /* secondary text */
  --color-text-dim: #5a534e;         /* tertiary text */
  --color-border: rgba(240, 236, 226, 0.12);

  /* Fluid Type Scale (clamp for responsive) */
  --text-xs:      clamp(0.75rem, 0.7rem + 0.25vw, 0.85rem);
  --text-sm:      clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base:    clamp(1rem, 0.925rem + 0.35vw, 1.125rem);
  --text-md:      clamp(1.1rem, 1rem + 0.6vw, 1.35rem);
  --text-lg:      clamp(1.25rem, 1.1rem + 0.8vw, 1.65rem);
  --text-xl:      clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
  --text-2xl:     clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  --text-3xl:     clamp(2.5rem, 1.8rem + 3.5vw, 5rem);
  --text-4xl:     clamp(3rem, 2rem + 5vw, 7rem);
  --text-display: clamp(3.5rem, 2rem + 7.5vw, 10rem);

  /* Spacing Scale */
  --space-xs:      clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --space-sm:      clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  --space-md:      clamp(1rem, 0.8rem + 1vw, 1.5rem);
  --space-lg:      clamp(1.5rem, 1rem + 2.5vw, 3rem);
  --space-xl:      clamp(1.5rem, 1.25rem + 1.5vw, 2.5rem);
  --space-section: clamp(2.5rem, 2rem + 2.5vw, 4rem);

  /* Typography */
  --font-heading: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --duration-fast: 0.3s;
  --duration-normal: 0.6s;
  --duration-slow: 1s;
}
```

### Breakpoints (responsive.css)

```
1024px — tablet (stack grids, hide hero portrait)
768px  — mobile (hamburger nav, single columns)
480px  — small mobile (reduce title sizes)
```

### Key CSS Patterns Used

- `clamp()` for all fluid sizing (no media query font sizes needed)
- `clip-path: inset()` for section reveal animations
- `mask-image: linear-gradient()` for image fade effects
- `mix-blend-mode: difference` on custom cursor
- `backdrop-filter: blur()` on scrolled header
- CSS custom properties (`--mouse-x`, `--mouse-y`) for cursor-following effects
- `@keyframes` with `steps()` for film grain animation
- `will-change: transform` on frequently animated elements

---

## Animation Inventory

### 1. Preloader (preloader.js)

- Letter-by-letter name reveal (staggered `y` + `opacity`)
- Counter counts 0→60 during entrance, snaps to 100 when resources loaded
- Bar fills in sync with counter
- Tied to real `document.fonts.ready` + image load promises
- 6-second safety timeout
- Exit: elements fade up, then preloader slides up with `yPercent: -100`

### 2. Smooth Scroll (smoothScroll.js)

```js
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
```

- All `a[href^="#"]` links use `lenis.scrollTo()` with smooth duration
- Nav click triggers a brief opacity dip (0.4) on `<main>` for cinematic feel

### 3. Text Animations (textAnimations.js)

**Hero text** (plays on preloader complete):
- Title: SplitType into chars, staggered `y: '110%'` → `0` with `power4.out`
- Subtitle: SplitType into words, staggered fade
- CTA: fade + `y` slide

**Section labels** (`[data-split]` on `.section-label`):
- SplitType chars, `opacity: 0, y: 15` → revealed at `start: 'top 95%'`
- Triggers early so they're visible as soon as section enters viewport

**Section titles** (`[data-split]` on `.section-title`):
- SplitType chars (NOT lines — avoids invisible space from overflow:hidden wrappers)
- `opacity: 0, y: 30` → staggered at `start: 'top 95%'`
- DO NOT use `y: '100%'` with overflow:hidden wrappers — creates large invisible gaps

**Body text** (`.about__text` etc):
- Animate whole paragraphs, NOT split lines (SplitType line splitting creates fixed-width divs that break text reflow)

### 4. Scroll Animations (scrollAnimations.js)

**Nav hide/show**: Header hides on scroll down (`translateY(-100%)`), shows on scroll up. Adds `header--scrolled` class for backdrop blur.

**Hero parallax**: Portrait and content move at different `scrub: true` speeds as you scroll past.

**Stats counter**: Numbers count from 0 to target using `gsap.to(counter, { val: target, snap: 1 })`.

**Priority cards**: Staggered `opacity + y` reveal, number counter animation.

**Testimonial carousel**: CSS Grid + GSAP `translateX` pagination with dot indicators.

**Clip-path section reveal**: `clipPath: 'inset(6% 3% 6% 3% round 12px)'` → `inset(0)` with `scrub: 0.5`.

### 5. Magnetic Effect (magneticEffect.js)

```js
el.addEventListener('mousemove', (e) => {
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
});
el.addEventListener('mouseleave', () => {
  gsap.to(el, { x: 0, y: 0, ease: 'elastic.out(1, 0.5)' });
});
```

Apply with `data-magnetic` attribute on any element.

### 6. Custom Cursor (customCursor.js)

- Hides default cursor: `html.has-custom-cursor, html.has-custom-cursor * { cursor: none !important; }`
- Uses `gsap.quickSetter` for zero-lag position (NOT ticker — set directly in mousemove)
- `.cursor__ball` with `mix-blend-mode: difference` and `will-change: transform`
- Grows on hover over interactive elements (`.cursor--hover`)
- Disabled on touch devices (`pointer: coarse`)

### 7. Marquee (marquee.js)

- Content duplicated for seamless loop: `marqueeTrack.innerHTML += clone`
- GSAP `xPercent: -50` with `repeat: -1` and `modifiers` for infinite loop
- Scroll velocity controls `timeScale` and `skewX` (clamped ±3 degrees)
- Speed interpolates back to 1 with `gsap.utils.interpolate(speed, 1, 0.07)`

### 8. Ambient Glow (ambientGlow.js)

- Fixed 600px radial gradient div, `rgba(accent, 0.08)`
- Follows cursor with lerp (0.06 factor) for smooth trailing
- Hidden on touch devices

### 9. Card Border Glow (cardGlow.js)

- Cards track `mousemove` and set `--mouse-x`, `--mouse-y` CSS vars
- `::before` pseudo uses `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), ...)`
- Shows on hover with `opacity` transition

---

## Key Lessons Learned

1. **Never use SplitType `lines` with `overflow: hidden` wrappers for hidden-until-scroll text** — it creates large invisible gaps. Use `opacity + y` fade instead.

2. **Never use SplitType `lines` on body paragraphs** — it creates fixed-width line divs that don't reflow on resize, causing odd line breaks.

3. **Set scroll triggers early** (`start: 'top 95%'` not `'top 80%'`) so content is visible as soon as the section enters, not after scrolling 20% into it.

4. **For animated film grain**: use `inset: -150%` on the noise overlay so translate animations don't show edges. Keep translate values small (2-6%).

5. **For percentage-based card widths in a carousel**: use CSS Grid `grid-auto-columns` on the track (not flex `min-width`), since grid resolves percentages from the container, not the content.

6. **Custom cursor lag**: use `gsap.quickSetter` directly in the `mousemove` handler, not in `gsap.ticker` (which adds 1 frame delay).

7. **Button hover sweep effect**: text inside needs `position: relative; z-index: 1` via wrapper spans (`.btn__text`, `.btn__arrow`), otherwise the `::before` pseudo covers the text.

8. **Hero should be `min-height: 100vh`** so the next section starts fully below the fold.

9. **Preloader should wait for real resources** (`document.fonts.ready` + image load promises) with a safety timeout (6s), not just a fixed timer.

10. **`mix-blend-mode: difference`** on cursor works great on dark backgrounds but can look odd on light sections — consider toggling it.

---

## Deployment (GitHub Pages)

### Workflow (.github/workflows/deploy.yml)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Enable Pages

```bash
gh api repos/OWNER/REPO/pages -X POST -f build_type=workflow
```

### Set base path in vite.config.js

```js
base: '/repo-name/',  // must match GitHub repo name
```

---

## Performance Targets

- **JS bundle**: < 60KB gzipped (achieved: 57KB)
- **CSS**: < 6KB gzipped (achieved: 5.97KB)
- **LCP**: < 2 seconds
- **Preloader**: tied to real resource loading, 6s max
- **Touch devices**: cursor, magnetic, ambient glow all disabled
- **`prefers-reduced-motion`**: all animations disabled, preloader hidden

---

## Reference Sites for Inspiration

- https://gsap.com — dark theme, GSAP showcase
- https://www.simonesniekers.com — portfolio animations
- https://www.regisgrumberg.com — text reveals, scroll pacing
- https://clauaskee.com — section transitions
- https://godly.website — curated premium site gallery
