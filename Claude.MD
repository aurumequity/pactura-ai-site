# Pactura.ai Marketing Site — Claude Context

## What This Is

Public-facing marketing site for Pactura.ai, positioned as **AI Workflow
Intelligence**: "The intelligence layer between information and action."
Pactura understands incoming documents, requests, and data, applies
organizational rules, and sends structured information to the people and
systems that need it. The product model is
**Receive → Understand → Decide → Transform → Route → Audit**.

Compliance is one use case, not the product category. Pactura is
proprietary technology developed by Aurum Equity LLC (a SAM.gov-registered
small business). The site is about Pactura the product, not an Aurum
corporate site.

This direction comes from the Signal Flow redesign brief
(PACTURA_SITE_REDESIGN_BRIEF.md, adopted 2026-09-26). It supersedes the
2026-09-09 "document intelligence" positioning, the light-mode/brass visual
direction, and "Run a document risk assessment" as a primary CTA. All three
are retired.

## Tech Stack

- Plain HTML, CSS, JavaScript. No frameworks, no npm, no build step
- Multi-page static site. Every page links the shared `styles.css` and
  `main.js` (loaded with `defer`) plus a one-line inline head script that
  adds the `js` class to `<html>`
- Hosted on GitHub Pages (deployed from `main`, legacy build, no Actions
  workflow). Anything merged to `main` deploys, so redesign work happens on
  branches and is not pushed or merged without the user's approval
- Domain: pactura.ai. `CNAME` points to `www.pactura.ai`, apex 301s to www.
  Do not change `CNAME` or DNS
- Repo: aurumequity/pactura-ai-site. The product app is the separate
  `pactura-ai-app` repo (locally `~/Desktop/Repos.nosync/pactura-ai-app`).
  Never modify it and never reference its files at runtime

## Contact Information

- Email: info@pactura.ai
- Phone: (404) 383-1519
- Entity: Aurum Equity LLC (parent company, do not remove)

## Brand Identity (Signal Flow)

- Dark navy foundation with selective electric-blue accents. 70% enterprise
  trust, 20% technology, 10% visual impact. No neon, cyberpunk, crypto,
  heavy glow, heavy glassmorphism, or generic AI gradients
- Tokens live in `:root` at the top of `styles.css`. Use the variables, do
  not hardcode over them. Key values: `--bg #0b1020`, `--bg-alt #121a2b`,
  `--surface #162033`, `--text #eef2f8`, `--text-soft #b7c2d3`,
  `--text-muted #94a1b6`, `--accent #5cb8ff` (text accent),
  `--highlight #4cc3ff`, `--blue-strong #1d6fe0` (primary button fill)
- White text on the brief's `#1e90ff` is only 3.24:1, so buttons use
  `--blue-strong` (4.77:1). Check contrast before adding any new
  text/background pairing
- Headings: Fraunces (400/500). Body and UI: Public Sans (400/500/600).
  Both from Google Fonts. Keep families and weights to this set
- Wordmark: inline HTML/SVG (two converging lines into a node, plus
  "Pactura" and a blue ".ai"). There is no clean logo file yet. Do not use
  the generated logo PNGs from the app repo (baked-in checkerboard and
  watermark)
- Shape: 6px buttons, 10–14px cards and panels

## Site Structure

Primary nav: Platform, Use Cases, Solutions, Resources, About, Request a Demo.

Files:
- `index.html` — homepage
- `platform.html` — the six-step model and a capability row per step, each
  showing its current product capability and its workflow pattern
- `use-cases.html` — Marketing (`#marketing`), Public Relations
  (`#public-relations`), Government (`#government`), Compliance
  (`#compliance`), with illustrative structured-record panels
- `solutions.html` — seven problem and approach rows
- `resources.html` — four on-page explainers. No downloads, case studies,
  or placeholder categories until real ones exist
- `about.html` — why Pactura exists, `#mission` (moved from impact.html),
  and Aurum Equity (`#aurum-equity`)
- `impact.html` — legacy compatibility page. noindex, canonical to
  `about.html#mission`, meta refresh plus `location.replace`, and a visible
  link. Do not delete it until old links are checked
- Every page ends with the CTA band `#demo`, so static demo links are `#demo`
- Favicons: `favicon.ico`, `favicon.svg`, `favicon.png` (kept for old
  references), `assets/images/brand/apple-touch-icon.png`. All use the blue
  wordmark glyph. The old gold shield is retired
- `assets/images/{brand,hero,use-cases,about,backgrounds}/`,
  `assets/icons/icons.svg` (SVG sprite, used as
  `<svg class="icon"><use href="assets/icons/icons.svg#i-name"/></svg>`)

Homepage sections in order: hero, How it works (`#how`, six-step flow),
Use cases (`#industries`, four cards, government card is `#government`),
Integration (hub diagram plus a "where this stands today" note), Human
oversight (with the "Available today" panel `#capabilities`), final CTA
(`#demo`), footer.

**Legacy anchors** `#demo`, `#how`, `#capabilities`, `#industries`,
`#government` must keep existing on the homepage until external references
are checked.

## Demo CTA (Tally)

- Every "Request a Demo" link carries `data-demo`. `main.js` owns the form
  ID (`A7Q4yz`) in one constant, rewrites those links to the hosted
  fallback `https://tally.so/r/A7Q4yz`, loads the Tally script when idle,
  and opens the Tally popup on click. If the script is unavailable the link
  just navigates to the hosted form
- Never hardcode the form ID in HTML. Static `href`s point to `#demo` (or
  `index.html#demo` from other pages) so the page works without JavaScript
- The Tally form content is managed in Tally, not in this repo

## Product Honesty

Classify every capability claim as implemented, partial, or planned before
publishing. As of the 2026-09-26 app audit, the only things that may be
presented as available today are:

- organizations and role-based access
- document upload and versioning
- compliance gap checks (SOC 2, HIPAA, GDPR, CMMC, FINRA)
- anomaly detection
- document chat with citations
- version comparison
- remediation tasks
- audit logs and summaries
- evidence-package export

Not implemented, so present only as design direction: routing,
CRM/email or other system connectors, confidence scoring, lead or media
classification, general intake beyond document upload.

Status labels (text, never color alone):
- Homepage use-case cards use "Available today" (Compliance) and "Designed
  for this workflow" (Marketing, Public Relations, Government). The
  integration section keeps its "Where this stands today" disclosure
- Secondary pages use **Current product capability** (`.chip--live`) and
  **Workflow pattern** (`.chip`), defined in a legend near the top of
  Platform, Use Cases, and Solutions. Illustrative records say they are
  illustrative and name what is not available Never claim CRM or
case-management integration, per-field confidence scoring, ICD-10/CPT
tagging, customers, metrics, certifications, or government contracts.

## Copy Rules

- No semicolons in user-facing copy
- No em dashes and no colons used as sentence connectors in user-facing
  copy. They read as AI-generated. Use periods or commas
- Concise. Short paragraphs, strong headings, few cards. No "revolutionary",
  "game-changing", "cutting-edge" or similar
- Don't repeat the same trust statement in several sections
- Audiences: government agencies, enterprise, marketing and communications,
  public relations, compliance and regulated organizations, procurement and
  administrative operations
- Security and compliance claims use "designed to support" phrasing, never
  unqualified guarantees (e.g. never "HIPAA-compliant")

## Constraints

- Mobile-first. Breakpoints in `styles.css` are 640px, 960px (desktop nav),
  and 1200px. Test at 375, 768, and 1280 with no horizontal scroll
- Accessibility: semantic landmarks, one `h1`, logical heading order,
  visible `:focus-visible` rings, `alt=""` on decorative images, real text
  (not color alone) for status
- Motion is restrained and plays once (no infinite loops). Reveal-on-scroll
  only hides content after `main.js` adds `reveal-ready`, and everything
  respects `prefers-reduced-motion`
- Images are WebP at two widths with `srcset`, explicit `width`/`height`,
  and `loading="lazy"` below the fold. Source masters stay outside the repo
  in the Desktop `public/assets/photos/brand/` folder. Never use the
  `crops/` or `mockups/` folders there
- Confirm with the user before changing fonts, `:root` tokens, or the
  overall visual direction
