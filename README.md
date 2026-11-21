# Zentask — Responsive Single-Screen Homepage

A responsive, animated HTML/CSS/JavaScript recreation of the **provided Zentask homepage screenshot**. No frameworks or build step are required.

## Getting started

1. Extract the ZIP.
2. Open `index.html` in your browser, or run a local development server:
   ```bash
   python -m http.server 5500
   ```
3. Visit `http://localhost:5500`.

## Replace the three images

- **Background:** `assets/images/hero-background.svg`. A purple gradient/grid background is included, so the page works immediately. If you have your own background image, add it to `assets/images` and change `--hero-background-url` in `styles.css` to, e.g., `url("assets/images/my-background.webp")`.
- **Dashboard:** `assets/images/dashboard-preview.webp`. A preview image made from the screenshot you provided is included. Replace it with your actual dashboard image (or update the `src` attribute of `<img class="dashboard-image">` in `index.html`).
- **Logo:** `assets/images/zentask-logo.svg`. The logo is an SVG displayed using `<img>`. Replace the SVG file with your own logo, or update the header `<img>` path.

Use optimized `.webp`/`.avif` files for production when available, and add appropriate intrinsic `width`/`height` attributes in the HTML.

## Features

- Screenshot-inspired hero, gradient grid background, glowing particles, image-based logo and dashboard.
- Responsive desktop/mobile navigation, accessible dropdown menus, and Ionicons.
- Interactive Login, Start Free, Pricing, Blogs, FAQs, Features, About, and Contact demo dialogs.
- Interactive three-step product walkthrough and basic HTML form validation.
- Reduced-motion support, keyboard focus states, semantic landmarks, alt text, and accessible modal dialogs.
- Basic SEO: title, meta descriptions, robots, Open Graph/Twitter tags, Schema.org JSON-LD, `robots.txt`, favicon, and web manifest.
- Plain HTML5, CSS3, and vanilla JavaScript. No npm required.

## Production notes

**This is a static UI recreation, not a working task-management platform.** Login, registration, contact forms, and billing are intentionally demo-only. Integrate a backend before collecting real information.

When you publish, set your real domain in a canonical link and change `og:image` and `twitter:image` to absolute HTTPS URLs. Generate a sitemap at your published domain if needed. `site.webmanifest` uses root-relative paths for a root deployment, so adjust these if publishing under a subdirectory.

Ionicons and Google Fonts are loaded from external CDNs; an internet connection is needed to load them initially. The UI remains usable with local fallback fonts.

## Files

```text
zentask-homepage/
├─ index.html
├─ styles.css
├─ script.js
├─ README.md
├─ robots.txt
├─ site.webmanifest
└─ assets/
   ├─ icons/favicon.svg
   └─ images/
      ├─ hero-background.svg
      ├─ zentask-logo.svg
      ├─ dashboard-preview.webp
      ├─ og-preview.jpg
      └─ apple-touch-icon.png
```
