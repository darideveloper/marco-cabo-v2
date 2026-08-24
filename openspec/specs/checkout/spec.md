# Checkout Specification

## Purpose
Checkout lets a customer review their selected transfer, enter contact information,
and create a sale against the backend. The backend returns a Stripe Payment Link and
the user is redirected to Stripe to pay. The sale is later referenced on the
confirmation page by its `stripe_code`.

## Requirements

### Requirement: Checkout entry point
The system SHALL only allow checkout once the transfer is fully composed.

#### Scenario: Button disabled while incomplete
- **GIVEN** `selectedTrip`, `selectedVehicleId` or `selectedLocationId` is null
- **WHEN** the pricing section renders
- **THEN** the "Confirm your reservation" button is disabled

#### Scenario: Button enabled when complete
- **GIVEN** trip, vehicle and location are all selected
- **WHEN** the pricing section renders
- **THEN** the button is enabled
- **AND** clicking it opens the checkout modal

### Requirement: Review summary
The checkout modal SHALL show the composed transfer and the price before payment.

#### Scenario: Summary rows displayed
- **GIVEN** the checkout modal is open
- **THEN** Service Type, Vehicle, Destination and Total are shown
- **AND** the destination displays the selected hotel (`name - hotelName`) or postal code name

### Requirement: Contact information
The checkout modal SHALL collect the customer's first name, last name and email and
validate them before submission.

#### Scenario: Invalid or incomplete contact fields
- **GIVEN** any contact field is empty or any selection id is missing
- **WHEN** the user clicks Continue
- **THEN** submission is blocked
- **AND** an inline validation message is shown

#### Scenario: Valid contact fields
- **GIVEN** all contact fields are filled and all selection ids are set
- **WHEN** the user clicks Continue
- **THEN** the system calls `createSale({ vehicle, service_type, location, client_name, client_last_name, client_email })` (POST /sales/)

### Requirement: Payment redirection
The system SHALL send the customer to Stripe when the backend returns a payment link,
and handle success and failure gracefully.

#### Scenario: Payment link returned
- **WHEN** `createSale` resolves with `data.payment_link`
- **THEN** the browser is redirected to that Stripe Payment Link

#### Scenario: Success without payment link
- **WHEN** `createSale` resolves with status `success` and no payment link
- **THEN** the checkout modal closes

#### Scenario: Backend or network failure
- **WHEN** `createSale` fails or returns an error status
- **THEN** an error message is displayed in the modal
- **AND** the customer stays on the page to retry