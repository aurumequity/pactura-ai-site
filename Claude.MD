# Pactura.ai Marketing Site — Claude Context

## What This Is
Public-facing marketing site for Pactura.ai — an AI-driven document
intelligence platform that helps legal, medical, financial, and healthcare
tech firms stay ahead of state privacy law and AI governance requirements
(notably the EU AI Act, enforceable Aug 2, 2026). A product of Aurum Equity
LLC. Primary CTA is a free compliance & AI risk scan, not a demo request.

## Tech Stack
- Plain HTML, CSS, JavaScript — single self-contained `index.html`
  (all CSS inline in a `<style>` block, no external stylesheet or JS file)
- Hosted on GitHub Pages (deployed from `main` branch, legacy build, no
  Actions workflow)
- Domain: pactura.ai — CNAME file points to `www.pactura.ai`; apex
  `pactura.ai` 301-redirects to `www.pactura.ai` (both covered by the TLS
  cert). DNS registrar was previously noted as Spaceship — reconfirm if
  making DNS changes.
- Repo: aurumequity/pactura-ai-site (this repo — not pactura-ai-app, which
  is the separate Next.js/API/Firebase product monorepo)

## Contact Information
- Email: hello@pactura.ai
- Phone: (703) 202-0088
- Entity: Aurum Equity LLC (parent company, do not remove)

## Brand Identity
- Light mode only — cream background (`--bg: #faf7f1`), never dark mode
- Headings: Fraunces (serif); body: Inter (sans) — both via Google Fonts
- Core palette (CSS custom properties in `:root`): `--navy` (#16202e,
  primary ink/CTA color), `--brass` (#9c7a2e, accent), `--brass-deep`,
  `--brass-tint`, `--bg`, `--bg-alt`, `--ink`, `--ink-soft`, `--ink-muted`,
  `--line`. Do not rename or hardcode over these — use the variables.
- Four industry-card accent colors, each a `--mark-bg`/`--mark-fg`/
  `--card-accent` triplet set on a modifier class: `.legal` (brass),
  `.medical` (clay/rust), `.financial` (teal), `.healthtech` (olive)
- Aesthetic: editorial/trust-driven, generous whitespace, 6px button
  radius, 10-14px card radius — not a "defense tech" or high-density look

## Current Site Structure
`index.html` is the single file. Sections in order:
1. Header/nav — logo, Industries, How it works, Aurum Equity link,
   Contact, "Free risk scan" CTA button
2. Hero — headline on privacy law/AI governance urgency, lead paragraph,
   two CTAs, hero-note (Aurum Equity/SAM.gov credibility line), and a
   navy hero-panel listing what the free scan finds
3. Why Now — three-stat grid (20 states privacy law, Aug 2 2026 EU AI Act
   deadline, most firms lack compliance staff)
4. Industries (`#industries`) — four cards: Legal, Medical, Financial,
   Healthcare tech
5. How it works (`#how`) — three-step process
6. Scan (`#scan`) — navy `scan-card` with the `scan-form` lead form
7. Footer (`#contact`) — brand, email, phone, copyright

## Scan Form — Placeholder State
`#scan-form`'s submit handler (inline `<script>` at the bottom of the
file) only calls `preventDefault()` and reveals a hidden
`#scan-form-note` message: "Scan requests open soon — check back
shortly." There is no fetch/POST call and no backend endpoint wired up.
Wiring this to a real endpoint is tracked in
https://github.com/aurumequity/pactura-ai-site/issues/1 — do that work
there, don't silently add a webhook URL as a side effect of an unrelated
change.

## Copy Rules
- No semicolons in user-facing copy
- Em dashes ("—") are used throughout — fine to keep using them here
  (this supersedes any earlier "no em dash" note)
- Audience is legal/medical/financial/healthtech firms, not federal
  contractors — CMMC/federal-contractor framing from an earlier version
  of this site no longer applies
- Lead with the privacy-law/AI-governance urgency angle and the free
  risk scan, not "audit-ready" federal-procurement language

## Constraints
- Plain HTML/CSS/JS only — no frameworks, no npm, no build step
- All changes committed to `main` deploy automatically via GitHub Pages
- Mobile responsive — test at 375px, 768px, 1280px (breakpoints already
  defined at 860px and 1024px in the stylesheet)
- Treat the current design and copy as ground truth, not a starting
  point to redesign — confirm with the user before changing fonts, the
  `:root` custom properties, industry-card accent colors, or spacing/
  radius values
- `styles.css` and `main.js` in this repo are leftovers from a prior
  design and are not referenced by the current `index.html` — don't
  assume they're live
