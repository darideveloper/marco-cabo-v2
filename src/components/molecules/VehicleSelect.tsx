//  libs
import clsx from "clsx"


// components
import CardVehicle from "./CardVehicle"
//  props
interface Props {
    className?: string
}


export default function VehicleSelect({ className }: Props) {
    return (<div className={clsx(
        'grid grid-cols-1 md:grid-cols-3 gap-4',
        'mx-auto',
        'w-full',
        className
    )}>
        <CardVehicle title="Luxury SUV" numberOfGuests={4} image="/images/Sprinter.webp" isSelected={true} />

        <CardVehicle title="Executive Van" numberOfGuests={8} image="/images/SUB.webp" />

        <CardVehicle title="Luxury SUV" numberOfGuests={12} image="/images/Van.webp" />
    </div>)
}