# RevSageAI — Marketing site

Single-page marketing site for **RevSageAI** — psychology-driven AI for B2B
revenue teams. Static HTML/CSS/JS, no build step. Deploy anywhere.

> **Sell to the mind, not the funnel.**

---

## What's on the page

1. Announcement bar (dismissible, persists in localStorage)
2. Sticky nav with mobile hamburger
3. Hero — headline + live personality profile mock card + animated grid
4. Logo bar
5. Stats strip — `+30%` / `−25%` / `70%`
6. Problem framing — top rep vs. bottom rep
7. Approach — 3 pillars (Read · Tune · Coach)
8. **DISC** buyer types — defends DISC as the operator-grade framework
9. **Buying-committee map** (beta) — Mobilizer / Guide / Skeptic / Talker / Blocker / Friend
10. How it works — Connect → Profile → Coach
11. Channel rewriter — 4-tab demo (email · LinkedIn · call · follow-up)
12. **Compare** — RevSage vs. Outreach, Salesloft, Apollo, Gong, Clay
13. **Integrations** — 12-cell stack grid
14. Customer voices — 3 testimonials with metrics
15. **Security & compliance** — SOC 2, GDPR, encryption, residency, SSO
16. **FAQ** — 8 CRO-grade objections answered (`<details>` accordion)
17. Manifesto
18. CTA — email + company form, Calendly fallback
19. Footer

---

## Run locally

```bash
# Any static server works
python3 -m http.server 8080
# or
npx serve
```

Open `http://localhost:8080`.

---

## Deploy

### Vercel
```bash
vercel
```
`vercel.json` is preconfigured: static deploy, security headers, immutable
caching for assets.

### Netlify
Drag the folder into the Netlify dashboard, or:
```bash
netlify deploy --prod
```

### GitHub Pages
Push to `main`, enable Pages on the root directory.

### Cloudflare Pages
`Build command:` *(none)* — just point at this directory.

---

## Pre-launch deploy checklist

- [ ] Replace `https://revsage.ai/` with your actual production domain in
  `index.html` (`<link rel="canonical">`, OG tags, JSON-LD), `sitemap.xml`,
  and `robots.txt`.
- [ ] Wire the CTA form to a real backend (Loops, Resend, HubSpot, or your
  own webhook). It currently shows a client-side success state.
- [ ] Replace customer logo text with real SVG logos when permission cleared.
- [ ] Confirm `og.svg` renders correctly in LinkedIn / X / Slack previews.
  Some platforms prefer PNG — export 1200×630 PNG from the SVG if needed.
- [ ] Run Lighthouse — target ≥ 95 on Performance, Accessibility, SEO, Best
  Practices.

---

## File structure

```
RevSage-website-/
├── index.html       # All sections in one file
├── styles.css       # Design tokens + components (v1 + v2 additions)
├── script.js        # Tabs, scroll-reveal, parallax, announcement, mobile nav
├── og.svg           # 1200×630 social preview
├── robots.txt
├── sitemap.xml
├── package.json
├── vercel.json
├── .gitignore
└── README.md
```

---

## Design system

### Colors (CSS variables in `styles.css`)

| Token            | Value      | Used for                          |
|------------------|------------|-----------------------------------|
| `--bg`           | `#F6F4FB`  | Page background (soft lavender)   |
| `--bg-2`         | `#FFFFFF`  | Cards, footer, logo bar           |
| `--bg-tint`      | `#EDE9FE`  | Badges, chip backgrounds          |
| `--ink`          | `#1F1B2E`  | Headings, primary text            |
| `--ink-soft`     | `#4F4A63`  | Body text                         |
| `--muted`        | `#8B8597`  | Captions, labels                  |
| `--violet`       | `#7C3AED`  | Primary CTA, links, accents       |
| `--violet-2`     | `#6D28D9`  | CTA hover                         |
| `--pink`         | `#D946EF`  | Gradient mid-stop                 |
| `--pink-2`       | `#EC4899`  | Gradient end-stop                 |
| `--grad`         | `linear-gradient(135deg, #EC4899, #D946EF, #7C3AED)` | Logo, headlines, hero CTA card |

To restyle the entire site, change these variables. Everything else cascades.

### Typography
- **Display:** Fraunces (variable serif, `opsz` + `SOFT` axes)
- **Body:** Geist
- **Mono / labels:** Geist Mono

Loaded from Google Fonts — no local font files.

---

## Customizing content

All copy lives in `index.html`. Search by section ID:

| ID | Section |
|---|---|
| `#approach` | 3 pillars |
| `#disc` | DISC buyer types |
| `#committee` | Buying-committee map |
| `#how` | How it works |
| `#product` | Channel rewriter |
| `#compare` | Competitor comparison |
| `#integrations` | Integration grid |
| `#voices` | Testimonials |
| `#security` | Security & compliance |
| `#faq` | FAQ accordion |
| `#cta` | Email form |

The personality profile in the hero (`<div class="psych-card">`) and the
channel rewriter sidebar both reference the same buyer mock — change once
in each.

---

## Known TODOs

- [ ] Wire the CTA form to a real backend (Loops, Resend, HubSpot)
- [ ] Replace customer logo text with actual SVG logos when available
- [ ] Add a 1200×630 PNG fallback for `og.svg` (some social platforms prefer raster)
- [ ] Add a video element in the product section once the UI is recordable
- [ ] Add a `/blog/` index when content is ready

---

## Browser support

Modern evergreen browsers. Uses:
- CSS custom properties
- CSS `clamp()`, grid, flexbox, `mask-image`
- `IntersectionObserver` (with fallback)
- Variable fonts
- `<details>` / `<summary>` (FAQ accordion — universal)

No polyfills needed for Chrome/Edge/Safari/Firefox last 2 versions.

---

## License

Proprietary © RevSageAI. All rights reserved.
