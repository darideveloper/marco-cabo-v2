## MODIFIED Requirements

### Requirement: Sale lookup
The confirmation page SHALL resolve the sale for the given token and render an order summary, or redirect/error when the token is missing or invalid.

#### Scenario: No token in URL
- **GIVEN** `/confirmation` is requested without a token
- **THEN** the server redirects to `/` with status 302

#### Scenario: Valid token
- **GIVEN** a token matching an existing sale
- **WHEN** `getSaleByStripeCode(token)` (GET /sales/?stripe_code=) returns success
- **THEN** the page renders the order summary (order id, service type, location, vehicle, client, paid total, stripe_code)
- **AND** when `data.vip_code` is non-null, the summary also shows `VIP code: {vip_code}`; when `null`, the row is omitted

#### Scenario: Invalid or failed lookup
- **WHEN** the lookup fails or returns an error status
- **THEN** an error message is displayed on the page

#### Scenario: Search engines
- **GIVEN** the confirmation page
- **THEN** it is marked `noindex, nofollow` for search engines
