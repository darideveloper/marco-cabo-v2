// libs
import clsx from 'clsx'
import { useMemo, useEffect, useState } from 'react'

// store
import { useConfirmationFormStore } from '../../libs/store/confirmationFormStore'
import { completeSale } from '../../libs/api/sales'

interface Props {
  className?: string
  defaultClientName?: string
  serviceTypeName?: string
  maxPassengers?: number
  stripeCode?: string
  clientEmail?: string
}

export default function ConfirmationForm({
  className,
  defaultClientName = '',
  serviceTypeName = '',
  maxPassengers = 0,
  stripeCode = '',
  clientEmail = '',
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Determine if this is a round trip based on service type name
  const isRoundTrip = useMemo(() => {
    if (!serviceTypeName) return false
    return serviceTypeName.toLowerCase().includes('round')
  }, [serviceTypeName])
  const client_name = useConfirmationFormStore((state) => state.client_name)
  const passengers = useConfirmationFormStore((state) => state.passengers)
  const client_last_name = useConfirmationFormStore(
    (state) => state.client_last_name
  )
  const client_phone = useConfirmationFormStore((state) => state.client_phone)
  const arrival_date = useConfirmationFormStore((state) => state.arrival_date)
  const arrival_time = useConfirmationFormStore((state) => state.arrival_time)
  const arrival_airline = useConfirmationFormStore(
    (state) => state.arrival_airline
  )
  const arrival_flight_number = useConfirmationFormStore(
    (state) => state.arrival_flight_number
  )
  const departure_date = useConfirmationFormStore(
    (state) => state.departure_date
  )
  const departure_time = useConfirmationFormStore(
    (state) => state.departure_time
  )
  const departure_airline = useConfirmationFormStore(
    (state) => state.departure_airline
  )
  const departure_flight_number = useConfirmationFormStore(
    (state) => state.departure_flight_number
  )
  const details = useConfirmationFormStore((state) => state.details)

  const setClientName = useConfirmationFormStore((state) => state.setClientName)
  const setPassengers = useConfirmationFormStore((state) => state.setPassengers)
  const setClientLastName = useConfirmationFormStore(
    (state) => state.setClientLastName
  )
  const setClientPhone = useConfirmationFormStore(
    (state) => state.setClientPhone
  )

  // Initialize client name with default value if provided and store is empty
  useEffect(() => {
    if (defaultClientName && !client_name) {
      setClientName(defaultClientName)
    }
  }, [defaultClientName, client_name, setClientName])
  const setArrivalDate = useConfirmationFormStore(
    (state) => state.setArrivalDate
  )
  const setArrivalTime = useConfirmationFormStore(
    (state) => state.setArrivalTime
  )
  const setArrivalAirline = useConfirmationFormStore(
    (state) => state.setArrivalAirline
  )
  const setArrivalFlightNumber = useConfirmationFormStore(
    (state) => state.setArrivalFlightNumber
  )
  const setDepartureDate = useConfirmationFormStore(
    (state) => state.setDepartureDate
  )
  const setDepartureTime = useConfirmationFormStore(
    (state) => state.setDepartureTime
  )
  const setDepartureAirline = useConfirmationFormStore(
    (state) => state.setDepartureAirline
  )
  const setDepartureFlightNumber = useConfirmationFormStore(
    (state) => state.setDepartureFlightNumber
  )
  const setDetails = useConfirmationFormStore((state) => state.setDetails)

  const isFormValid = useMemo(() => {
    const baseValidation =
      client_name.trim().length > 0 &&
      passengers !== null &&
      passengers > 0 &&
      client_last_name.trim().length > 0 &&
      client_phone.trim().length > 0 &&
      arrival_date.trim().length > 0 &&
      arrival_time.trim().length > 0 &&
      arrival_airline.trim().length > 0 &&
      arrival_flight_number.trim().length > 0

    // If round trip, also validate departure fields
    if (isRoundTrip) {
      return (
        baseValidation &&
        departure_date.trim().length > 0 &&
        departure_time.trim().length > 0 &&
        departure_airline.trim().length > 0 &&
        departure_flight_number.trim().length > 0
      )
    }

    // For one-way trips, only validate arrival fields
    return baseValidation
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
    isRoundTrip,
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid || !stripeCode || !clientEmail) {
      setSubmitError('Please fill in all required fields')
      return
    }

    if (!passengers || passengers <= 0) {
      setSubmitError('Please enter a valid number of passengers')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      // Build payload - only include departure fields if it's a round trip and they're filled
      const payload: any = {
        sale_stripe_code: stripeCode,
        passengers: passengers,
        client_email: clientEmail,
        client_last_name: client_last_name.trim(),
        client_phone: client_phone.trim(),
        arrival_date: arrival_date.trim(),
        arrival_time: arrival_time.trim(),
        arrival_airline: arrival_airline.trim(),
        arrival_flight_number: arrival_flight_number.trim(),
      }

      // Only add departure fields if it's a round trip and they have values
      if (
        isRoundTrip &&
        departure_date &&
        departure_time &&
        departure_airline &&
        departure_flight_number
      ) {
        payload.departure_date = departure_date.trim()
        payload.departure_time = departure_time.trim()
        payload.departure_airline = departure_airline.trim()
        payload.departure_flight_number = departure_flight_number.trim()
      }

      // Add details if provided
      if (details && details.trim().length > 0) {
        payload.details = details.trim()
      }

      const response = await completeSale(payload)

      if (response.status === 'success') {
        setSubmitSuccess(true)
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setSubmitError(
          response.message || 'Failed to submit the form. Please try again.'
        )
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'An error occurred while submitting the form. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('space-y-6', className)}
    >
      <h3 className='text-xl font-bold text-gray-900 mb-4'>
        Additional Information
      </h3>

      {submitSuccess && (
        <div className='bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg'>
          <p className='font-medium'>Success!</p>
          <p className='text-sm'>
            Your reservation details have been submitted successfully.
          </p>
        </div>
      )}

      {submitError && (
        <div className='bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg'>
          <p className='font-medium'>Error</p>
          <p className='text-sm'>{submitError}</p>
        </div>
      )}

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
            onChange={(e) =>
              setPassengers(e.target.value ? parseInt(e.target.value) : null)
            }
            placeholder={`max. ${maxPassengers}`}
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
            required
            max={maxPassengers.toString()}
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

      {/* Departure Information - Only show for Round Trip */}
      {isRoundTrip && (
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
      )}

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

      <div className='pt-4'>
        <button
          type='submit'
          disabled={!isFormValid || isSubmitting || submitSuccess}
          className={clsx(
            'w-full px-6 py-3 rounded-lg font-semibold text-white transition-colors',
            isFormValid && !isSubmitting && !submitSuccess
              ? 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              : 'bg-gray-400 cursor-not-allowed'
          )}
        >
          {isSubmitting
            ? 'Submitting...'
            : submitSuccess
            ? 'Submitted ✓'
            : 'Submit Reservation'}
        </button>
      </div>
    </form>
  )
}
