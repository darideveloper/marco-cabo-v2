## Why

The Django sales API now supports an optional `vip_code` (tracking-only, `writeOnly`, `CharField(max_length=10)` validated as `trim + iexact + active=True`). The Astro frontend has no UI, type, or error handling for it: `CreateSalePayload` and `CheckoutModal` omit the field, and `SaleData` hides `vip_code`, so invalid codes cannot be surfaced to the user and tracking is invisible on confirmation.

## What Changes

- Add an optional **VIP code** field to the checkout buy popup (`CheckoutModal.tsx` "You're almost there / Review your transfer details") reusing existing `Modal` + Tailwind input pattern.
- Mirror API normalization: `maxLength=10`, trim on blur and submit, case-insensitive acceptance (API `iexact`), omit key when empty/whitespace.
- Persist the code in `mainFormStore` across modal close/reopen; clear on successful sale (before Stripe redirect).
- Extend `createSale` to send `vip_code?: string` and handle `401 Invalid VIP code` with a longer inline field error while keeping the entered value for editing; valid/empty proceeds silently to Stripe.
- Update `SaleData` and `GET /sales/?stripe_code=` handling to include `vip_code: string | null` (and `client.last_name: string | null`), and show the VIP code on `/confirmation/[token]` when non-null.

## Capabilities

### New Capabilities
- _None — this is an extension of existing flows._

### Modified Capabilities
- `checkout`: checkout modal now collects an optional VIP code and handles the dedicated `401` for an invalid/inactive code.
- `confirmation`: sale lookup renders the VIP code on the order summary when the sale has one.

## Impact

- Frontend: `src/libs/api/sales.ts`, `src/libs/store/mainFormStore.ts`, `src/components/molecules/CheckoutModal.tsx`, `src/pages/confirmation/[token].astro` (+ `SaleData` typing).
- Backend contract unchanged; relies on existing `POST /api/sales/` `401` with `{ errors: { vip_code } }` and `GET` `vip_code` shape (`bruno/collections/marco-cabo-api/sales/**`).
- No new dependencies, no schema migration, no env changes.

## Non-goals

- No live VIP validation endpoint, debounce, or pre-check; single `POST /sales/` remains the validator.
- No discount/pricing logic; `vip_code` is tracking only.
- No `fetchData` global overhaul or `PUBLIC_TOKEN_KEY` exposure change.
- No confirmation-page editing of the VIP code.
