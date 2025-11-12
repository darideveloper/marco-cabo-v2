//  libs
import clsx from 'clsx'
import { useState, useEffect, useMemo } from 'react'

// components
import TripButton from './TripButton'
import { useMainFormStore } from '../../libs/store/mainFormStore'

//  props
interface Props {
  className?: string
  serviceTypes: ServiceType[]
}

export default function TripSelect({ className, serviceTypes }: Props) {
  const trips = useMemo(
    () =>
      serviceTypes.map((serviceType) => ({
        id: serviceType.id,
        title: serviceType.name,
      })),
    [serviceTypes]
  )

  const [selectedTrip, setSelectedTrip] = useState<number>(1)
  const setSelectedTripStore = useMainFormStore(
    (state) => state.setSelectedTrip
  )

  // Initialize store with first trip
  useEffect(() => {
    if (trips.length > 0 && trips[0]) {
      setSelectedTripStore(trips[0].id, trips[0].title)
    }
  }, [trips, setSelectedTripStore])

  const handleTripClick = (tripId: number, tripName: string) => {
    setSelectedTrip(tripId)
    setSelectedTripStore(tripId, tripName)
  }

  return (
    <div
      className={clsx(
        'grid grid-cols-1 lg:grid-cols-2 gap-4',
        'mx-auto',
        'w-full',
        'max-w-[700px] lg:max-w-none',
        className
      )}
    >
      {trips.map((trip, index) => (
        <TripButton
          key={index}
          title={trip.title}
          isSelected={trip.id === selectedTrip}
          onClick={() => handleTripClick(trip.id, trip.title)}
          index={index}
        />
      ))}
    </div>
  )
}
