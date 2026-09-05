## ADDED Requirements

### Requirement: VIP code collection
The checkout modal SHALL offer an optional VIP code field alongside the contact information, reusing the existing input pattern.

#### Scenario: VIP code field present
- **WHEN** the checkout modal is open
- **THEN** a field labeled `VIP code (optional)` is shown in the `Your information` section after Email
- **AND** it has `placeholder="e.g. VIP123"` and `maxLength=10`

#### Scenario: Empty or whitespace VIP code is ignored
- **WHEN** the VIP code is empty, whitespace-only, or cleared
- **AND** the user clicks Continue with otherwise valid contact fields and selection ids
- **THEN** the system omits `vip_code` from the `createSale` payload

#### Scenario: Valid VIP code is sent trimmed
- **WHEN** the VIP code contains non-empty trimmed text
- **AND** the user clicks Continue
- **THEN** the system calls `createSale({ vehicle, service_type, location, client_name, client_last_name, client_email, vip_code })` (POST /sales/) where `vip_code` is the trimmed input (case preserved; server validates `iexact`)
- **AND** server normalization (`trim`, `iexact`, `active=True`, `max_length=10`) is treated as the source of truth

#### Scenario: Input normalization on blur
- **WHEN** the VIP code input loses focus with surrounding whitespace
- **THEN** the value is trimmed in `mainFormStore.vipCode` for display

#### Scenario: VIP code is optional and does not block submission
- **WHEN** the VIP code is empty or filled
- **THEN** `isFormValid` and the Continue enablement are unchanged (VIP never blocks submission; only `401 Invalid VIP code` surfaces a field error after submit)

#### Scenario: VIP code persists across modal close
- **WHEN** the checkout modal is closed and reopened without a successful sale
- **THEN** the previously entered `vipCode` remains in `mainFormStore` and is shown in the input
- **AND** after a successful `201` before Stripe redirect, `vipCode` is cleared from the store

### Requirement: VIP code validation via sale creation
The system SHALL validate the VIP code only through sale creation and surface an invalid/inactive code as a persistent inline field error, keeping the entered value for editing.

#### Scenario: Invalid or inactive VIP code
- **WHEN** `createSale` returns `401` with `{ status:"error", message:"Invalid VIP code", errors:{ vip_code } }` (Django `SaleSerializer.validate_vip_code` + `SaleViewSet.post`)
- **THEN** the modal stays open
- **AND** the VIP code input shows a field error `The VIP code you entered is invalid or inactive. Please correct it or clear the field to continue to payment.`
- **AND** the invalid value is preserved (not auto-cleared) with a red border and `aria-describedby`
- **AND** no redirect to Stripe occurs

#### Scenario: Valid or absent VIP code proceeds to Stripe
- **WHEN** `createSale` returns `201` with `{ status:"success", data:{ payment_link } }` (with or without a valid VIP code, or with `vip_code` omitted/`""`/`null`/whitespace)
- **THEN** the browser is redirected to that Stripe Payment Link
- **AND** no VIP success toast is shown (silent tracking)

#### Scenario: Other sale failures remain generic
- **WHEN** `createSale` returns `400` for other fields or a network failure occurs
- **THEN** the existing generic error handling applies (`Something went wrong…` / `response.message`) and the VIP field error is not shown

## MODIFIED Requirements

### Requirement: Contact information
The checkout modal SHALL collect the customer's first name, last name and email and validate them before submission.

#### Scenario: Invalid or incomplete contact fields
- **GIVEN** any contact field is empty or any selection id is missing
- **WHEN** the user clicks Continue
- **THEN** submission is blocked
- **AND** an inline validation message is shown

#### Scenario: Valid contact fields
- **GIVEN** all contact fields are filled and all selection ids are set
- **WHEN** the user clicks Continue
- **THEN** the system calls `createSale({ vehicle, service_type, location, client_name, client_last_name, client_email, vip_code })` (POST /sales/) where `vip_code` is included only when trimmed non-empty
