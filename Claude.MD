# Pactura.ai Marketing Site — Claude Context

## What This Is
Public-facing marketing website for Pactura.ai, a CMMC compliance automation
platform for federal contractors. First touchpoint for federal buyers, primes,
and subcontractors. Every design and copy decision must communicate trust,
authority, and technical credibility.

## Tech Stack
- Plain HTML, CSS, JavaScript
- Hosted on GitHub Pages (deployed from main branch)
- Domain: pactura.ai (DNS via Spaceship)
- Repo: aurumequity/pactura-ai-app (or confirm repo name)

## Contact Information
- Email: info@pactura.ai
- Phone: (703) 202-0088
- Entity: Aurum Equity LLC (parent company, do not remove)

## Brand Identity
- Primary Navy: #1a2a4a
- Secondary Navy: #3b5998
- Background: #0A1628
- Gold Accent: #C9A84C
- Aesthetic: Defense Tech — sharp corners (4px max), high information density
- Always dark mode — never light mode
- No blue accents anywhere — navy and gold only
- Logo files:
    pactura-logo-dark.png — use on light surfaces and emails
    pactura-logo-transparent.png — use on dark/navy surfaces

## Current Site Structure
index.html is the single file. Current sections in order:
1. Nav — Aurum Equity logo, How It Works, Industries, Request Demo
2. Hero — "Govern AI before regulators govern it for you"
3. The Problem — 4 pain point cards
4. Who We Serve — Legal, Healthcare, Financial Services, Insurance
5. The Platform — 4 feature pillars
6. Early Access — demo request form and waitlist
7. Footer — email, copyright, Aurum Equity LLC

## Required Updates (additive only, do not remove existing content)

### Nav
- Replace Aurum Equity logo with Pactura.ai navy/gold logo
  (pactura-logo-transparent.png, height 40px)
- Add "Sign In" button linking to https://app.pactura.ai
  styled in gold border, navy background

### Who We Serve — add a fifth card
- Icon: shield or lock
- Title: Federal Contractors
- Body: Automate CMMC Level 2 compliance documentation.
  Pactura.ai turns raw contract PDFs into audit-ready evidence
  packages — with immutable logs on every AI action.

### Platform Status section — insert after "The Platform"
Title: "What We Have Built"
Four items:
- Team Management with RBAC — Analyst, Auditor, and Viewer
  roles enforced at the API layer
- Immutable Audit Logging — every action timestamped and
  tamper-evident, no record can be deleted
- AI Document Analysis — gap detection, anomaly flagging,
  and risk scoring on federal procurement documents
- Evidence Package Export — one-click audit-ready PDF
  generation for CMMC assessors

### Roadmap section — insert after Platform Status
Title: "What Is Coming"
Four items:
- Ensemble AI Validation — multiple models cross-check
  findings, disagreements flagged for human review
- Auditor Portal — view-only access to evidence packages
  for external CMMC assessors
- Compliance Delta — version comparison between document
  v1 and v2 with change highlighting
- Benchmarking — org compliance scores compared against
  industry vertical averages

### Footer
- Replace: procurement@aurumequitylegacy.com
  With: info@pactura.ai
- Replace: 205-643-2714
  With: (703) 202-0088
- Replace: aurumequitylegacy.com
  With: pactura.ai

## Positioning Statement (use verbatim in Roadmap section)
"Our roadmap includes ensemble AI validation where multiple
models cross-check each other's findings. Disagreements are
automatically flagged for human review — that is a level of
AI governance most platforms do not offer."

## Copy Rules
- No em dashes in any copy — use "—" only if already present
- No semicolons in user-facing copy
- Federal contractors are the primary audience
- CMMC Level 2 is the anchor compliance framework
- Lead with auditability and evidence packaging
- "Audit-Ready" is the phrase that resonates most with buyers

## Constraints
- Plain HTML/CSS/JS only — no frameworks, no npm, no build step
- All changes committed to main branch deploy automatically
- Mobile responsive — test at 375px, 768px, 1280px
- Dark mode only throughout
- All changes are additive — do not remove or restructure
  existing sections
- Do not change the demo request form behavior