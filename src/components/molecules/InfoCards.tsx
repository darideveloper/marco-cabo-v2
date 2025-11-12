//  libs
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useMainFormStore } from "../../libs/store/mainFormStore"
import getPricing from "../../libs/api/pricing"

// components
import InfoCard from "./InfoCard"

//  props
interface Props {
  className?: string
}

export default function InfoCards({ className }: Props) {
  const selectedTrip = useMainFormStore((state) => state.selectedTrip)
  const selectedTripName = useMainFormStore((state) => state.selectedTripName)
  const selectedVehicleId = useMainFormStore((state) => state.selectedVehicleId)
  const selectedVehicleName = useMainFormStore((state) => state.selectedVehicleName)
  const selectedLocationId = useMainFormStore((state) => state.selectedLocationId)
  const selectedHotel = useMainFormStore((state) => state.selectedHotel)
  const selectedPostalCode = useMainFormStore((state) => state.selectedPostalCode)
  
  const [price, setPrice] = useState<string>("$ 0.00")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Format destination display
  const destinationDisplay = selectedHotel 
    ? `${selectedHotel.name} - ${selectedHotel.hotelName}`
    : selectedPostalCode 
    ? selectedPostalCode.name
    : undefined

  // Fetch price when all required IDs are available
  useEffect(() => {
    const fetchPrice = async () => {
      if (selectedTrip && selectedVehicleId && selectedLocationId) {
        setIsLoading(true)
        try {
          const pricingData = await getPricing({
            location: selectedLocationId,
            vehicle: selectedVehicleId,
            service_type: selectedTrip
          })
          
          if (pricingData.results && pricingData.results.length > 0) {
            const priceValue = pricingData.results[0].price
            setPrice(`$ ${priceValue.toFixed(2)}`)
          } else {
            setPrice("$ 0.00")
          }
        } catch (error) {
          console.error("Error fetching price:", error)
          setPrice("$ 0.00")
        } finally {
          setIsLoading(false)
        }
      } else {
        setPrice("$ 0.00")
      }
    }

    fetchPrice()
  }, [selectedTrip, selectedVehicleId, selectedLocationId])

  return (
    <div className={clsx(
      'rounded-lg',
      'grid grid-cols-1 lg:grid-cols-3 gap-4',
      'items-stretch',
      'mx-auto',
      'w-full',
      'max-w-[700px] lg:max-w-none',
      className
    )}>
      {/* Card 1: Visual/Branding Card - Image type */}
      <InfoCard
        type="image"
        image="/images/airport-representative.webp"
        title="Meet & Greet Staff"
        aosAnimation="fade-right"
      />

      {/* Card 2: Transfer Includes Card - Details type */}
      <InfoCard
        type="details"
        image="/images/vehicles/Luxury SUV.webp"
        title="YOUR TRANSFER INCLUDES"
        items={[
          'Private Transportation',
          'Bottled Water',
          'Meet & Greet Staff',
          '20 min. Groceries Shopping Stop'
        ]}
        aosAnimation="fade-down"
      />

      {/* Card 3: Price Card - Summary type */}
      <InfoCard
        type="summary"
        price={isLoading ? "Loading..." : price}
        vehicle={selectedVehicleName || undefined}
        serviceType={selectedTripName || undefined}
        destination={destinationDisplay}
        aosAnimation="fade-left"
      />
    </div>
  )
}

