# Denison Planning Single-Page Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Denison Planning single-page marketing site (Astro 5 + Tailwind v4) matching the provided mockup, deployable to Cloudflare Pages.

**Architecture:** A single Astro page (`src/pages/index.astro`) composed of five section components (`Header`, `Hero`, `Services`, `CtaBand`, `Footer`) wrapped in a `BaseLayout`. Design tokens live in a Tailwind v4 `@theme` block in `src/styles/global.css`. No content collections, no CMS, no client-side JS — every section is static markup driven by props or a small local data array.

**Tech Stack:** Astro 5, Tailwind v4 (via `@tailwindcss/vite`, no `tailwind.config.js`), `@astrojs/cloudflare` adapter, TypeScript (strict), Google Fonts (Space Grotesk + Inter).

## Global Constraints

- No `tailwind.config.js` — all design tokens live in `@theme {}` in `src/styles/global.css`.
- Color tokens are semantic, not hue-descriptive: `teal`, `paper`, `ink`, `gold`.
- Font tokens: `--font-display` (Space Grotesk), `--font-body` (Inter).
- Use canonical Tailwind v4 utility classes wherever one exists — e.g. `h-0.5` not `h-[2px]`, `bg-linear-to-r` not `bg-gradient-to-r` — matching the convention already established in `soundslikework-blog`.
- Always put `px-6 md:px-8` on the **same element** as `max-w-7xl mx-auto` — never on an outer wrapper — so all section containers stay flush.
- "Contact" (nav) and "Get in touch" (CTA) render as inert `href="#"` anchors — no scroll, form, or mailto behavior yet.
- No CMS, no content collections. Services grid data lives in a single local TypeScript array (`src/data/services.ts`).
- Hero background photo and CTA illustration are not yet available — render solid-color placeholder backgrounds (using `teal`/`gold` tokens) sized to match the mockup's proportions, structured so a real image can be dropped in later with a one-line change.
- Deploys to Cloudflare Pages via `@astrojs/cloudflare` adapter, matching `soundslikework-blog`'s `astro.config.mjs` pattern (`vite: { plugins: [tailwindcss()] }`, `adapter: cloudflare()`).

---

### Task 1: Project scaffold & design tokens

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `public/favicon.svg`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro` (temporary placeholder content, replaced in Task 2)

**Interfaces:**
- Produces: Tailwind v4 tokens available globally as utility classes: `bg-teal`/`text-teal`, `bg-paper`/`text-paper`, `bg-ink`/`text-ink`, `bg-gold`/`text-gold`, `font-display`, `font-body`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "denison-planning",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "npm run build && wrangler dev",
    "astro": "astro",
    "deploy": "npm run build && wrangler deploy"
  },
  "dependencies": {
    "@astrojs/cloudflare": "^12.6.12",
    "astro": "^5.17.1"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.6",
    "@tailwindcss/vite": "^4.2.1",
    "tailwindcss": "^4.2.1",
    "typescript": "^5.9.3",
    "wrangler": "^4.69.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules/
dist/
.astro/
.wrangler/
.env
```

- [ ] **Step 5: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <rect width="24" height="24" fill="#17514D" />
  <text x="12" y="16" font-family="sans-serif" font-size="9" font-weight="bold" fill="#E3A73C" text-anchor="middle">DP</text>
</svg>
```

- [ ] **Step 6: Create `src/styles/global.css` with design tokens**

```css
@import "tailwindcss";

@theme {
  --color-teal: #17514D;
  --color-paper: #F1EBE0;
  --color-ink: #16302E;
  --color-gold: #E3A73C;

  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-paper);
  color: var(--color-ink);
}
```

- [ ] **Step 7: Create temporary `src/pages/index.astro`**

```astro
---
import "../styles/global.css";
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Denison Planning</title>
  </head>
  <body>
    <p class="font-display text-gold bg-teal p-4">Scaffold OK</p>
  </body>
</html>
```

- [ ] **Step 8: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 9: Verify build**

Run: `npm run build`
Expected: exits 0, creates `dist/index.html`.

Run: `grep -o "Scaffold OK" dist/index.html`
Expected: prints `Scaffold OK`.

- [ ] **Step 10: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json .gitignore public/favicon.svg src/styles/global.css src/pages/index.astro package-lock.json
git commit -m "Scaffold Astro + Tailwind v4 project with design tokens"
```

---

### Task 2: Base layout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `src/styles/global.css` (Task 1).
- Produces: `BaseLayout` component with `Props { title: string; description: string }`, rendering `<slot />` inside `<body>`.

- [ ] **Step 1: Create `src/layouts/BaseLayout.astro`**

```astro
---
import "../styles/global.css";

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap"
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Rewrite `src/pages/index.astro` to use the layout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Denison Planning — Neighbourhood Planning & Development"
  description="Thoughtful planning. Strong neighbourhoods. Better places. Denison Planning provides neighbourhood planning and development advisory services in Toronto, Ontario."
>
  <p class="font-display text-gold bg-teal p-4">Layout OK</p>
</BaseLayout>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "Layout OK" dist/index.html && grep -o "fonts.googleapis.com" dist/index.html`
Expected: both strings print (layout content renders, font link is present).

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "Add BaseLayout with meta tags and Google Fonts"
```

---

### Task 3: Header component

**Files:**
- Create: `src/components/Header.astro`

**Interfaces:**
- Produces: `Header` component (no props), renders logo lockup + nav with inert `href="#"` links.

- [ ] **Step 1: Create `src/components/Header.astro`**

```astro
---
const navLinks = ["Services", "Approach", "About", "Contact"];
---

<header class="relative z-10">
  <div class="max-w-7xl mx-auto px-6 md:px-8 pt-8 md:pt-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
    <div class="font-display text-gold">
      <p class="text-xl md:text-2xl font-bold uppercase tracking-wide leading-tight">
        Denison<br />Planning
      </p>
      <p class="mt-2 text-xs uppercase tracking-widest leading-relaxed max-w-36">
        Neighbourhood Planning &amp; Development
      </p>
    </div>
    <nav aria-label="Primary">
      <ul class="flex flex-wrap gap-4 md:gap-8 font-display text-xs md:text-sm uppercase tracking-widest text-gold">
        {navLinks.map((link) => (
          <li>
            <a href="#" class="hover:opacity-75 transition-opacity">{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Temporarily render `Header` in `src/pages/index.astro` to verify**

Replace the `<p>Layout OK</p>` line with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
---

<BaseLayout
  title="Denison Planning — Neighbourhood Planning & Development"
  description="Thoughtful planning. Strong neighbourhoods. Better places. Denison Planning provides neighbourhood planning and development advisory services in Toronto, Ontario."
>
  <Header />
</BaseLayout>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "Denison" dist/index.html | head -1 && grep -o "Contact" dist/index.html`
Expected: both strings print.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro src/pages/index.astro
git commit -m "Add Header component with logo and nav"
```

---

### Task 4: Hero component

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `Header` component (Task 3).
- Produces: `Hero` component (no props), renders `<Header />` plus headline/subcopy over a `bg-teal` placeholder.

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import Header from './Header.astro';
---

<section class="relative bg-teal text-gold overflow-hidden">
  <!-- Placeholder for hero photograph. Replace this section's bg-teal
       with a background-image (or <img> layer) once the real photo asset
       is provided; keep text-gold contrast in mind against the new image. -->
  <div class="relative">
    <Header />
    <div class="max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-32 md:pt-32 md:pb-48">
      <h1 class="font-display font-bold text-4xl md:text-6xl leading-tight max-w-2xl">
        Planning for places that work.
      </h1>
      <div class="mt-8 font-body text-sm md:text-base leading-relaxed space-y-1">
        <p>Thoughtful planning.</p>
        <p>Strong neighbourhoods.</p>
        <p>Better places.</p>
      </div>
      <div class="mt-4 h-0.5 w-16 bg-gold"></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Wire `Hero` into `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
---

<BaseLayout
  title="Denison Planning — Neighbourhood Planning & Development"
  description="Thoughtful planning. Strong neighbourhoods. Better places. Denison Planning provides neighbourhood planning and development advisory services in Toronto, Ontario."
>
  <Hero />
</BaseLayout>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "Planning for places that work." dist/index.html`
Expected: string prints.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "Add Hero component with headline and subcopy"
```

---

### Task 5: Services data, icon, and grid component

**Files:**
- Create: `src/data/services.ts`
- Create: `src/components/ServiceIcon.astro`
- Create: `src/components/Services.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `services: Service[]` exported from `src/data/services.ts`, where `Service = { number: string; title: string; description: string; icon: "compass" | "document" | "people" | "institution" | "chart" }`.
- Produces: `ServiceIcon` component with `Props { name: "compass" | "document" | "people" | "institution" | "chart" }`.
- Produces: `Services` component (no props), reads `services` and renders the 2-column grid.

- [ ] **Step 1: Create `src/data/services.ts`**

```ts
export interface Service {
  number: string;
  title: string;
  description: string;
  icon: "compass" | "document" | "people" | "institution" | "chart";
}

export const services: Service[] = [
  {
    number: "01",
    title: "Planning & Development Advisory",
    description: "Advice on development opportunities, municipal processes, approvals pathways and next steps.",
    icon: "compass",
  },
  {
    number: "02",
    title: "Development Applications",
    description: "Planning support for development applications and municipal approvals.",
    icon: "document",
  },
  {
    number: "03",
    title: "Community & Stakeholder Engagement",
    description: "Meaningful engagement that builds understanding and supports better decisions.",
    icon: "people",
  },
  {
    number: "04",
    title: "Planning Research & Policy Analysis",
    description: "Research, policy analysis and strategic planning support for public and private sector clients.",
    icon: "institution",
  },
  {
    number: "05",
    title: "Planning Reports & Justification",
    description: "Clear, evidence-based reports to support proposals and planning decisions.",
    icon: "chart",
  },
  {
    number: "06",
    title: "Project Management & Coordination",
    description: "Coordination of planning projects, consultants, stakeholders and municipal processes from start to finish.",
    icon: "people",
  },
];
```

- [ ] **Step 2: Create `src/components/ServiceIcon.astro`**

```astro
---
interface Props {
  name: "compass" | "document" | "people" | "institution" | "chart";
}

const { name } = Astro.props;
---

{name === "compass" && (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6">
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9l-3.5 1.5L10 14l3.5-1.5L15 9z" />
  </svg>
)}
{name === "document" && (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6">
    <path d="M6 3h9l3 3v15H6z" />
    <path d="M9 9h3M9 12h6M9 15h6" />
  </svg>
)}
{name === "people" && (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6">
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="16" cy="8" r="2.5" />
    <path d="M3 19c0-2.8 2.2-5 5-5s5 2.2 5 5M11 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
  </svg>
)}
{name === "institution" && (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6">
    <path d="M4 10l8-5 8 5M5 10v9M19 10v9M9 10v9M15 10v9M3 21h18" />
  </svg>
)}
{name === "chart" && (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6">
    <path d="M4 20V10M11 20V4M18 20v-7M3 20h18" />
  </svg>
)}
```

- [ ] **Step 3: Create `src/components/Services.astro`**

```astro
---
import { services } from '../data/services';
import ServiceIcon from './ServiceIcon.astro';
---

<section class="bg-paper text-ink">
  <div class="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
    <p class="font-display text-xs uppercase tracking-widest text-teal">What We Do</p>
    <div class="mt-2 h-0.5 w-10 bg-teal"></div>
    <div class="mt-12 grid md:grid-cols-2 gap-x-16">
      {services.map((service) => (
        <div class="flex gap-6 py-6 border-b border-ink/10">
          <span class="font-display text-2xl font-bold text-teal shrink-0">{service.number}</span>
          <div>
            <div class="text-teal mb-2">
              <ServiceIcon name={service.icon} />
            </div>
            <h3 class="font-display font-bold uppercase text-sm tracking-wide">{service.title}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink/80">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Wire `Services` into `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
---

<BaseLayout
  title="Denison Planning — Neighbourhood Planning & Development"
  description="Thoughtful planning. Strong neighbourhoods. Better places. Denison Planning provides neighbourhood planning and development advisory services in Toronto, Ontario."
>
  <Hero />
  <Services />
</BaseLayout>
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "Planning Research & Policy Analysis" dist/index.html && grep -c "svg" dist/index.html`
Expected: title string prints; svg count is at least 6 (one per service).

- [ ] **Step 6: Commit**

```bash
git add src/data/services.ts src/components/ServiceIcon.astro src/components/Services.astro src/pages/index.astro
git commit -m "Add Services data and grid component"
```

---

### Task 6: CTA band component

**Files:**
- Create: `src/components/CtaBand.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `CtaBand` component (no props), renders the 3-panel closing section with an inert `href="#"` "Get in touch" link.

- [ ] **Step 1: Create `src/components/CtaBand.astro`**

```astro
<section class="grid md:grid-cols-3">
  <div class="bg-teal text-paper px-8 py-16 md:py-24 flex items-center">
    <p class="font-display text-2xl md:text-3xl font-bold leading-snug">
      We help create neighbourhoods that are enduring, inclusive and well-designed.
    </p>
  </div>
  <!-- Placeholder for CTA illustration/photo. Replace bg-teal/80 below with
       a background-image (or <img>) once the real illustration asset is
       provided. -->
  <div class="relative bg-teal/80 min-h-64 md:min-h-0" aria-hidden="true"></div>
  <div class="bg-gold text-teal px-8 py-16 md:py-24 flex flex-col justify-center gap-6">
    <p class="font-display text-2xl md:text-3xl font-bold leading-snug">
      Let's build better neighbourhoods.
    </p>
    <a
      href="#"
      class="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest hover:opacity-75 transition-opacity"
    >
      Get in touch
      <span aria-hidden="true">→</span>
    </a>
  </div>
</section>
```

- [ ] **Step 2: Wire `CtaBand` into `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import CtaBand from '../components/CtaBand.astro';
---

<BaseLayout
  title="Denison Planning — Neighbourhood Planning & Development"
  description="Thoughtful planning. Strong neighbourhoods. Better places. Denison Planning provides neighbourhood planning and development advisory services in Toronto, Ontario."
>
  <Hero />
  <Services />
  <CtaBand />
</BaseLayout>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "Let's build better neighbourhoods." dist/index.html && grep -o "Get in touch" dist/index.html`
Expected: both strings print.

- [ ] **Step 4: Commit**

```bash
git add src/components/CtaBand.astro src/pages/index.astro
git commit -m "Add CtaBand component"
```

---

### Task 7: Footer component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `Footer` component (no props).

- [ ] **Step 1: Create `src/components/Footer.astro`**

```astro
<footer class="bg-paper text-ink border-t border-ink/10">
  <div class="max-w-7xl mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
    <div class="flex items-center gap-4">
      <div class="font-display font-bold text-sm leading-none border-l-2 border-teal pl-3">
        <p>D</p>
        <p>P</p>
      </div>
      <div class="text-xs uppercase tracking-wide leading-relaxed">
        <p class="font-display font-bold">Denison Planning</p>
        <p class="text-ink/70">Neighbourhood Planning &amp; Development</p>
      </div>
    </div>
    <div class="text-xs uppercase tracking-wide leading-relaxed text-right">
      <p>Toronto, Ontario</p>
      <p class="text-ink/70">hello@denisonplanning.com</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Wire `Footer` into `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import CtaBand from '../components/CtaBand.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout
  title="Denison Planning — Neighbourhood Planning & Development"
  description="Thoughtful planning. Strong neighbourhoods. Better places. Denison Planning provides neighbourhood planning and development advisory services in Toronto, Ontario."
>
  <Hero />
  <Services />
  <CtaBand />
  <Footer />
</BaseLayout>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

Run: `grep -o "hello@denisonplanning.com" dist/index.html && grep -o "Toronto, Ontario" dist/index.html`
Expected: both strings print.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro
git commit -m "Add Footer component"
```

---

### Task 8: Final integration verification

**Files:**
- None created or modified — verification only.

**Interfaces:**
- Consumes: the fully assembled `src/pages/index.astro` from Tasks 1–7.

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: exits 0, no TypeScript or Astro errors.

- [ ] **Step 2: Type-check**

Run: `npx astro check`
Expected: exits 0, no errors.

- [ ] **Step 3: Start dev server and visually verify against the mockup**

Run: `npm run dev`

Open `http://localhost:4321` in a browser and confirm, at both a desktop width (~1440px) and a mobile width (~375px):
- Header logo and nav render and stay legible over the teal hero.
- Hero headline, subcopy, and underline rule match the mockup's hierarchy.
- Services grid shows all 6 numbered items in 2 columns on desktop, 1 column on mobile, with icons and divider rules.
- CTA band shows 3 panels side-by-side on desktop, stacked on mobile.
- Footer shows the D/P mark, business name/tagline, and location/email, reflowing to stacked on mobile.
- No layout overflow or horizontal scroll at either width.

Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 4: Commit (if any fixes were made during verification)**

If Step 3 required any fixes, stage and commit them:

```bash
git add -A
git commit -m "Fix layout issues found during integration verification"
```

If no fixes were needed, no commit is required — the plan is complete.
