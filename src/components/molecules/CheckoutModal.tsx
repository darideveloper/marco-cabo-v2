// libs
import clsx from 'clsx'
import { useMemo, useState } from 'react'

// components
import Modal from './Modal'

// store
import { useMainFormStore } from '../../libs/store/mainFormStore'
// api
import createSale from '../../libs/api/sales'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: Props) {
  const selectedTrip = useMainFormStore((state) => state.selectedTrip)
  const selectedTripName = useMainFormStore((state) => state.selectedTripName)
  const selectedVehicleId = useMainFormStore((state) => state.selectedVehicleId)
  const selectedVehicleName = useMainFormStore(
    (state) => state.selectedVehicleName
  )
  const selectedHotel = useMainFormStore((state) => state.selectedHotel)
  const selectedPostalCode = useMainFormStore(
    (state) => state.selectedPostalCode
  )
  const selectedLocationId = useMainFormStore(
    (state) => state.selectedLocationId
  )
  const contactFirstName = useMainFormStore((state) => state.contactFirstName)
  const contactLastName = useMainFormStore((state) => state.contactLastName)
  const contactEmail = useMainFormStore((state) => state.contactEmail)
  const total = useMainFormStore((state) => state.total)
  const setContactFirstName = useMainFormStore(
    (state) => state.setContactFirstName
  )
  const setContactLastName = useMainFormStore(
    (state) => state.setContactLastName
  )
  const setContactEmail = useMainFormStore((state) => state.setContactEmail)
  const destinationDisplay = selectedHotel
    ? `${selectedHotel.name} - ${selectedHotel.hotelName}`
    : selectedPostalCode?.name

  const isFormValid = useMemo(() => {
    const firstNameValid = contactFirstName.trim().length > 0
    const lastNameValid = contactLastName.trim().length > 0
    const emailValid = contactEmail.trim().length > 0
    const idsValid =
      selectedTrip !== null &&
      selectedVehicleId !== null &&
      selectedLocationId !== null
    return firstNameValid && lastNameValid && emailValid && idsValid
  }, [
    contactFirstName,
    contactLastName,
    contactEmail,
    selectedTrip,
    selectedVehicleId,
    selectedLocationId,
  ])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth='max-w-lg'
      padding='p-4 sm:p-6 md:p-8'
      borderRadius='rounded-2xl'
      animationDuration={200}
      useAdvancedAnimations={false}
      contentClassName='space-y-4 sm:space-y-6'
    >
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-sm uppercase tracking-wide text-red font-semibold'>
            You're almost there
          </p>
          <h2 className='text-2xl font-bold text-gray-900 mt-1'>
            Review your transfer details
          </h2>
        </div>
      </div>

      <div className='space-y-4'>
        <SummaryRow
          label='Service Type'
          value={selectedTripName}
        />
        <SummaryRow
          label='Vehicle'
          value={selectedVehicleName}
        />
        <SummaryRow
          label='Destination'
          value={destinationDisplay}
        />
        <SummaryRow
          label='Total'
          value={total}
        />
      </div>

      <div className='space-y-3'>
        <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>
          Your information
        </h3>
        <div className='space-y-2'>
          <label
            className='text-sm font-medium text-gray-700'
            htmlFor='contact-first-name'
          >
            First name
          </label>
          <input
            id='contact-first-name'
            type='text'
            value={contactFirstName}
            onChange={(event) => setContactFirstName(event.target.value)}
            placeholder='e.g. Maria'
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
            required
          />
        </div>
        <div className='space-y-2'>
          <label
            className='text-sm font-medium text-gray-700'
            htmlFor='contact-last-name'
          >
            Last name
          </label>
          <input
            id='contact-last-name'
            type='text'
            value={contactLastName}
            onChange={(event) => setContactLastName(event.target.value)}
            placeholder='e.g. Johnson'
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
            required
          />
        </div>
        <div className='space-y-2'>
          <label
            className='text-sm font-medium text-gray-700'
            htmlFor='contact-email'
          >
            Email
          </label>
          <input
            id='contact-email'
            type='email'
            value={contactEmail}
            onChange={(event) => setContactEmail(event.target.value)}
            placeholder='you@example.com'
            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red/70 focus:border-transparent text-gray-900'
            required
          />
        </div>
        {!isFormValid && (
          <p className='text-sm text-red-600'>
            Please complete all fields to continue.
          </p>
        )}
        {submitError && <p className='text-sm text-red-600'>{submitError}</p>}
      </div>

      <div className='flex flex-col sm:flex-row justify-end gap-3'>
        <button
          type='button'
          onClick={onClose}
          className={clsx(
            'w-full sm:w-auto',
            'px-4 py-2.5',
            'border border-gray-300 rounded-lg',
            'text-gray-700',
            'hover:bg-gray-50',
            'transition-colors'
          )}
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={async () => {
            const errorApiMessage =
              'Something went wrong. Please try again in a moment.'

            if (!isFormValid || isSubmitting) {
              setSubmitError('Please complete all fields to continue.')
              return
            }
            setSubmitError(null)
            setIsSubmitting(true)
            try {
              const response = await createSale({
                vehicle: selectedVehicleId as number,
                service_type: selectedTrip as number,
                location: selectedLocationId as number,
                client_name: contactFirstName.trim(),
                client_last_name: contactLastName.trim(),
                client_email: contactEmail.trim(),
              })

              const paymentLink = response?.data?.payment_link
              if (paymentLink) {
                if (typeof window !== 'undefined') {
                  window.location.assign(paymentLink)
                }
              } else if (response?.status === 'success') {
                onClose()
              } else {
                throw new Error(response?.message || errorApiMessage)
              }
            } catch (error) {
              console.error('Error submitting sale:', error)
              const errorMessage =
                error instanceof Error ? error.message : errorApiMessage
              setSubmitError(errorMessage)
            } finally {
              setIsSubmitting(false)
            }
          }}
          disabled={!isFormValid || isSubmitting}
          className={clsx(
            'w-full sm:w-auto',
            'px-4 py-2.5',
            'bg-red text-white rounded-lg',
            'font-semibold uppercase tracking-wide',
            'transition-opacity',
            isFormValid && !isSubmitting
              ? 'hover:opacity-90'
              : 'opacity-60 cursor-not-allowed'
          )}
        >
          {isSubmitting ? 'Sending...' : 'Continue'}
        </button>
      </div>
    </Modal>
  )
}

interface SummaryRowProps {
  label: string
  value?: string | null
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div
      className={clsx(
        'flex flex-col sm:flex-row sm:items-center sm:justify-between',
        'bg-gray-50 rounded-xl px-4 py-3 border border-gray-100'
      )}
    >
      <span className='text-sm font-medium text-gray-500 uppercase tracking-wide w-full sm:w-1/2'>
        {label}
      </span>
      <span className='text-base text-gray-900 font-semibold mt-1 sm:mt-0 w-full sm:w-1/2'>
        {value || '—'}
      </span>
    </div>
  )
}
