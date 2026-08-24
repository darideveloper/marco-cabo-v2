# Booking Specification

## Purpose
The booking flow lets a customer compose a transfer on the home page: choose a trip
type (One Way / Round Trip), a vehicle, and a destination (Hotel or Villa/AirBnB),
then see the live price. All selections are shared across the page via the
`mainFormStore` Zustand store so the pricing card and checkout stay in sync.

## Requirements

### Requirement: Trip selection
The system SHALL let the user pick a trip type (service type) and keep the selection
synchronized with the booking store.

#### Scenario: Trip options loaded from backend
- **GIVEN** service types are fetched from `GET /service-types`
- **WHEN** the Trips section renders
- **THEN** each service type is shown as a selectable card
- **AND** the first trip is selected and written to `selectedTrip`/`selectedTripName` by default

#### Scenario: User selects a different trip
- **WHEN** the user clicks a trip card
- **THEN** the card is highlighted
- **AND** `setSelectedTrip(id, name)` stores the trip id and name in `mainFormStore`

### Requirement: Vehicle selection
The system SHALL let the user pick a vehicle from the fleet and keep the selection
synchronized with the booking store.

#### Scenario: Vehicles loaded from backend
- **GIVEN** vehicles are fetched from `GET /vehicles`
- **WHEN** the Vehicles section renders
- **THEN** each vehicle is shown as a card with its passenger capacity
- **AND** the first vehicle is selected and written to `selectedVehicleId`/`selectedVehicleName` by default

#### Scenario: User selects a vehicle
- **WHEN** the user clicks a vehicle card
- **THEN** the card is highlighted with the brand accent
- **AND** `setSelectedVehicle(id, name)` stores the vehicle id and name

#### Scenario: Vehicle image resolution
- **GIVEN** a vehicle named e.g. "Luxury SUV"
- **WHEN** the vehicle card renders
- **THEN** its image is resolved as `/images/vehicles/{name}.webp`

### Requirement: Destination selection
The system SHALL let the user choose a destination as either a Hotel or a
Villa/AirBnB, capturing a location id that the pricing and sale APIs accept.

#### Scenario: Hotel destination
- **GIVEN** hotel and location data fetched from `GET /hotels?page-size=1000`
- **WHEN** the user clicks the "Hotel" destination card
- **THEN** a searchable hotel selection modal opens
- **AND** confirming a hotel stores it, sets the location id to the hotel's location id, and clears any selected postal code

#### Scenario: Villa/AirBnB destination
- **GIVEN** postal codes fetched from `GET /postal-codes?page-size=1000`
- **WHEN** the user clicks the "Villa / AirBnB" destination card
- **THEN** a searchable postal code selection modal opens
- **AND** confirming a postal code stores it, sets the location id to the postal code id, and clears any selected hotel

#### Scenario: Destination changes scroll to pricing
- **WHEN** a hotel or postal code is confirmed
- **THEN** the page scrolls smoothly to the `#pricing-section`
- **AND** the selected hotel or postal code is shown on the destination card

### Requirement: Live pricing
The system SHALL fetch and display the price for the currently selected
trip, vehicle and destination, and publish it to the booking store.

#### Scenario: All selections made
- **GIVEN** `selectedTrip`, `selectedVehicleId` and `selectedLocationId` are all set
- **WHEN** the pricing card renders or any of those values change
- **THEN** the system calls `getPricing({ location, vehicle, service_type })`
- **AND** displays the returned price formatted as USD (`$ 1,234.56`)
- **AND** stores it via `setTotal` in `mainFormStore`

#### Scenario: Missing selection or API failure
- **GIVEN** any of the required ids is missing or the pricing request fails
- **WHEN** the pricing card renders
- **THEN** the price shows `$ 0.00`
- **AND** the total in the store is reset to `$ 0.00`