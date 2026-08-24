# SEO Specification

## Purpose
Every page emits a complete SEO head: HTML meta tags, Open Graph and Twitter cards,
a canonical URL, JSON-LD structured data for the local business, and search-engine
instructions (robots, sitemap, robots.txt). The layout additionally injects the
analytics tags (Google Tag Manager, gtag, Umami) used to measure site traffic.

## Requirements

### Requirement: Layout analytics tags
The site layout SHALL include Google Tag Manager, gtag, and Umami tracking scripts.

#### Scenario: Analytics injected on every page
- **GIVEN** any page renders through `Layout.astro`
- **WHEN** the head is emitted
- **THEN** the Google Tag Manager script and noscript iframe, the gtag config script, and the Umami script are present

### Requirement: Page metadata
Each page SHALL emit a title, description, author, and optional robots meta tag.

#### Scenario: Home page title
- **GIVEN** the current page is the home page
- **WHEN** the head is emitted
- **THEN** the title is the brand name with the tagline "The Best Private Transportation and Vacation Planning in Los Cabos"

#### Scenario: Non-home page title
- **GIVEN** the current page is not the home page
- **WHEN** the head is emitted
- **THEN** the title is "{Page Name} | {Brand}"

#### Scenario: Robots instructions
- **GIVEN** a page provides a robots value (e.g. the confirmation page uses `noindex, nofollow`)
- **WHEN** the head is emitted
- **THEN** a robots meta tag with that value is rendered

### Requirement: Social sharing tags
Each page SHALL emit Open Graph and Twitter card metadata.

#### Scenario: Open Graph tags
- **WHEN** the head is emitted
- **THEN** og:type, og:title, og:description, og:url, og:image, and og:site_name are rendered
- **AND** the type maps from the schema type (LocalBusiness -> website)

#### Scenario: Twitter tags
- **WHEN** the head is emitted
- **THEN** twitter:card (summary_large_image), site, title, description, image, and creator are rendered

### Requirement: Canonical URL
Each page SHALL declare its canonical URL when one is provided.

#### Scenario: Canonical provided
- **GIVEN** a canonical URL is passed to the SEO component
- **WHEN** the head is emitted
- **THEN** a canonical link tag with that URL is rendered

### Requirement: Structured data
Each page SHALL emit JSON-LD describing the business as a LocalBusiness schema entity.

#### Scenario: LocalBusiness JSON-LD
- **WHEN** the head is emitted
- **THEN** a `script type="application/ld+json"` block is rendered with the business name, description, URL, logo, email, contact phone, opening hours (24/7), founding date, geo coordinates, address, service area, aggregate rating, and same-as social links

### Requirement: Sitemap and robots.txt
The site SHALL expose a sitemap and a robots.txt that references it.

#### Scenario: Sitemap generated
- **GIVEN** the sitemap integration is configured with `site`
- **WHEN** the site builds
- **THEN** a sitemap index is generated

#### Scenario: robots.txt served
- **WHEN** `/robots.txt` is requested
- **THEN** the response allows all crawlers
- **AND** references the sitemap index URL