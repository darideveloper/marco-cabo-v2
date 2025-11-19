// libs
import clsx from 'clsx'
import { useMemo, useEffect } from 'react'

// store
import { useConfirmationFormStore } from '../../libs/store/confirmationFormStore'

interface Props {
  className?: string
  defaultClientName?: string
}

export default function ConfirmationForm({ className, defaultClientName = '' }: Props) {
  const client_name = useConfirmationFormStore((state) => state.client_name)
  const passengers = useConfirmationFormStore((state) => state.passengers)
  const client_last_name = useConfirmationFormStore((state) => state.client_last_name)
  const client_phone = useConfirmationFormStore((state) => state.client_phone)
  const arrival_date = useConfirmationFormStore((state) => state.arrival_date)
  const arrival_time = useConfirmationFormStore((state) => state.arrival_time)
  const arrival_airline = useConfirmationFormStore((state) => state.arrival_airline)
  const arrival_flight_number = useConfirmationFormStore((state) => state.arrival_flight_number)
  const departure_date = useConfirmationFormStore((state) => state.departure_date)
  const departure_time = useConfirmationFormStore((state) => state.departure_time)
  const departure_airline = useConfirmationFormStore((state) => state.departure_airline)
  const departure_flight_number = useConfirmationFormStore((state) => state.departure_flight_number)
  const details = useConfirmationFormStore((state) => state.details)

  const setClientName = useConfirmationFormStore((state) => state.setClientName)
  const setPassengers = useConfirmationFormStore((state) => state.setPassengers)
  const setClientLastName = useConfirmationFormStore((state) => state.setClientLastName)
  const setClientPhone = useConfirmationFormStore((state) => state.setClientPhone)

  // Initialize client name with default value if provided and store is empty
  useEffect(() => {
    if (defaultClientName && !client_name) {
      setClientName(defaultClientName)
    }
  }, [defaultClientName, client_name, setClientName])
  const setArrivalDate = useConfirmationFormStore((state) => state.setArrivalDate)
  const setArrivalTime = useConfirmationFormStore((state) => state.setArrivalTime)
  const setArrivalAirline = useConfirmationFormStore((state) => state.setArrivalAirline)
  const setArrivalFlightNumber = useConfirmationFormStore((state) => state.setArrivalFlightNumber)
  const setDepartureDate = useConfirmationFormStore((state) => state.setDepartureDate)
  const setDepartureTime = useConfirmationFormStore((state) => state.setDepartureTime)
  const setDepartureAirline = useConfirmationFormStore((state) => state.setDepartureAirline)
  const setDepartureFlightNumber = useConfirmationFormStore((state) => state.setDepartureFlightNumber)
  const setDetails = useConfirmationFormStore((state) => state.setDetails)

  const isFormValid = useMemo(() => {
    return (
      client_name.trim().length > 0 &&
      passengers !== null &&
      passengers > 0 &&
      client_last_name.trim().length > 0 &&
      client_phone.trim().length > 0 &&
      arrival_date.trim().length > 0 &&
      arrival_time.trim().length > 0 &&
      arrival_airline.trim().length > 0 &&
      arrival_flight_number.trim().length > 0 &&
      departure_date.trim().length > 0 &&
      departure_time.trim().length > 0 &&
      departure_airline.trim().length > 0 &&
      departure_flight_number.trim().length > 0
    )
  }, [
    client_name,
    passengers,
    client_last_name,
    client_phone,
    arrival_date,
    arrival_time,
    arrival_airline,
    arrival_flight_number,
    departure_date,
    departure_time,
    departure_airline,
    departure_flight_number,
  ])

  return (
    <div className={clsx('space-y-6', className)}>
      <h3 className='text-xl font-bold text-gray-900 mb-4'>
        Additional Information
      </h3>

      {/* Client Information */}
      <div className='space-y-4'>
        <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>
          Client Information
        </h4>
        
        <div className='space-y-2'>
          <label
            className='text-sm font-medium text-gray-700'
            htmlFor='client-name'
          >
            First Name *
          </label>
          <input
            id='client-name'
            type='text'
            value={client_name}
            onChange={(e) => setClientName(e.target.value)}
            placeholder='e.g. Juan'
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
            required
          />
        </div>

        <div className='space-y-2'>
          <label
            className='text-sm font-medium text-gray-700'
            htmlFor='client-last-name'
          >
            Last Name *
          </label>
          <input
            id='client-last-name'
            type='text'
            value={client_last_name}
            onChange={(e) => setClientLastName(e.target.value)}
            placeholder='e.g. Pérez'
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
            required
          />
        </div>

        <div className='space-y-2'>
          <label
            className='text-sm font-medium text-gray-700'
            htmlFor='passengers'
          >
            Number of Passengers *
          </label>
          <input
            id='passengers'
            type='number'
            min='1'
            value={passengers || ''}
            onChange={(e) => setPassengers(e.target.value ? parseInt(e.target.value) : null)}
            placeholder='e.g. 2'
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
            required
          />
        </div>

        <div className='space-y-2'>
          <label
            className='text-sm font-medium text-gray-700'
            htmlFor='client-phone'
          >
            Phone Number *
          </label>
          <input
            id='client-phone'
            type='tel'
            value={client_phone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder='e.g. +52 5551234567'
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
            required
          />
        </div>
      </div>

      {/* Arrival Information */}
      <div className='space-y-4'>
        <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>
          Arrival Information
        </h4>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label
              className='text-sm font-medium text-gray-700'
              htmlFor='arrival-date'
            >
              Arrival Date *
            </label>
            <input
              id='arrival-date'
              type='date'
              value={arrival_date}
              onChange={(e) => setArrivalDate(e.target.value)}
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
              required
            />
          </div>

          <div className='space-y-2'>
            <label
              className='text-sm font-medium text-gray-700'
              htmlFor='arrival-time'
            >
              Arrival Time *
            </label>
            <input
              id='arrival-time'
              type='time'
              value={arrival_time}
              onChange={(e) => setArrivalTime(e.target.value)}
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
              required
            />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label
              className='text-sm font-medium text-gray-700'
              htmlFor='arrival-airline'
            >
              Arrival Airline *
            </label>
            <input
              id='arrival-airline'
              type='text'
              value={arrival_airline}
              onChange={(e) => setArrivalAirline(e.target.value)}
              placeholder='e.g. Aeroméxico'
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
              required
            />
          </div>

          <div className='space-y-2'>
            <label
              className='text-sm font-medium text-gray-700'
              htmlFor='arrival-flight-number'
            >
              Arrival Flight Number *
            </label>
            <input
              id='arrival-flight-number'
              type='text'
              value={arrival_flight_number}
              onChange={(e) => setArrivalFlightNumber(e.target.value)}
              placeholder='e.g. AM123'
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
              required
            />
          </div>
        </div>
      </div>

      {/* Departure Information */}
      <div className='space-y-4'>
        <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>
          Departure Information
        </h4>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label
              className='text-sm font-medium text-gray-700'
              htmlFor='departure-date'
            >
              Departure Date *
            </label>
            <input
              id='departure-date'
              type='date'
              value={departure_date}
              onChange={(e) => setDepartureDate(e.target.value)}
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
              required
            />
          </div>

          <div className='space-y-2'>
            <label
              className='text-sm font-medium text-gray-700'
              htmlFor='departure-time'
            >
              Departure Time *
            </label>
            <input
              id='departure-time'
              type='time'
              value={departure_time}
              onChange={(e) => setDepartureTime(e.target.value)}
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
              required
            />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label
              className='text-sm font-medium text-gray-700'
              htmlFor='departure-airline'
            >
              Departure Airline *
            </label>
            <input
              id='departure-airline'
              type='text'
              value={departure_airline}
              onChange={(e) => setDepartureAirline(e.target.value)}
              placeholder='e.g. Volaris'
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
              required
            />
          </div>

          <div className='space-y-2'>
            <label
              className='text-sm font-medium text-gray-700'
              htmlFor='departure-flight-number'
            >
              Departure Flight Number *
            </label>
            <input
              id='departure-flight-number'
              type='text'
              value={departure_flight_number}
              onChange={(e) => setDepartureFlightNumber(e.target.value)}
              placeholder='e.g. VO456'
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
              required
            />
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className='space-y-2'>
        <label
          className='text-sm font-medium text-gray-700'
          htmlFor='details'
        >
          Additional Details
        </label>
        <textarea
          id='details'
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder='Any additional information or special requests...'
          rows={4}
          className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900 resize-none'
        />
      </div>

      {!isFormValid && (
        <p className='text-sm text-red-600'>
          Please complete all required fields (marked with *) to continue.
        </p>
      )}
    </div>
  )
}

