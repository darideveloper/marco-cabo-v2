# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project overview

Marco Cabo v2 is the public website for **Mar Co. CABO**, a luxury airport-transfer and
vacation-planning company in Los Cabos, Mexico (SJD airport). It is an Astro 5 site with
React 19 islands and a 4-step booking flow:

1. Select a **trip** (One Way / Round Trip)
2. Select a **vehicle** (fleet from the backend)
3. Select a **destination** (Hotel or Villa/AirBnB postal code)
4. See the **live price**, then check out → backend creates a sale → redirect to a
   **Stripe Payment Link** → on return, submit the **flight itinerary** on `/confirmation/[token]`.

There is a separate Django REST backend (not in this repo) at
`PUBLIC_API_BASE_URL`. This repo only consumes it.

## Commands

```sh
npm run dev        # Astro dev server (localhost:4321)
npm run build      # Production build to ./dist/
npm run preview    # Preview the built site
```

- **Node >= 20.3.0**. Package manager is **npm** (`package-lock.json`).
- There is **no test suite, no linter, no typecheck script, and no CI**. The only
  verification available is `npm run build` (or `npx astro check` for type checks).
- Deploy: Nixpacks (`NIXPACKS_NIXPKGS=nodejs_20,npm-9_x` in `.env*`).

## Architecture

- **Astro SSR** with the Node `standalone` adapter; `src/pages/confirmation/[token].astro`
  is `prerender = false`, everything else is server-rendered.
- **Atomic design**: `src/components/{atoms,molecules,organisms,utils}`.
- **Server-first data**: backend data is fetched in `.astro` organisms and passed to
  React islands as props. Never fetch backend data client-side if it can be done server-side.
- **Interactive widgets** are React islands hydrated with `client:load` or
  `client:only="react"` (the booking selectors use `client:only`).
- **State**: Zustand stores at `src/libs/store/`:
  - `mainFormStore.ts` — booking flow (trip, vehicle, location, hotel, postal code, contact, total)
  - `confirmationFormStore.ts` — itinerary form (flight details, client info)
- **Styling**: Tailwind CSS 4 with custom theme tokens in `src/styles/global.css`
  (`red` = `#F92905` brand color; also `grey-dark`, `grey-light`, `red-light`, `red-lighter`).
- **Animations**: AOS (scroll reveal, initialized in `src/components/utils/AOSinit.jsx`),
  Swiper 12 (reviews slider in `GoogleReviewsSlider.tsx`).

## Key files

| Area | Files |
|---|---|
| Layout / analytics | `src/layouts/Layout.astro` (GTM, gtag, Umami inline) |
| Booking flow | `TripSelect.tsx`, `VehicleSelect.tsx`, `DestinationSelect.tsx`, `TripButton/VehicleCard/DestinationCard.tsx`, `HotelSelectModal.tsx`, `PostalCodeSelectModal.tsx` |
| Pricing | `src/components/organisms/InfoCards.astro`, `InfoCards.tsx`, `InfoCard.tsx` |
| Checkout | `CheckoutButton.tsx`, `CheckoutModal.tsx`, `ButtonSubmit.tsx`, `ButtonAction.tsx` |
| Confirmation | `src/pages/confirmation/[token].astro`, `ConfirmationForm.tsx`, `VideoModal.tsx`, `InfoModal.tsx` |
| Reviews | `GoogleReviews.astro`, `GoogleReviewsSlider.tsx`, `LeaveReviewButton.tsx`, `src/pages/api/proxy-image.ts` |
| SEO | `PageSEO.astro`, `base/BaseSEO.astro`, `src/pages/robots.txt.ts` |
| API layer | `src/libs/common/fetchData.ts`, `src/libs/api/*.ts` |
| Shared Modal | `src/components/molecules/Modal.tsx` (reuse this; do not build new modals from scratch) |
| Types | `src/types/types.d.ts` (global interfaces: `ServiceType`, `VehicleType`, `HotelsDataType`, `HotelDataType`, `PostalCodesType`) |

## API & data conventions

- All HTTP goes through `fetchData(url, options)` in `src/libs/common/fetchData.ts`.
  It prefixes `${PUBLIC_API_BASE_URL}/api`, adds `Authorization: Token ${TOKEN_KEY}`,
  JSON-stringifies bodies (FormData is special-cased).
- Endpoints used: `GET /service-types`, `GET /vehicles`, `GET /hotels?page-size=1000`,
  `GET /postal-codes?page-size=1000`, `GET /pricing?location&vehicle&service_type`,
  `POST /sales/` (returns `data.payment_link`), `GET /sales/?stripe_code=`,
  `POST /sales/done/`.
- Google Places reviews are fetched **server-side** in `GoogleReviews.astro` via
  `src/libs/api/places.ts` (send the page origin as `Referer`).
- Vehicle images are resolved as `/images/vehicles/{name}.webp` — new vehicles need a
  matching `.webp` in `public/images/vehicles/`.

## Environment variables

Defined in `.env` (dev) and `.env.production` (both gitignored). Never commit real values:

- `PUBLIC_BASE_URL`, `PUBLIC_API_BASE_URL`
- `PUBLIC_TOKEN_KEY` — Django token. `PUBLIC_*` vars are shipped to the browser by
  design; treat this as a read-scoped token.
- `PUBLIC_GOOGLE_PLACES_API_KEY`, `PUBLIC_GOOGLE_PLACES_BUSINESS_ID`

## OpenSpec workflow

This repo is spec-driven (see `openspec/`). Always drive changes through the workflow
below instead of editing code directly.

```text
/opsx:explore     (optional) think through the idea
/opsx:propose     create proposal + specs + design + tasks for the change
/opsx:apply       implement the tasks from tasks.md, ticking them off
/opsx:verify      confirm implementation matches the specs
/opsx:archive     merge the change into openspec/specs/ and file it away
```

- Baseline specs live in `openspec/specs/<capability>/spec.md` (`booking`, `checkout`,
  `confirmation`, `reviews`, `seo`). Read the relevant spec before changing behavior.
- New/modified requirement behavior goes in a change's delta `specs/` first, not straight
  into baseline specs.
- CLI: `openspec status --change <name>`, `openspec validate --all`.

## Gotchas & conventions

- **Round-trip detection** is a string match: `serviceTypeName.toLowerCase().includes('round')`
  in `ConfirmationForm.tsx`. It depends on backend naming.
- **Safari**: `ConfirmationForm.tsx` explicitly guards the submit button in `onClick`
  because Safari can ignore the `disabled` attribute. Keep that guard if you touch the form.
- **Dead code** currently present: `Menu.astro`, `SocialIcons.astro`, `SocialLink.astro`,
  `SocialIcon.astro`, `libs/api/example.ts`, `types/example.ts`; `sweetalert2` is an
  unused dependency. Don't extend these; remove them if you touch their area.
- **Hardcoded copy/values** exist (footer ©2025, JSON-LD rating 4.9/112, YouTube video IDs).
  When specs require dynamic values, prefer constants in `src/libs/constants/`.
- **Modal reuse**: use `Modal.tsx` with its props (`maxWidth`, `padding`, `borderRadius`,
  `animationDuration`, `allowOverflow`) rather than creating bespoke overlays.
- **Accessibility**: keep `aria-label`/`aria-pressed` on interactive cards and `sr-only`
  for decorative hero images (existing pattern).
- **Markdown/Spanish**: UI copy is English; content collection docs
  (`src/content/legal/`) are the source for legal pages.