//  libs
import clsx from 'clsx'
import { useState, useRef, useEffect } from 'react'

//  props
interface Props {
  isOpen: boolean
  onClose: () => void
  hotelData: HotelDataType[]
  onSelect: (hotel: HotelDataType) => void
  destinationTitle: string
}

export default function HotelSelectModal({
  isOpen,
  onClose,
  hotelData,
  onSelect,
  destinationTitle,
}: Props) {
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(isOpen)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter hotels based on search query
  const filteredHotels = hotelData.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  // Handle opening animation
  useEffect(() => {
    if (isOpen && !isClosing) {
      // Start with opening state to show initial closed position
      setIsOpening(true)
      // Use requestAnimationFrame to ensure DOM is ready, then trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsOpening(false)
        })
      })
    }
  }, [isOpen, isClosing])

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      setSelectedHotelId(null)
      setIsDropdownOpen(false)
      setIsClosing(false)
      setIsOpening(false)
    }
  }, [isOpen])

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedHotelId(null)
      setSearchQuery('')
      setIsDropdownOpen(false)
      onClose()
    }, 300) // Match animation duration
  }

  const handleConfirm = () => {
    if (selectedHotelId !== null) {
      const selectedHotel = hotelData.find(
        (hotel) => hotel.id === selectedHotelId
      )
      if (selectedHotel) {
        onSelect(selectedHotel)
        setSelectedHotelId(null)
        setSearchQuery('')
        handleClose()
      }
    }
  }

  if (!isOpen && !isClosing) return null

  const isAnimating = isOpening || isClosing

  const handleHotelClick = (hotel: HotelDataType) => {
    setSelectedHotelId(hotel.id)
    setSearchQuery(`${hotel.name} - ${hotel.hotelName}`)
    setIsDropdownOpen(false)
  }

  const selectedHotel = selectedHotelId
    ? hotelData.find((hotel) => hotel.id === selectedHotelId)
    : null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50',
        'flex items-center justify-center',
        'bg-black/60',
        'transition-opacity duration-300 ease-out',
        isAnimating && isClosing ? 'opacity-0' : 'opacity-100'
      )}
      onClick={handleClose}
    >
      <div
        className={clsx(
          'bg-white rounded-lg',
          'p-6',
          'max-w-md w-full mx-4',
          'shadow-xl',
          'relative',
          'transition-all duration-300 ease-out',
          isOpening
            ? 'opacity-0 scale-95 translate-y-2'
            : isClosing
            ? 'opacity-0 scale-95 translate-y-2'
            : 'opacity-100 scale-100 translate-y-0'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className={clsx(
            'absolute top-4 right-4',
            'text-gray-500 hover:text-gray-700',
            'text-2xl font-bold',
            'w-8 h-8',
            'flex items-center justify-center',
            'rounded-full hover:bg-gray-100',
            'transition-colors'
          )}
        >
          ×
        </button>

        {/* Title */}
        <h2 className={clsx('text-2xl font-bold', 'mb-4', 'text-gray-800')}>
          Select Hotel for {destinationTitle}
        </h2>

        {/* Searchable Dropdown */}
        <div
          className={clsx('mb-6')}
          ref={dropdownRef}
        >
          <label
            className={clsx('block text-sm font-medium', 'text-gray-700 mb-2')}
          >
            Choose a Hotel:
          </label>
          <div className={clsx('relative')}>
            <input
              ref={inputRef}
              type='text'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setIsDropdownOpen(true)
                // Clear selection when user starts typing a new search
                if (
                  selectedHotelId &&
                  e.target.value !==
                    `${selectedHotel?.name} - ${selectedHotel?.hotelName}`
                ) {
                  setSelectedHotelId(null)
                }
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder='Search hotels...'
              className={clsx(
                'w-full',
                'px-4 py-2',
                'border border-gray-300 rounded-lg',
                'text-gray-800',
                'focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent',
                'transition-all'
              )}
            />

            {/* Dropdown List */}
            {isDropdownOpen && (
              <div
                className={clsx(
                  'absolute z-10 w-full mt-1',
                  'bg-white border border-gray-300 rounded-lg',
                  'shadow-lg',
                  'max-h-60 overflow-y-auto'
                )}
              >
                {filteredHotels.length > 0 ? (
                  filteredHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      onClick={() => handleHotelClick(hotel)}
                      className={clsx(
                        'px-4 py-3',
                        'cursor-pointer',
                        'hover:bg-gray-50',
                        'transition-colors',
                        selectedHotelId === hotel.id && 'bg-red/10'
                      )}
                    >
                      <div className={clsx('text-gray-800 font-medium')}>
                        {hotel.name}
                      </div>
                      <div className={clsx('text-gray-500 text-sm mt-0.5')}>
                        {hotel.hotelName}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={clsx('px-4 py-3 text-gray-500 text-center')}>
                    No hotels found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Hotel Display */}
          {selectedHotel && (
            <div
              className={clsx(
                'mt-3 p-3',
                'bg-gray-50 rounded-lg',
                'border border-gray-200'
              )}
            >
              <div className={clsx('text-gray-800 font-medium')}>
                {selectedHotel.name}
              </div>
              <div className={clsx('text-gray-500 text-sm mt-0.5')}>
                {selectedHotel.hotelName}
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className={clsx('flex gap-3', 'justify-end')}>
          <button
            onClick={handleClose}
            className={clsx(
              'px-4 py-2',
              'border border-gray-300 rounded-lg',
              'text-gray-700',
              'hover:bg-gray-50',
              'transition-colors'
            )}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedHotelId === null}
            className={clsx(
              'px-4 py-2',
              'bg-red text-white rounded-lg',
              'font-medium',
              'hover:opacity-90',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-opacity'
            )}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
