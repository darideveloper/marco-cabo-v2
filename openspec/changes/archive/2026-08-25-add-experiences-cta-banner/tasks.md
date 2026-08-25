## 1. Home — Experiences CTA banner

- [x] 1.1 Create `src/components/organisms/ActivitiesBanner.astro`: full-width section with
  `banner-bottom.webp` background (Hero-style) and centered content — footer-size logo
  (`h-20 w-auto`, plain `<img>`, no link/hover), white subheading + body, and a red
  "GO TO ACTIVITIES" anchor styled like `LeaveReviewButton` pointing to
  `https://caboexperiences.com/experiences/` with `target="_blank"` and
  `rel="noopener noreferrer"`. Container uses doubled vertical padding (`py-32!`, 8rem).
  Verify: `npm run build` compiles; banner renders at the bottom of the home page in the
  dev server.
- [x] 1.2 Update `src/pages/index.astro`: replace the `Planning` import and `<Planning />`
  usage with `ActivitiesBanner`.
  Verify: `npm run build` passes; no `Planning` references remain on the home page.
- [x] 1.3 Fix the CTA hover animation: keep `data-aos="fade-up"` on a wrapper around the
  button instead of the button itself, because AOS's unlayered CSS overrides Tailwind's
  layered `hover:scale-105`/`hover:opacity-80` utilities.
  Verify: hovering the button applies `scale(1.05)` and `opacity(0.8)`.
- [x] 1.4 Replace the "CABO" text heading with the footer-size logo, without a link or
  hover effect, in the banner only.
  Verify: logo renders at `h-20 w-auto`, no `<a>` wraps it in the banner.
- [x] 1.5 Double the banner container vertical padding twice (`.container` default `2rem`
  → `py-16!` → `py-32!`).
  Verify: computed padding-top/bottom is `128px`; other sections unaffected.
- [x] 1.6 Manual QA on `/`: background image visible and full-width, content centered,
  button opens `https://caboexperiences.com/experiences/` in a new tab, section is
  responsive on mobile and desktop, no console errors.