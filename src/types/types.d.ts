interface ServiceType {
    id: number
    name: string
}

interface VehicleType {
    id: number
    name: string
    image?: string
}

interface LocationType {
    id: number
    name: string
}

interface HotelType {
    id: number
    name: string
    location: LocationType[] 
}