//  libs
import clsx from "clsx"


// components
import DestinationCard from "./DestinationCard"
import { useState } from "react"
//  props
interface Props {
    className?: string
    hotelData: HotelDataType[]
}


export default function DestinationSelect({ className, hotelData }: Props) {

    const destinations = [
        {
            id: 1,
            title: "Hotel",
            image: "/images/montage.webp"
        },
        {
            id: 2,
            title: "Destination 2",
            image: "/images/Image-079.webp"
        }
    ]

    const [selectedDestination, setSelectedDestination] = useState<number>(1)

    return (<div className={clsx(
        'grid grid-cols-1 lg:grid-cols-2 gap-4',
        'mx-auto',
        'w-full',
        'max-w-[500px] lg:max-w-none',
        className
    )}>
        {destinations.map((destination) => (
            <DestinationCard 
                key={destination.id} 
                title={destination.title} 
                image={destination.image} 
                isSelected={destination.id === selectedDestination}
                onClick={() => setSelectedDestination(destination.id)}
            />
        ))}
    </div>)
}

