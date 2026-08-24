# Confirmation Specification

## Purpose
After paying via Stripe, the customer returns to the confirmation page at
`/confirmation/[token]` where `token` is the sale's `stripe_code`. The page shows an
order summary and a travel itinerary form so the customer can submit their flight
details (arrival and, for round trips, departure) to complete the sale
(`POST /sales/done/`).

## Requirements

### Requirement: Sale lookup
The confirmation page SHALL resolve the sale for the given token and render an order
summary, or redirect/error when the token is missing or invalid.

#### Scenario: No token in URL
- **GIVEN** `/confirmation` is requested without a token
- **THEN** the server redirects to `/` with status 302

#### Scenario: Valid token
- **GIVEN** a token matching an existing sale
- **WHEN** `getSaleByStripeCode(token)` (GET /sales/?stripe_code=) returns success
- **THEN** the page renders the order summary (order id, service type, location, vehicle, client, paid total, stripe_code)

#### Scenario: Invalid or failed lookup
- **WHEN** the lookup fails or returns an error status
- **THEN** an error message is displayed on the page

#### Scenario: Search engines
- **GIVEN** the confirmation page
- **THEN** it is marked `noindex, nofollow` for search engines

### Requirement: Itinerary submission form
The system SHALL let the customer submit flight details to complete the sale, with
fields required depending on whether the trip is one way or round trip.

#### Scenario: One-way trip validation
- **GIVEN** the service type is not a round trip
- **WHEN** the form is submitted
- **THEN** first name, last name, phone, passenger count, arrival date/time/airline/flight number are required
- **AND** departure fields are not required and are omitted from the payload

#### Scenario: Round trip validation
- **GIVEN** the service type name includes "round"
- **WHEN** the form is submitted
- **THEN** departure date/time/airline/flight number are additionally required
- **AND** they are included in the payload

#### Scenario: Passenger limit
- **GIVEN** the selected vehicle has a maximum passenger count
- **WHEN** the form renders
- **THEN** the passengers input enforces that maximum
- **AND** the placeholder shows the max value

#### Scenario: Pre-filled client name
- **GIVEN** a sale is loaded
- **WHEN** the form renders
- **THEN** the client first and last names are pre-filled from the sale and read-only

#### Scenario: Successful submission
- **WHEN** the itinerary payload is accepted by `completeSale` (POST /sales/done/)
- **THEN** a thank-you video modal plays
- **AND** the page scrolls to the itinerary heading

#### Scenario: Failed or invalid submission
- **WHEN** the payload is incomplete or the request fails
- **THEN** a validation or generic error modal is shown
- **AND** no submission is made

### Requirement: Submit button reliability
The submit button SHALL never trigger submission when the form is invalid, including
on Safari where the `disabled` attribute is unreliable.

#### Scenario: Safari click on disabled button
- **WHEN** the user clicks the submit button while the form is invalid or submission is in progress
- **THEN** the click is explicitly prevented in the onClick handler
- **AND** no request is sent