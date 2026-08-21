# Denison Planning — Single Page Site Design

## Context

Denison Planning is a real neighbourhood planning & development consultancy (Toronto, Ontario). This is a production single-page marketing site built from a static mockup image provided by the client/user. The site is developer-maintained (no CMS) and will deploy to Cloudflare Pages.

## Goals / Non-Goals

- Goal: faithfully reproduce the mockup's layout, hierarchy, and visual language as a real, responsive, production site.
- Goal: clean component boundaries so sections can be revised independently.
- Non-goal (for now): working contact form or functional nav/CTA links — "Contact" and "Get in touch" are placeholder anchors to be wired up in a future iteration.
- Non-goal: CMS or content-editing UI — content lives in code/data, edited directly by the developer.

## Framework & Stack

- **Astro 5** + **Tailwind v4**, matching the conventions already established in the `soundslikework-blog` project:
  - All Tailwind tokens defined in a `@theme {}` block in `src/styles/global.css` — no `tailwind.config.js`.
  - Semantic (not hue-descriptive) color token names.
- **Deployment target:** Cloudflare Pages, via the official `@astrojs/cloudflare` adapter.
- No server-side logic, no content collections needed (a single static page with one small local data array for the services grid).

## Page Structure

Single page, five sections, top to bottom:

1. **Header/Nav** — logo lockup ("DENISON PLANNING" + "NEIGHBOURHOOD PLANNING & DEVELOPMENT" subtitle) top-left; nav links (Services / Approach / About / Contact) top-right. Overlaid on the hero background image.
2. **Hero** — full-bleed background photo (person walking a green hillside, teal sky), large gold headline "Planning for places that work.", 3-line subcopy with small underline accent rule.
3. **Services ("What We Do")** — eyebrow label "WHAT WE DO", 2-column grid of 6 numbered items (01–06), each with icon, title, description, divider rules between rows. Cream background.
4. **Closing CTA band** — 3-panel row: teal text panel ("We help create neighbourhoods that are enduring, inclusive and well-designed."), image/illustration panel, gold text panel ("Let's build better neighbourhoods." + "Get in touch" arrow link).
5. **Footer** — "D/P" logo mark + business name/tagline (left), location + email (right). Cream background.

"Contact" (nav) and "Get in touch" (CTA) render as inert anchor links (`href="#"`) for this iteration — no scroll behavior, form, or mailto wiring yet.

## Design Tokens

Defined in `src/styles/global.css` `@theme {}`, following the `soundslikework-blog` semantic-naming pattern:

**Colors:**
- `--color-teal` — dark teal (hero background overlay tone, CTA left panel)
- `--color-paper` — warm cream (services section, footer background)
- `--color-ink` — dark navy/charcoal (body text on cream backgrounds)
- `--color-gold` — mustard/gold (headline text, CTA accent panel, underline rules, nav-on-teal text)

**Fonts** (close Google Fonts approximations — exact typeface in the mockup is unknown):
- `--font-display`: **Space Grotesk** — bold geometric grotesque for headline, nav, logo lockup
- `--font-body`: **Inter** — body copy, service descriptions, footer text

**Layout:**
- Container pattern: `px-6 md:px-8` on the same element as `max-w-*-mx-auto`, matching the blog's header/main/footer convention, widened to `max-w-7xl` to match this design's wider desktop layout.

## Component Breakdown

Astro components under `src/components/`, composed in `src/pages/index.astro`:

- `Header.astro` — logo + nav, absolutely/relatively positioned over the hero
- `Hero.astro` — headline, subcopy, background image
- `Services.astro` — eyebrow + 6-item grid; item data as a local `const services = [...]` array of `{ number, icon, title, description }` — no content collection needed at this scale
- `CtaBand.astro` — 3-panel closing section
- `Footer.astro`

## Assets & Placeholders

Real hero photo and CTA illustration will be supplied later by the user. Until then:
- Files land in `src/assets/` with clear placeholder names: `hero-placeholder.jpg`, `cta-illustration-placeholder.svg`.
- Each placeholder renders with a solid-color fallback background (using the `teal`/`gold` tokens) sized and positioned to match the mockup's proportions, so layout and spacing are correct and visible before real assets are dropped in.
- The 6 service icons are simple inline-SVG line icons (compass, document, people, building/institution, bar-chart, people/coordination) built directly — generic enough not to need placeholders.

## Responsive Behavior

Mockup shown is desktop-only; responsive rules to design in:
- Nav collapses to a simple stacked/mobile menu below `md`.
- Services grid: 2 columns → 1 column below `md`.
- CTA band: 3 panels stack vertically below `md`.
- Hero headline uses a responsive type scale (e.g. `text-4xl md:text-6xl`).

## Testing / Verification

No automated tests planned for a static marketing page. Verification is visual: run `npm run dev`, check the page against the mockup at desktop and mobile widths, confirm placeholder assets render with correct proportions.
