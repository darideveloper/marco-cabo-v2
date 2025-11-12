//  libs
import clsx from 'clsx'

// components
import DestinationCard from './DestinationCard'
import HotelSelectModal from './HotelSelectModal'
import PostalCodeSelectModal from './PostalCodeSelectModal'
import { useState } from 'react'
import { useMainFormStore } from '../../libs/store/mainFormStore'
//  props
interface Props {
  className?: string
  hotelData: HotelDataType[]
  postalCodesData: PostalCodesType[]
}

export default function DestinationSelect({
  className,
  hotelData,
  postalCodesData,
}: Props) {
  const destinations = [
    {
      id: 1,
      title: 'Hotel',
      image: '/images/montage.webp',
    },
    {
      id: 2,
      title: 'Villa / AirBnB',
      image: '/images/Image-079.webp',
    },
  ]

  const [selectedDestination, setSelectedDestination] = useState<number | null>(
    null
  )
  const [selectedHotel, setSelectedHotel] = useState<HotelDataType | null>(null)
  const [selectedPostalCode, setSelectedPostalCode] =
    useState<PostalCodesType | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [destinationForModal, setDestinationForModal] = useState<{
    id: number
    title: string
  } | null>(null)

  const setSelectedHotelStore = useMainFormStore(
    (state) => state.setSelectedHotel
  )
  const setSelectedPostalCodeStore = useMainFormStore(
    (state) => state.setSelectedPostalCode
  )
  const setSelectedLocationId = useMainFormStore(
    (state) => state.setSelectedLocationId
  )

  const handleDestinationClick = (
    destinationId: number,
    destinationTitle: string
  ) => {
    // If already selected, do nothing
    if (selectedDestination === destinationId) {
      return
    }

    // Show modal based on destination ID
    // ID 1 = Hotel modal, ID 2 = Postal Code modal
    setDestinationForModal({ id: destinationId, title: destinationTitle })
    setModalOpen(true)
  }

  const handleHotelSelect = (hotel: HotelDataType) => {
    if (destinationForModal) {
      setSelectedDestination(destinationForModal.id)
      setSelectedHotel(hotel)
      setSelectedHotelStore({ name: hotel.name, hotelName: hotel.hotelName })
      setSelectedLocationId(hotel.id) // Store location ID
      setSelectedPostalCodeStore(null) // Clear postal code when hotel is selected
      setSelectedPostalCode(null) // Clear local postal code state
    }
  }

  const handlePostalCodeSelect = (postalCode: PostalCodesType) => {
    if (destinationForModal) {
      setSelectedDestination(destinationForModal.id)
      setSelectedPostalCode(postalCode)
      setSelectedPostalCodeStore({ name: postalCode.name })
      setSelectedLocationId(postalCode.id) // Store location ID
      setSelectedHotelStore(null) // Clear hotel when postal code is selected
      setSelectedHotel(null) // Clear local hotel state
    }
  }

  return (
    <>
      <div
        className={clsx(
          'grid grid-cols-1 lg:grid-cols-2 gap-4',
          'mx-auto',
          'w-full',
          'max-w-[500px] lg:max-w-none',
          className
        )}
      >
        {destinations.map((destination, index) => (
          <DestinationCard
            key={destination.id}
            title={destination.title}
            image={destination.image}
            isSelected={destination.id === selectedDestination}
            onClick={() =>
              handleDestinationClick(destination.id, destination.title)
            }
            selectedHotel={destination.id === 1 ? selectedHotel : null}
            selectedPostalCode={
              destination.id === 2 ? selectedPostalCode : null
            }
            index={index}
          />
        ))}
      </div>

      {destinationForModal && destinationForModal.id === 1 && (
        <HotelSelectModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setDestinationForModal(null)
          }}
          hotelData={hotelData}
          onSelect={handleHotelSelect}
          destinationTitle={destinationForModal.title}
        />
      )}

      {destinationForModal && destinationForModal.id === 2 && (
        <PostalCodeSelectModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setDestinationForModal(null)
          }}
          postalCodesData={postalCodesData}
          onSelect={handlePostalCodeSelect}
          destinationTitle={destinationForModal.title}
        />
      )}
    </>
  )
}
