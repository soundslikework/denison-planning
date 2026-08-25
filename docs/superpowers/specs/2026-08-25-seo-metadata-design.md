# SEO & Metadata Setup — Design

Date: 2026-08-25

## Goal

Make the site properly discoverable and correctly represented when shared: search engine indexing, canonical URLs, social share previews, and structured data — without requiring content authors to think about any of it page-to-page.

## Context

Denison Planning is a five-page Astro + Cloudflare marketing site (index, about, approach, services, contact). Every page already passes `title` and `description` into `BaseLayout.astro` (directly, or via `PageLayout.astro`, which appends "— Denison Planning" to inner-page titles). Production domain: `https://denisonplanning.com`.

Currently missing: canonical `site` URL, Open Graph/Twitter Card tags, canonical `<link>`, sitemap, robots.txt, and structured data.

## Decisions

- **OG image**: meta tags reference `/og-image.png` (1200×630) as a placeholder path. No image file is created in this pass — nothing breaks without it, social platforms just show a blank/fallback preview until one is dropped in later.
- **Structured data scope**: `ProfessionalService` JSON-LD with name, description, and URL only — no address or phone, since none is currently displayed on the site. Emitted once, site-wide (via `BaseLayout`), since it describes the business rather than a single page.
- **Sitemap**: use the official `@astrojs/sitemap` integration rather than hand-rolling one, since Astro tracks all page routes automatically and this avoids drift as pages are added.

## Changes

**1. `astro.config.mjs`**
- Add `site: 'https://denisonplanning.com'`
- Add `@astrojs/sitemap` integration (new dependency)

**2. `src/layouts/BaseLayout.astro`**
- Extend `Props` with optional `image?: string` (defaults to `/og-image.png`)
- Add `<link rel="canonical">` built from `Astro.url` against the configured `site`
- Add Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type` (`website`), `og:site_name`
- Add Twitter Card tags: `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`
- Add `<meta name="theme-color" content="#17514D">` (existing `--color-teal` token)
- Add `<script type="application/ld+json">` with `ProfessionalService` schema (name, description, url)

**3. `public/robots.txt`** (new file)
- Allow all crawlers, reference the sitemap URL

## Out of scope

- Designing/producing the actual OG image
- Physical address / phone in structured data (none exists on-site yet)
- Per-service or per-page structured data beyond the site-wide `ProfessionalService` block
