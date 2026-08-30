# Higher Development — Design System

The brand and product design system for **Higher Development**, an overseas education & visa consultancy that runs on a **white-label CRM platform**. The system covers two surfaces:

1. **Marketing site** — the public study-abroad consultancy homepage (`Higher Development`): hero, services, destinations, testimonials, enquiry.
2. **Client CRM** — the white-label staff portal behind the login: role-based dashboards (Admin / Agent / Case Manager), case pipelines, tasks, communication, invoices, reporting. Every tenant re-skins the company name + logo; defaults ship as *HigherOS / Client CRM*.

> The two surfaces share one visual language — rose→blue gradients, blue-900 headings, slate neutrals, Geist type — but diverge in mood: the marketing site is photographic and airy; the CRM is a glassy "portal wash" workspace.

## Sources

This system was reverse-engineered from the product's real codebase — read these to go deeper:

- **Codebase:** `white-label-crm/` (Next.js 15 + Prisma + Tailwind v4). Key reads: `src/app/globals.css` (portal theme + sidebar), `src/components/home/` (marketing sections + `content.ts`), `src/app/login/page.tsx`, `src/app/dashboard/` (portal shell + role dashboards), `src/lib/case-stage.ts` + `src/lib/task-status-styles.ts` (tone logic), `src/lib/brand.ts`.
- **GitHub:** https://github.com/Drukpa77/white-label-crm — explore this repo to build richer, more accurate designs against the real product (schema, workflows, and additional screens not recreated here).

The reader is not assumed to have access to the above; values here are self-contained. If you do have access, the codebase is the ultimate source of truth.

---

## CONTENT FUNDAMENTALS

**Voice — two registers, one brand.**

*Marketing (student-facing):* warm, reassuring, outcome-focused. Second person ("**your** study abroad journey"), active verbs, concrete promises. Confidence without hype. Example headline: *"Making Your Study Abroad Journey a Success Story."* Sub-copy is plain and practical: *"We help students choose the right course, prepare stronger applications, and move through visa steps with confidence and practical timelines."*

*Product (staff-facing):* terse, operational, instructional. Imperative labels ("Claim inquiry", "Download Weekly Manager Report", "Sign in to Client CRM"). Explains what a screen does in one line: *"Every active client in the system — unclaimed, claimed by you, claimed by another agent, or delegated to case managers."*

**Casing.** Title Case for buttons and section headings ("Enquire now", "Visa Outcomes"). Sentence case for descriptions and helper text. UPPERCASE only for the small tracked eyebrow kickers ("ADMISSIONS + VISA EXECUTION") and stat labels.

**Numbers & proof.** Compact, honest stat strips: `1,000+ students guided · 95%+ visa success · 2 offices · 1–2 day response`. Percentages and counts, never vague superlatives.

**Terminology.** "Clients" and "cases" (not "leads"), "case managers"/"agents", "case stage", "visa lodgment", "OSHC", "SOP", "COE", "GTE". Australian/British spelling in product data ("Enrolment", "Lodgment", "specialise") — keep it.

**Emoji.** Used **only** for country flags on study destinations (🇦🇺 🇨🇦 🇮🇳) — plus one deliberate exception: the workflow-notifications bell renders 🔔 as its icon. Never in buttons or body copy.

**Tone check.** Supportive, credible, never salesy or jokey. The student is anxious about a big life step; the staff user is busy. Reduce both people's uncertainty.

---

## VISUAL FOUNDATIONS

**Color.** A dual-accent brand: **rose** (`#f43f5e`) + **blue** (`#2563eb` / deep `#1e3a8a`), almost always meeting in a gradient. Rose owns eyebrows, primary-CTA warmth, and danger; blue owns headings, links, deep sections, and trust. **Violet** (`#7c3aed`) appears as the sidebar-active gradient end and the "payment" stage tone. **Slate** is the entire neutral system (bg `#f8fafc`, body `#475569`, ink `#0f172a`). The HD monogram is **cyan** (`#1796c6`) — used *only* on the logo, never in UI. Semantic tones: info=blue, progress=amber, payment=violet, success=emerald, danger=rose, neutral=slate.

- **Signature gradients.**
- **Primary CTA:** `linear-gradient(90deg, rose-500, blue-600)` with a rose glow shadow. Every "Enquire", "Sign in", "Sign out".
- **Sidebar active:** `linear-gradient(135deg, blue-600, violet-600)` + blue glow.
- **Chat:** lighter `rose-400 → blue-400` — chat FAB, chat window headers, send button.
- **Portal wash:** rose + blue radial gradients over `#f8fafc` — the CRM's ambient background.
- **Hero protection:** blue-900 left-to-right gradient over the photo so white text stays legible.
- **Platform admin:** dark `slate-900 → slate-800` hero panel — the only dark surface, marking super-admin territory.

**Type.** **Geist** (sans) for everything; **Geist Mono** for numerics, references, and step numbers. Headings are bold, tight tracking (`-0.01em`), blue-900. Fluid hero (`clamp(2.2rem, 5.5vw, 4rem)`) and section titles (`clamp(1.5rem, 3.2vw, 2.4rem)`). Body 16px at 1.7 line-height, slate-600. The eyebrow is the signature type detail: 12px, semibold, UPPERCASE, `letter-spacing: 0.22em`, rose-500.

**Spacing & layout.** 4px base grid. Marketing container `min(100% - 3.5rem, 1180px)`, centered; sections use `padding-block: clamp(3.5rem, 8vw, 6.5rem)`. CRM is a fixed 16rem glass sidebar + fluid main capped at 1400px. Generous whitespace on marketing; denser, information-rich on the CRM.

**Backgrounds.** Marketing alternates white and slate-50 section bands, with one full-bleed photographic hero (Sydney at dusk — warm purple/pink sky, cool water; imagery skews *warm dusk / aspirational travel*). CRM uses the translucent portal wash + frosted glass panels (`backdrop-filter: blur(16px)`). No repeating textures or noise beyond a barely-there 2%-opacity grid line overlay on the hero.

**Corners & cards.** Radii step: `0.25rem` (marketing buttons) → `0.5rem` (inputs, small cards) → `0.75rem` (cards, sidebar links) → `1rem` (panels) → `1.5rem` (login shell) → `full` (pills, badges, avatars, nav). The base card is **white, 1px slate-200 border, `shadow-sm`, `radius-lg`** — never a heavy drop shadow. One sanctioned exception: **reminder cards** use a `4px` left-border severity accent (blue/amber/red) on a tinted bg — reserve that pattern for reminders only.

**Elevation.** Soft, low, blue-tinted shadows: `shadow-sm` (resting cards), `shadow-card`/`shadow-md` (portal cards), `shadow-lift` (hover / mobile nav), `shadow-modal` (login shell), plus colored glows — rose for CTAs, blue for the active sidebar link.

**Motion.** One easing curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`. Fades + short upward slides (`y: 24 → 0`, 0.75s) on hero entrance; 2.2s word rotator in the hero; nav shrinks/solidifies on scroll (0.35s); partner logos marquee. All motion respects `prefers-reduced-motion`. No bounces, no parallax, no infinite decorative loops on content.

**Interaction states.**
- *Hover:* cards lift `translateY(-4px)` + upgrade to `shadow-md`; gradient CTAs `brightness(1.08)`; secondary/outline buttons fill with their border color; neutral buttons go slate-50; nav pills gain a translucent background.
- *Press/active:* nav pills and filter chips snap to the solid/gradient selected state.
- *Focus:* `2px` blue-500 outline, `2px` offset (or a rose focus ring on form inputs — `border rose-400` + `0 0 0 1px rose-400`).
- *Disabled:* `opacity 0.6`, `cursor: not-allowed`.

**Transparency & blur.** Reserved for chrome that floats over content: the scrolled marketing nav (`rgba(255,255,255,0.95)` + blur), the CRM sidebar/topbar (`rgba(255,255,255,0.86)` + blur-16), the login shell (`rgba(255,255,255,0.85)` + blur). Content surfaces stay opaque white.

---

## ICONOGRAPHY

- **Primary set: [Lucide](https://lucide.dev)** — the app imports `lucide-react`; recreations load `lucide` from CDN. 1.5–2px stroke, rounded line icons. Common glyphs: `LayoutDashboard`, `FolderKanban`, `ShieldCheck`, `ClipboardList`, `Users`, `Trophy`, `BarChart3`, `FileX2`, `ArrowRight`, `Check`, `Phone`, `Menu`, `X`, `Bell`, `Search`, `MapPin`. Icons sit in small rose-50 rounded tiles on marketing feature cards, or inline (currentColor) in the CRM.
- **Flag emoji** for study destinations only (🇦🇺 🇨🇦 🇮🇳).
- **Logo:** the HD monogram (`assets/logo.png`) — a cyan outlined "HD" mark. Provided by the source; do **not** redraw it. When a tenant supplies no logo, the app falls back to `assets/logo-placeholder.svg` and renders the company name in type.
- **No** custom hand-drawn SVG iconography, no icon font, no PNG icon sprites. Stick to Lucide for anything new so weight/style stay consistent.

---

## Foundations, tokens & CSS

Consumers link one file: **`styles.css`** (an `@import` manifest). It pulls in:
- `tokens/fonts.css` — Geist & Geist Mono (Google Fonts CDN — see caveat).
- `tokens/colors.css` — base palette + semantic aliases + gradients.
- `tokens/typography.css` — families, scale, weights, tracking.
- `tokens/spacing.css` — 4px grid, radii, layout widths.
- `tokens/effects.css` — shadows, blur, motion curve/durations.

Specimen cards live in `foundations/` and populate the Design System tab (Colors, Type, Spacing, Brand groups).

## Components

Reusable React primitives (`window.HigherDevelopmentDesignSystem_76537a.<Name>`). Grounded in the patterns the product actually repeats:

**Core** (`components/core/`)
- **Button** — signature rose→blue gradient CTA; `secondary` (blue-900 outline), `neutral`, `ghost`, `danger`; sizes + `pill`.
- **Badge** — tone pill for case stages / task statuses (neutral · info · progress · payment · success · danger).
- **Card** — the base white surface with optional hover lift.
- **Field** — labeled input / select / textarea with the rose focus ring.
- **SectionHeading** — rose eyebrow + blue-900 title + slate subtitle.
- **Avatar** — initials circle (rose skin).

**App** (`components/app/`)
- **StatCard** — dashboard KPI tile.
- **SidebarLink** — nav item with icon, count, and blue→violet active state.
- **FilterButton** — saved-filter card button (label + count detail; gradient active state).
- **StageFilterChip** — case-stage filter pill (tone-tinted; active = solid slate-900).

**Data** (`components/data/`)
- **DataTable** — the app table: uppercase 11px headers on a tinted strip, 13px cells, hairline dividers.
- **BulkActionBar** — bulk-operations strip (action select + shared notes + apply).

**Platform admin** (`components/admin/`)
- **HeroPanel** — the dark slate-900 gradient hero with glass stat tiles (super-admin surfaces only).

**Feedback & communication** (`components/feedback/`)
- **InfoBanner** — inline tinted alert (success · error · warning · info).
- **RemindersCarousel** — dashboard reminders strip with severity left-border cards.
- **NotificationsBell** — 🔔 workflow bell with red badge + grouped, type-tinted dropdown.
- **ChatPopup** — gradient chat FAB + docked chat window (working input).

*Intentional additions:* none invented beyond what the source uses — the app is built from inline Tailwind, so these primitives codify its recurring patterns (the marketing `ui-primitives.tsx`, the sidebar CSS, the stat/badge patterns). An `Icon` helper is used inside cards/kits (Lucide wrapper) rather than shipped as a component.

## UI Kits

- **`ui_kits/marketing/`** — the study-abroad homepage (interactive).
- **`ui_kits/dashboard/`** — the white-label CRM staff portal (login → dashboard shell, overview / cases / tasks).

---

## Index (root manifest)

- `styles.css` — global entry (link this).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `guidelines/inventory.md` — **full design-system inventory**: all role surfaces (Super Admin, Admin, Agent, Case Manager, Applicant), component variants & states, page templates, interaction states, role-specific patterns, Figma organization + frontend mapping.
- `foundations/` — specimen cards: `color-*.html`, `type-*.html`, `spacing-scale.html`, `radii-shadows.html`, `brand-logo.html`, `brand-iconography.html`.
- `components/core/` — Button, Badge, Card, Field, SectionHeading, Avatar (+ `core.card.html`).
- `components/app/` — StatCard, SidebarLink, FilterButton, StageFilterChip (+ `app.card.html`).
- `components/data/` — DataTable, BulkActionBar (+ `data.card.html`).
- `components/admin/` — HeroPanel (+ `admin.card.html`).
- `components/feedback/` — InfoBanner, RemindersCarousel, NotificationsBell, ChatPopup (+ `feedback.card.html`).
- `ui_kits/marketing/` — `index.html`, `sections.jsx`, `README.md`.
- `ui_kits/dashboard/` — `index.html`, `dashboard.jsx`, `README.md`.
- `assets/` — `logo.png` (HD monogram), `logo-placeholder.svg`, `homepage_bg.png` (Sydney hero), `footer-bg.jpg`.
- `SKILL.md` — Agent-Skills wrapper.

## Caveats

- **Fonts:** Geist / Geist Mono are loaded from the **Google Fonts CDN** (the app self-hosts them via `next/font`). For offline/bundled use, swap the `@import` in `tokens/fonts.css` for self-hosted `@font-face`. No binaries are shipped in this project.
- **Logo:** used as provided; not redrawn. Cyan mark color is sampled (`#1796c6`).
