//  libs
import clsx from "clsx"
import { useMainFormStore } from "../../libs/store/mainFormStore"

// components
import InfoCard from "./InfoCard"

//  props
interface Props {
  className?: string
}

export default function InfoCards({ className }: Props) {
  const selectedTripName = useMainFormStore((state) => state.selectedTripName)
  const selectedVehicleName = useMainFormStore((state) => state.selectedVehicleName)
  const selectedHotel = useMainFormStore((state) => state.selectedHotel)
  const selectedPostalCode = useMainFormStore((state) => state.selectedPostalCode)
  
  // Format destination display
  const destinationDisplay = selectedHotel 
    ? `${selectedHotel.name} - ${selectedHotel.hotelName}`
    : selectedPostalCode 
    ? selectedPostalCode.name
    : undefined
  return (
    <div className={clsx(
      'rounded-lg',
      'grid grid-cols-1 lg:grid-cols-3 gap-4',
      'items-stretch',
      'mx-auto',
      'w-full',
      'max-w-[500px] lg:max-w-none',
      className
    )}>
      {/* Card 1: Visual/Branding Card - Image type */}
      <InfoCard
        type="image"
        image="/images/airport-representative.webp"
        title="Meet & Greet Staff"
      />

      {/* Card 2: Transfer Includes Card - Details type */}
      <InfoCard
        type="details"
        image="/images/Suburban.webp"
        title="YOUR TRANSFER INCLUDES"
        items={[
          'Private Transportation',
          'Bottled Water',
          'Meet & Greet Staff',
          '20 min. Groceries Shopping Stop'
        ]}
      />

      {/* Card 3: Price Card - Summary type */}
      <InfoCard
        type="summary"
        price="$ 180.00"
        vehicle={selectedVehicleName || undefined}
        serviceType={selectedTripName || undefined}
        destination={destinationDisplay}
      />
    </div>
  )
}

