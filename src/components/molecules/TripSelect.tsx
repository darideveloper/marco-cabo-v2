//  libs
import clsx from "clsx"
import { useState } from "react"

// components
import TripButton from "./TripButton"

//  props
interface Props {
    className?: string
}


export default function TripSelect({ className }: Props) {

    const trips = [
        {
            id: 1,
            title: "One Way"
        },
        {
            id: 2,
            title: "Round Trip"
        }
    ]

    const [selectedTrip, setSelectedTrip] = useState<number>(1)

    return (
        <div className={clsx(
            'grid grid-cols-1 md:grid-cols-2 gap-4',
            'mx-auto',
            'w-full',
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

