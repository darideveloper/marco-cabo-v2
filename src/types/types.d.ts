// Fetch Options Type
interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: Record<string, any> | FormData
    headers?: Record<string, string>
}


// API Types

interface ServiceType {
    id: number
    name: string
}

interface VehicleType {
    id: number
    name: string
    image?: string
    passengers?: number
}

interface LocationsType {
    id: number
    name: string
}


interface HotelsDataType {
    id: number,
    name: string,
    locations: LocationsType[]

}

interface HotelDataType {
    id: number,
    name: string,
    hotelName: string
}


interface PostalCodesType {
    id: number,
    name: string
}
