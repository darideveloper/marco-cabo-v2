# home Specification

## Purpose
TBD - created by archiving change add-experiences-cta-banner. Update Purpose after archive.
## Requirements
### Requirement: Experiences CTA banner

The home page SHALL render a full-width banner section at the bottom, replacing the former
Planning section, with `/images/banner-bottom.webp` as its background.

#### Scenario: Banner renders in place of Planning section

- **GIVEN** the home page loads
- **WHEN** the page is scrolled to the bottom
- **THEN** a full-width section with the `banner-bottom.webp` background image is displayed
- **AND** the former Planning section (YouTube video + "EXPERIENCES & VACATION PLANNING") is not rendered

#### Scenario: Responsive layout

- **WHEN** the banner renders on any viewport
- **THEN** the content is centered and the section spans the full width with a minimum height

### Requirement: Banner copy

The banner SHALL display the company logo at the same size as the footer (`h-20`), a white
subheading "Your Cabo Experience, Book It Today.", and a white body paragraph describing the
activities offer.

#### Scenario: All copy present

- **WHEN** the banner renders
- **THEN** the logo, subheading, and body text are displayed centered
- **AND** the subheading and body text are white

#### Scenario: Logo is not interactive

- **WHEN** the banner logo renders
- **THEN** the logo is not wrapped in a link
- **AND** the logo has no hover effect

### Requirement: Banner spacing

The banner container SHALL use doubled vertical padding (`py-32!`, 8rem) while keeping the
global `.container` padding unchanged.

#### Scenario: Vertical padding applied

- **WHEN** the banner renders
- **THEN** the container's top and bottom padding are 8rem
- **AND** other `.container`-based sections are unaffected

### Requirement: External CTA link

The banner SHALL include a red "GO TO ACTIVITIES" button that opens
`https://caboexperiences.com/experiences/` in a new tab.

#### Scenario: CTA opens activities site in new tab

- **GIVEN** the banner is displayed
- **WHEN** the user clicks the button
- **THEN** a new tab opens at `https://caboexperiences.com/experiences/`

