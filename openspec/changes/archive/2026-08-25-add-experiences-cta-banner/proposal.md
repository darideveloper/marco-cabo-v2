## Why

The "EXPERIENCES & VACATION PLANNING" section (video card + planning card) at the bottom of
the home page no longer matches the marketing direction. We want to replace it with a
full-width promotional banner that highlights Cabo experiences and drives traffic to the
external activities site.

## What Changes

- Stop rendering the Planning section (`PlanningCards`: YouTube video + "EXPERIENCES &
  VACATION PLANNING" card) on the home page. Components stay in the codebase, unused.
- Add a new static, text-only CTA banner in the same position (bottom of the home page):
  - `/images/banner-bottom.webp` as a full-width background image.
  - Centered copy: the company logo at footer size (`h-20`, rendered without a link or
    hover effect), a white subheading "Your Cabo Experience, Book It Today.", and a white
    body paragraph describing the activities offer.
  - A red "GO TO ACTIVITIES" button linking to `https://caboexperiences.com/experiences/`
    in a new tab, with a hover scale/opacity effect.
  - The banner container uses doubled vertical padding (`py-32!`, 8rem) for extra
    breathing room.

## Capabilities

### New Capabilities

- `home`: Home page marketing/CTA sections. This change introduces the Experiences CTA
  banner rendered at the bottom of the home page.

### Modified Capabilities

- None. No existing requirement behavior changes; the removed Planning section was not
  covered by a baseline spec.

## Impact

- **Code**:
  - NEW `src/components/organisms/ActivitiesBanner.astro` (static Astro organism).
  - EDIT `src/pages/index.astro` — replace `Planning` import/usage with `ActivitiesBanner`.
- **Untouched**: `Planning.astro`, `PlanningCards.tsx`, `PlanningCard.tsx`, `VideoCard.tsx`
  remain in the repo but are no longer used.
- **Dependencies**: none added. Reuses existing patterns (Hero background image,
  LeaveReviewButton anchor styling, AOS).
- **Backend/API**: no changes.

## Non-goals

- No deletion of `Planning.astro`, `PlanningCards.tsx`, `PlanningCard.tsx`, or `VideoCard.tsx`.
- No new backend data, no new dependencies, no React island (static section only).
- No changes to other pages, the booking flow, or the confirmation flow.