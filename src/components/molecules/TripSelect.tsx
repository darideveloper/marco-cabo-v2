//  libs
import clsx from "clsx"
import { useState } from "react"

// components
import TripButton from "./TripButton"

//  props
interface Props {
    className?: string
    serviceTypes: ServiceType[]
}


export default function TripSelect({ className, serviceTypes }: Props) {

    const trips = serviceTypes.map((serviceType) => ({
        id: serviceType.id,
        title: serviceType.name
    }))

    const [selectedTrip, setSelectedTrip] = useState<number>(1)

    return (
        <div className={clsx(
            'grid grid-cols-1 lg:grid-cols-2 gap-4',
            'mx-auto',
            'w-full',
            'max-w-[500px] lg:max-w-none',
            className
        )}>
            {trips.map((trip) => (
                <TripButton 
                    key={trip.id} 
                    title={trip.title} 
                    isSelected={trip.id === selectedTrip}
                    onClick={() => setSelectedTrip(trip.id)}
                />
            ))}
        </div>
    )
}

