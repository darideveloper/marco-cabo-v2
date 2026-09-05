## 1. API and store types

- [x] 1.1 Extend `CreateSalePayload` (`vip_code?: string`, omitted when empty) and `CreateSaleResponse` (`errors?: { vip_code?: string[] }` + existing `status/message/data.payment_link`) in `src/libs/api/sales.ts` to model `201` vs `401 Invalid VIP code` shapes from `bruno/collections/marco-cabo-api/sales/sales/post_create_*.bru` and payload omission when empty/whitespace.
- [x] 1.2 Extend `SaleData` in `src/libs/api/sales.ts` with `vip_code: string | null` and fix `client.last_name: string | null` to match `GET /sales/?stripe_code=` (`travels/views.py:83`).
- [x] 1.3 Add `vipCode: string` + `setVipCode` (+ optional `clearVipCode` helper) to `src/libs/store/mainFormStore.ts`, initial `""`, persisted across modal close like `contact*`.

## 2. Checkout modal — field and submission

- [x] 2.1 Insert optional VIP code field after Email in `src/components/molecules/CheckoutModal.tsx:147-163` (`label="VIP code (optional)"`, `id="vip-code"`, `placeholder="e.g. VIP123"`, `maxLength=10`, `inputMode="text"`, `autoComplete="off"`), reusing the existing `space-y-2` input pattern; wire to `useMainFormStore vipCode/setVipCode`.
- [x] 2.2 Implement blur normalization: `onBlur` trims and writes back `vipCode.trim()` to the store (mirror `serializers.py:74-76` `strip()`), keep case as typed for display.
- [x] 2.3 Add `vipFieldError: string | null` state and field-level error UI under the VIP input (red border `border-red-500 focus:ring-red/70`, `aria-invalid`, `aria-describedby="vip-code-error"`, `<p id="vip-code-error">` with longer copy) — do not auto-clear the value on error.
- [x] 2.4 Update the Continue handler (`onClick` at `CheckoutModal.tsx:189-227`): normalize `const vip = vipCode.trim()`, send `...(vip ? { vip_code: vip } : {})` to `createSale`, branch `401` with `errors?.vip_code` or `message === "Invalid VIP code"` (via typed `CreateSaleResponse.errors`) → `setVipFieldError("The VIP code you entered is invalid or inactive. Please correct it or clear the field to continue to payment.")` + focus `#vip-code` and keep modal open; valid/empty → clear `vipCode` in `mainFormStore` (or pending clear helper) then silent `window.location.assign(paymentLink)` with no toast; generic `400`/network → existing `setSubmitError`; clear `vipFieldError` on VIP input change/blur and on `onClose`; VIP does not affect `isFormValid`; verify via `bruno` matrix (minimal, valid `"  vip123  "`, empty `""`, invalid `FAKE999`).

## 3. Confirmation page — display

- [x] 3.1 Update `src/pages/confirmation/[token].astro:78-129` order summary to show `vip_code: string | null` from `SaleData`: when non-null render a row `VIP code: {saleData.vip_code}` in the same `flex justify-between border-b` pattern; when `null` omit the row; ensure `types` propagation covers `getSaleByStripeCode`.

## 4. Verification

- [x] 4.1 Run `npm run build` (and `npx astro check` if available) and manually check: (a) empty/whitespace VIP → `201` → Stripe, (b) invalid VIP → `401` inline field error preserved, (c) valid VIP with spaces/lowercase → `201` (tracking), (d) confirmation `GET ?stripe_code=` shows VIP row only when present (`bruno/collections/marco-cabo-api/sales/sales/get_by_stripe_code.bru:39-59`).
