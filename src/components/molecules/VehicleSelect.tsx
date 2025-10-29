//  libs
import clsx from "clsx"


// components
import CardVehicle from "./VehicleCard"
import { useState } from "react"
//  props
interface Props {
    className?: string
}


export default function VehicleSelect({ className }: Props) {

    const vehicles = [
        {
            id: 1,
            title: "Luxury SUV",
            numberOfGuests: 4,
            image: "/images/Sprinter.webp"
        },
        {
            id: 2,
            title: "Executive Van",
            numberOfGuests: 8,
            image: "/images/SUB.webp"
        },
        {
            id: 3,
            title: "Luxury SUV",
            numberOfGuests: 12,
            image: "/images/Van.webp"
        }
    ]

    const [selectedVehicle, setSelectedVehicle] = useState<number>(1)

    return (<div className={clsx(
        'grid grid-cols-1 md:grid-cols-3 gap-4',
        'mx-auto',
        'w-full',
        className
    )}>
        {vehicles.map((vehicle) => (
            <CardVehicle key={vehicle.id} title={vehicle.title} numberOfGuests={vehicle.numberOfGuests} image={vehicle.image} isSelected={vehicle.id === selectedVehicle} />
        ))}
    </div>)
}