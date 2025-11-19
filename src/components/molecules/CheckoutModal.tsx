// libs
import clsx from 'clsx'
import { useEffect, useMemo } from 'react'

// store
import { useMainFormStore } from '../../libs/store/mainFormStore'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: Props) {
  const selectedTripName = useMainFormStore((state) => state.selectedTripName)
  const selectedVehicleName = useMainFormStore(
    (state) => state.selectedVehicleName
  )
  const selectedHotel = useMainFormStore((state) => state.selectedHotel)
  const selectedPostalCode = useMainFormStore(
    (state) => state.selectedPostalCode
  )
  const contactName = useMainFormStore((state) => state.contactName)
  const contactEmail = useMainFormStore((state) => state.contactEmail)
  const setContactName = useMainFormStore((state) => state.setContactName)
  const setContactEmail = useMainFormStore((state) => state.setContactEmail)
  const destinationDisplay = selectedHotel
    ? `${selectedHotel.name} - ${selectedHotel.hotelName}`
    : selectedPostalCode?.name

  const isFormValid = useMemo(() => {
    const nameValid = contactName.trim().length > 0
    const emailValid = contactEmail.trim().length > 0
    return nameValid && emailValid
  }, [contactName, contactEmail])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50',
        'flex items-center justify-center',
        'bg-black/60',
        'transition-opacity duration-200 opacity-100'
      )}
      onClick={onClose}
    >
      <div
        className={clsx(
          'bg-white rounded-2xl shadow-2xl',
          'p-6 sm:p-8',
          'max-w-lg w-full mx-4',
          'space-y-6',
          'transform transition-all duration-200',
          'opacity-100 scale-100'
        )}
        onClick={(event) => event.stopPropagation()}
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
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none'
            aria-label='Close modal'
          >
            ×
          </button>
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
        </div>

        <div className='space-y-3'>
          <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>
            Your information
          </h3>
          <div className='space-y-2'>
            <label
              className='text-sm font-medium text-gray-700'
              htmlFor='contact-name'
            >
              Full name
            </label>
            <input
              id='contact-name'
              type='text'
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              placeholder='e.g. Maria Johnson'
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
              Please complete both fields to continue.
            </p>
          )}
        </div>

        <div className='flex flex-col sm:flex-row justify-end gap-3'>
          <button
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
            onClick={() => {
              if (isFormValid) {
                onClose()
              }
            }}
            disabled={!isFormValid}
            className={clsx(
              'w-full sm:w-auto',
              'px-4 py-2.5',
              'bg-red text-white rounded-lg',
              'font-semibold uppercase tracking-wide',
              'transition-opacity',
              isFormValid ? 'hover:opacity-90' : 'opacity-60 cursor-not-allowed'
            )}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
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
      <span className='text-sm font-medium text-gray-500 uppercase tracking-wide'>
        {label}
      </span>
      <span className='text-base text-gray-900 font-semibold mt-1 sm:mt-0'>
        {value || '—'}
      </span>
    </div>
  )
}
