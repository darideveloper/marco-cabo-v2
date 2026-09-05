## Context

Checkout currently posts `POST /api/sales/` via `src/libs/api/sales.ts:createSale` → `src/libs/common/fetchData.ts` with `{vehicle, service_type, location, client_name, client_last_name, client_email}` and redirects to `data.payment_link` (`CheckoutModal.tsx:200-212`). The Django API was updated to accept optional `vip_code: CharField(max_length=10, writeOnly, required=False)` in `SaleSerializer` (`travels/serializers.py:66-89`) validated as `trim() + iexact + active=True`; empty/`null`/whitespace/missing maps to `None` (`validate_vip_code:70-76`), invalid maps to `401 { status:"error", message:"Invalid VIP code", errors:{vip_code}}` (`views.py:118-126`, atomic, no Stripe call). `GET /sales/?stripe_code=` now returns `vip_code: string|null` (`views.py:83`). No dedicated validation endpoint exists; verification is coupled to sale creation. UI uses shared `Modal.tsx`, Tailwind 4, and Zustand `mainFormStore.ts`.

## Goals / Non-Goals

**Goals:**
- Expose an optional VIP code input in the existing checkout modal with minimal layout/API churn.
- Mirror server normalization (`maxLength=10`, trim on blur+submit, case-insensitive acceptance) and omit the key when empty.
- Surface `401` for an invalid/inactive VIP code as a persistent inline field error with the longer copy while preserving the entered value for editing; valid/empty proceeds silently to Stripe.
- Persist the code across modal close/reopen and expose it on the confirmation order summary when present.

**Non-Goals:**
- Live or debounced VIP validation, separate endpoint, or client-side allowlist of codes.
- Discount, price, or Stripe link mutation; `vip_code` is tracking only.
- Global `fetchData` rewrite or `PUBLIC_TOKEN_KEY` exposure change.
- Editing the VIP code on the confirmation page.

## Decisions

**D1 — Inline optional field after Email in `CheckoutModal.tsx` (recommended).** Reuses the existing `Your information` stack (`space-y-3`) and input pattern (`w-full px-4 py-2.5 border rounded-lg focus:ring-red/70`). Label `VIP code (optional)` (`placeholder="e.g. VIP123"`) keeps terminology aligned with API error `Invalid VIP code`. Alternatives: collapsible "Have a code?" disclosure (extra click, a11y cost) and pre-modal `InfoCards` placement (scatters concern) were rejected.

**D2 — State in `mainFormStore.ts` (`vipCode: string` + `setVipCode` + `clearVipCode` helper).** Persists across modal close (`CheckoutButton isModalOpen` local state) and trip/vehicle changes like `contact*`; cleared only after a successful `201` before `window.location.assign` (and VIP never affects `isFormValid`). Local `useState` in the modal would lose the value on accidental close.

**D3 — Payload normalization.** `const vip = vipCode.trim(); const payload = { ..., ...(vip ? { vip_code: vip } : {}) }`. All empty shapes (`""`, `"   "`, `null`, missing) collapse to omission, which the server already treats as `None` (`post_create_empty_vip_code.bru:44`). Client enforces `maxLength=10`; server `CharField(max_length=10)` remains the authority. Case is passed as typed (server `iexact` handles `vip123` → `VIP123`). VIP never affects `isFormValid`; empty is valid.

**D4 — Narrow `401` handling in the modal, no global `fetchData` change.** `fetchData.ts:33-43` currently returns JSON on any HTTP status (non-JSON → text), so `401 JSON` arrives intact. Branch on `response.errors?.vip_code` or `message === "Invalid VIP code"` (and `status==="error"`), set a dedicated `vipFieldError: string|null` rendered under the VIP input with red border + `aria-describedby`. Generic `submitError` stays for `400`/network. Valid/empty → `201` → silent redirect; no intermediate success check/toast, matching explore decision A.

**D5 — Types + confirmation display.** `CreateSalePayload: vip_code?: string` (omit when empty), `SaleData: vip_code: string|null` + `client.last_name: string|null` (actual `GET` shape `vip_code:null` / `last_name:null`). `confirmation/[token].astro` conditionally renders a `VIP code` row in the order summary when `saleData.vip_code` is non-null.

## Risks / Trade-offs

- [401 shape sensitivity] Server `401` is reused for token/stripe-code/VIP (`get_by_stripe_code_not_found.bru:25` vs `post_create_invalid_vip_code.bru:43`); checking `errors.vip_code` is the discriminating signal — could miss if backend changes the key → Mitigation: also check `message === "Invalid VIP code"` and fall through to generic error.
- [fetchData non-JSON 401] Non-JSON `401` would return `string` and break `response.errors` check → Mitigation: keep `catch` → generic `setSubmitError`; do not broaden `fetchData` scope in this change.
- [Max length UX] Client `maxLength=10` truncates paste >10; backend would otherwise `400` → Mitigation: enforce client limit and surface remaining server `400` generically.
- [Confirmation leakage] `Sale ID: {stripe_code}` is already shown and token appears in canonical URL; adding `VIP code` row does not broaden exposure → Mitigation: unchanged, out of scope.
- [State staleness] `vipCode` survives navigation → Mitigation: reset after successful sale; no cross-sale leakage.

## Migration Plan

1. Land type/store changes (`sales.ts`, `mainFormStore.ts`).
2. Land UI + error branch (`CheckoutModal.tsx`) and confirmation row (`[token].astro`).
3. Deploy with no backend change; feature degrades to no-op if `vip_code` is ignored (server ignores unknown fields only if not validated — current serializer will accept omission).
4. Rollback by reverting the four frontend files; no data migration.

## Open Questions

- None blocking. Copy is locked to the longer string: "The VIP code you entered is invalid or inactive. Please correct it or clear the field to continue to payment."
