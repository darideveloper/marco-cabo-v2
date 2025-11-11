//  libs
import clsx from "clsx"


// components
import CardVehicle from "./VehicleCard"
import { useState } from "react"
//  props
interface Props {
    className?: string
    vehiclesArray: VehicleType[]
}


export default function VehicleSelect({ className, vehiclesArray }: Props) {

    const vehicles = vehiclesArray.map((vehicle, index) => ({
        id: vehicle.id,
        name: vehicle.name,
        numberOfGuests: 4*(index+1) || 4,
        image: `/images/${vehicle.name}.webp`
    }))

    const [selectedVehicle, setSelectedVehicle] = useState<number>(1)

    return (<div className={clsx(
        'grid grid-cols-1 lg:grid-cols-3 gap-4',
        'mx-auto',
        'w-full',
        'max-w-[500px] lg:max-w-none',
        className
    )}>
        {vehicles.map((vehicle) => (
            <CardVehicle key={vehicle.id} title={vehicle.name} numberOfGuests={vehicle.numberOfGuests} image={vehicle.image} isSelected={vehicle.id === selectedVehicle} />
        ))}
    </div>)
}