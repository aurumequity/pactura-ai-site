# Pactura.ai Marketing Site — Claude Context

## What This Is

Public-facing marketing site for Pactura.ai — an AI-powered document
intelligence platform for regulated and mission-critical workflows,
serving legal, medical, financial, healthcare tech, and government/
public-sector organizations. Compliance and AI governance (notably the
EU AI Act, enforceable Aug 2, 2026, and the state privacy law patchwork)
are one capability area within a broader document-intelligence identity,
not the whole product. A product of Aurum Equity LLC, a SAM.gov-registered
small business. Primary CTAs are "Request a demo" and "Run a document risk
assessment" (both route to the same `#demo` intake). This repositioning
(away from an earlier compliance-scan-first identity) was made 2026-09-09
at the user's explicit direction, superseding the prior CTA/audience
framing below.

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

- Email: info@pactura.ai
- Phone: (404) 383-1519
- Entity: Aurum Equity LLC (parent company, do not remove)

## Brand Identity

- Light mode only — cream background (`--bg: #faf7f1`), never dark mode
- Headings: Fraunces (serif); body: Inter (sans) — both via Google Fonts
- Core palette (CSS custom properties in `:root`): `--navy` (#16202e,
  primary ink/CTA color), `--brass` (#9c7a2e, accent), `--brass-deep`,
  `--brass-tint`, `--bg`, `--bg-alt`, `--ink`, `--ink-soft`, `--ink-muted`,
  `--line`. Do not rename or hardcode over these — use the variables.
- Five industry-card accent colors, each a `--mark-bg`/`--mark-fg`/
  `--card-accent` triplet set on a modifier class: `.legal` (brass),
  `.medical` (clay/rust), `.financial` (teal), `.healthtech` (olive),
  `.government` (slate navy)
- Aesthetic: editorial/trust-driven, generous whitespace, 6px button
  radius, 10-14px card radius — not a "defense tech" or high-density look

## Current Site Structure

`index.html` is the single file. Sections in order:

1. Header/nav — logo, Capabilities, Industries, How it works, Mission
   (impact.html), Aurum Equity link, Contact, "Request a demo" CTA button
2. Hero — "AI-Powered Document Intelligence for Regulated and
   Mission-Critical Workflows" headline, capability tagline (Document
   processing / Workflow automation / Compliance / AI governance), short
   lead, two CTAs ("Request a demo", "Run a document risk assessment"),
   hero-note (Aurum Equity/SAM.gov credibility line), and a navy
   hero-panel listing what a document risk assessment finds
3. What Pactura Does — short 2-paragraph plain-language product summary
4. Why Now — three-stat grid (20 states privacy law, Aug 2 2026 EU AI Act
   deadline, most organizations lack compliance staff)
5. Core Platform Capabilities (`#capabilities`) — five capability cards:
   Intelligent Document Processing, AI-Assisted Document Analysis,
   Human-in-the-Loop Validation, Workflow Automation, Auditability and
   Governance
6. Industries (`#industries`) — five cards: Legal, Medical, Financial,
   Healthcare tech, Government
7. Government and Public-Sector Applications (`#government`) — intro
   paragraph, 12-item potential-applications list, integration note
8. How it works (`#how`) — four-step process: Intake, AI processing,
   Human review, Structured output
9. Security & Responsible AI (`#security`) — substantiated-claims-only
   two-column section plus an R&D-focus panel
10. Technical Architecture (`#architecture`) — four-item ingestion/
    processing/review/delivery grid
11. Aurum Equity band — navy callout linking out to Aurum Equity
12. Demo/assessment (`#demo`) — navy `scan-card` with the embedded Tally
    form (see below)
13. Footer (`#contact`) — brand, email, phone, copyright

## Demo/Assessment Form — Embedded Tally Form

The `#demo` section embeds a Tally form (`data-tally-src` on an
`<iframe>`, form id `A7Q4yz`) rather than a native HTML form. The inline
`<script>` at the bottom of the file lazy-loads `tally.so/widgets/embed.js`
and swaps in the iframe `src` once loaded. `impact.html`'s "Get involved"
cards open the same Tally form (`A7Q4yz`) directly via `data-tally-open`
modal attributes. There is no Web3Forms integration in the current file
(an earlier version used Web3Forms directly; that has been fully replaced
by the Tally embed).

## Copy Rules

- No semicolons in user-facing copy
- No em dashes ("—") and no colons used as sentence connectors in
  user-facing copy (this supersedes the earlier "em dashes are fine"
  note) — they read as AI-generated to the user, so use periods or
  commas instead. Decorative uses (e.g. the "—" list-bullet character
  in `.industry-card li::before` / `.dash-list li::before`) are a design
  element, not prose, and are unaffected.
- Audience is legal/medical/financial/healthtech firms and government/
  public-sector organizations (agencies, primes, research organizations).
  The earlier "not federal contractors, CMMC framing no longer applies"
  rule has been reversed as of 2026-09-09 — government/public-sector is
  now an explicit, first-class audience alongside the commercial verticals
- Lead with the document-intelligence identity (capability tagline:
  document processing, workflow automation, compliance, AI governance).
  Compliance/privacy-law urgency is supporting content (the "Why Now"
  stats, the Security & Responsible AI section), not the primary framing
- Security/Responsible AI claims must be things Pactura can actually
  substantiate — favor "designed to support" / "designed to help map"
  phrasing over unqualified compliance guarantees (e.g. "HIPAA-conscious
  document workflows," not "HIPAA-compliant")

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
