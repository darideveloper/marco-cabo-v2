# Reviews Specification

## Purpose
The site surfaces the business's Google reviews fetched server-side from the Google
Places API, rendered as a rating summary and a Swiper-based review slider. Reviewer
avatars that fail to load directly are retried through a first-party image proxy so
Google's hotlink protection doesn't break the UI.

## Requirements

### Requirement: Google Places data fetch
The system SHALL fetch the business's place details, including reviews, from the
Google Places API on the server.

#### Scenario: Successful fetch
- **GIVEN** `PUBLIC_GOOGLE_PLACES_API_KEY` and `PUBLIC_GOOGLE_PLACES_BUSINESS_ID` are configured
- **WHEN** the GoogleReviews section renders
- **THEN** the system requests `places.googleapis.com/v1/places/{businessId}` with the API key header and field mask
- **AND** the origin is sent as the referer so Google authorizes the request

#### Scenario: Missing configuration
- **WHEN** the API key or business id is not configured
- **THEN** an error is raised and the section renders a fallback message

#### Scenario: API failure
- **WHEN** the Google Places request fails or returns no reviews
- **THEN** the section renders a graceful "unable to load reviews" message instead of crashing the page

### Requirement: Rating summary
The system SHALL show the aggregate rating and review count from the Places response.

#### Scenario: Rating and count rendered
- **GIVEN** a successful Places response with rating and userRatingCount
- **WHEN** the GoogleReviews section renders
- **THEN** a 5-star visual, the numeric rating, and the review count are displayed

### Requirement: Review slider
The system SHALL display individual reviews in a swipeable slider with navigation,
pagination, and autoplay.

#### Scenario: Reviews rendered
- **GIVEN** at least one review in the Places response
- **WHEN** the slider renders
- **THEN** each review shows author name, star rating, relative publish time, and text
- **AND** the slider supports responsive slides (1 / 2 / 3 per view), custom prev/next buttons, clickable pagination, and autoplay

#### Scenario: Fewer than five reviews
- **GIVEN** fewer than five reviews exist
- **WHEN** the slider renders
- **THEN** reviews are duplicated until at least five slides are shown

#### Scenario: No reviews
- **WHEN** the reviews array is empty
- **THEN** the slider is not rendered

#### Scenario: Leave a review link
- **GIVEN** a place id is available
- **WHEN** the section renders
- **THEN** a "Leave a Review" link points to `search.google.com/local/writereview?placeid={id}`

### Requirement: Reviewer avatar fallback
The system SHALL handle reviewer avatars that fail to load, including Google hotlink
protection, without breaking the layout.

#### Scenario: Direct image fails
- **GIVEN** an avatar from `googleusercontent.com` or `google.com` fails to load directly
- **WHEN** the image errors
- **THEN** the image src is retried once through `/api/proxy-image?url={encoded}`

#### Scenario: Proxy fails too
- **WHEN** both the direct and proxied image fail
- **THEN** a neutral avatar placeholder is rendered

### Requirement: Image proxy
The system SHALL provide a first-party image proxy endpoint for Google images.

#### Scenario: Valid Google image URL
- **GIVEN** a GET request to `/api/proxy-image?url=...` with a URL containing `googleusercontent.com` or `google.com`
- **THEN** the endpoint fetches the image with a browser-like User-Agent and Referer
- **AND** returns it with the proper content type and a 24-hour cache header

#### Scenario: Invalid or missing URL
- **WHEN** the `url` parameter is missing or points outside Google domains
- **THEN** the endpoint returns a 400 response