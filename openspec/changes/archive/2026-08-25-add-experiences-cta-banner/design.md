## Context

The home page currently ends with the Planning section (`src/components/organisms/Planning.astro`
rendering `PlanningCards.tsx`: a YouTube video card and a "EXPERIENCES & VACATION PLANNING"
card with a "START PLANNING NOW" button). It no longer fits the marketing direction. We want
to replace it, at the same position, with a text-only promotional banner linking to the
external activities site, without deleting the existing components.

The repo is Astro 5 SSR with atomic design (`src/components/{atoms,molecules,organisms,utils}`),
server-first data fetching, and Tailwind 4 with brand tokens (`red` = `#F92905`). Static
marketing sections are `.astro` organisms (`Hero.astro`, `InfoCards.astro`). External link
buttons follow the anchor pattern in `LeaveReviewButton.tsx`. AOS is globally initialized by
`src/components/utils/AOSinit.jsx`.

## Goals / Non-Goals

**Goals:**
- Remove the Planning section from the home page render without deleting components.
- Add a full-width, responsive, text-only CTA banner in the same position (bottom of home page).
- Reuse existing repo patterns: `.astro` organism, `Hero`-style background image, anchor
  button styling, AOS.

**Non-Goals:**
- No deletion of `Planning.astro`, `PlanningCards.tsx`, `PlanningCard.tsx`, or `VideoCard.tsx`.
- No new dependencies, no React island, no backend data (static section only).

## Decisions

### New static Astro organism: `src/components/organisms/ActivitiesBanner.astro`

- `<section>`: `w-screen relative bg-no-repeat bg-cover bg-center` with inline style
  `background-image: url('/images/banner-bottom.webp')` — same approach as `Hero.astro`.
- Decorative `<img src="/images/banner-bottom.webp" alt="" class="sr-only" loading="lazy">`
  for SEO/a11y (matches the Hero pattern).
- Inner `.container` (`max-width: 1350px`, auto-centered, base padding `2rem 1rem`): a flex
  column `flex flex-col items-center justify-center text-center gap-4` with
  `min-h-[320px] lg:min-h-[400px]` to give the banner presence (image is a 2000x933 strip),
  and `py-32!` (8rem) vertical padding — doubled twice from the `.container` default for
  extra breathing room. The `!` (important) is required because `.container` in
  `global.css` is unlayered and would otherwise beat Tailwind's layered `py-*` utility.
- Content, centered:
  - Logo: a plain `<img src="/images/logo.webp" class="h-20 w-auto object-contain">`
    wrapped in the footer logo's padded div (`flex items-center justify-center px-8 py-3
    rounded-[20px]`) for visual parity — **not** the `Logo` atom, so the banner logo has
    no link and no hover effect (user decision).
  - Subheading `<p class="text-white font-bold text-xl lg:text-2xl">Your Cabo Experience, Book It Today.</p>`.
  - Body `<p class="text-white text-base lg:text-lg max-w-2xl">Explore activities, build your
    selection, and we'll reach out to confirm availability and finalize the details.</p>`.
  - CTA `<a href="https://caboexperiences.com/experiences/" target="_blank"
    rel="noopener noreferrer">` with the red-button classes from `LeaveReviewButton.tsx`:
    `inline-flex items-center justify-center bg-red text-white font-bold uppercase px-6 py-3
    rounded-lg transition-all duration-300 hover:scale-105 hover:opacity-80`.
- `data-aos="fade-up"` on wrapper divs around the text blocks, consistent with existing
  sections. **The `data-aos` attribute is placed on a wrapper, never on the button itself**:
  AOS's CSS (`[data-aos=fade-up]{transform:...}`, `.aos-animate{opacity:1;transform:...}`)
  is unlayered and overrides Tailwind's layered `hover:scale-105`/`hover:opacity-80`
  utilities (unlayered CSS always wins over `@layer utilities`), which broke the button's
  hover effect.

### Swap in `src/pages/index.astro`

- Replace the `Planning` import and `<Planning />` usage with `ActivitiesBanner`
  (same position, after `GoogleReviews`).

### Decisions on open choices

- **No dark overlay**: the `banner-bottom.webp` image is trusted as-is for white-text
  legibility (user decision). No `bg-black/60` overlay.
- **Logo scale**: the logo renders at footer size (`h-20 w-auto`), not the replaced
  "CABO" heading scale (user decision).
- **Logo without link/hover**: the banner logo is a plain `<img>`, not the `Logo` atom,
  so it is non-interactive (no link to `/`, no hover scale/opacity) (user decision).
- **Vertical padding**: the banner container doubles the `.container` default vertical
  padding twice (`py-32!`, 8rem). Scoped to the banner via `!`; the global `.container`
  is untouched (user decision).
- **No `ButtonLink` atom**: a single-use inline anchor avoids a new abstraction (YAGNI).
  If a second external-link button appears later, extract an atom then.
- **CTA text "GO TO ACTIVITIES"** uppercase, matching the red-button family
  (`ButtonAction`, `PlanningCard`).

## Risks / Trade-offs

- **Legibility**: if `banner-bottom.webp` is light, white body text may have low contrast.
  Mitigation options (if observed): add a `bg-black/50` overlay or a text-shadow. Low risk,
  cheap to add after visual QA.
- **Dead code**: `Planning.astro` and its card components become unused, joining the repo's
  existing dead-code list (`AGENTS.md`). Intended per user request; candidates for deletion
  in a future cleanup.
- **Static copy/URL**: the CTA URL and copy are hardcoded in the organism. Fine for a
  one-off marketing section; move to `src/libs/constants/` if reused elsewhere.