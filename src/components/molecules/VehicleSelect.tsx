//  libs
import clsx from "clsx"
import { useState, useEffect, useMemo } from "react"

// components
import CardVehicle from "./VehicleCard"
import { useMainFormStore } from "../../libs/store/mainFormStore"

//  props
interface Props {
    className?: string
    vehiclesArray: VehicleType[]
}


export default function VehicleSelect({ className, vehiclesArray }: Props) {

    const vehicles = useMemo(() => vehiclesArray.map((vehicle, index) => ({
        id: vehicle.id,
        name: vehicle.name,
        numberOfGuests: 4*(index+1) || 4,
        image: `/images/${vehicle.name}.webp`
    })), [vehiclesArray])

    const [selectedVehicle, setSelectedVehicle] = useState<number>(1)
    const setSelectedVehicleStore = useMainFormStore((state) => state.setSelectedVehicle)

    // Initialize store with first vehicle
    useEffect(() => {
        if (vehicles.length > 0 && vehicles[0]) {
            setSelectedVehicleStore(vehicles[0].id, vehicles[0].name)
        }
    }, [vehicles, setSelectedVehicleStore])

    const handleVehicleClick = (vehicleId: number, vehicleName: string) => {
        setSelectedVehicle(vehicleId)
        setSelectedVehicleStore(vehicleId, vehicleName)
    }

    return (<div className={clsx(
        'grid grid-cols-1 lg:grid-cols-3 gap-4',
        'mx-auto',
        'w-full',
        'max-w-[500px] lg:max-w-none',
        className
    )}>
        {vehicles.map((vehicle) => (
            <CardVehicle 
                key={vehicle.id} 
                title={vehicle.name} 
                numberOfGuests={vehicle.numberOfGuests} 
                image={vehicle.image} 
                isSelected={vehicle.id === selectedVehicle}
                onClick={() => handleVehicleClick(vehicle.id, vehicle.name)}
            />
        ))}
    </div>)
}