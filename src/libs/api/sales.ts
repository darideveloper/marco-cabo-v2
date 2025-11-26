import fetchData from '../common/fetchData'

export interface CreateSalePayload {
    vehicle: number
    service_type: number
    location: number
    client_name: string
    client_last_name: string
    client_email: string
}

export interface CreateSaleResponse {
    status: string
    message: string
    data?: {
        payment_link?: string
        [key: string]: unknown
    }
    [key: string]: unknown
}

export interface SaleData {
    id: number
    service_type: {
        id: number
        name: string
    }
    location: {
        id: number
        name: string
    }
    vehicle: {
        id: number
        name: string,
        passengers: number
    }
    total: number
    stripe_code: string
    client: {
        name: string
        email: string
    }
}

export interface GetSaleResponse {
    status: string
    message: string
    data: SaleData
}

const createSale = async (
    payload: CreateSalePayload
): Promise<CreateSaleResponse> => {
    const data = await fetchData('/sales/', {
        method: 'POST',
        body: payload
    })

    return data as CreateSaleResponse
}

const getSaleByStripeCode = async (
    stripeCode: string
): Promise<GetSaleResponse> => {
    const data = await fetchData(`/sales/?stripe_code=${stripeCode}`)
    return data as GetSaleResponse
}

export interface CompleteSalePayload {
    sale_stripe_code: string
    passengers: number
    client_email: string
    client_last_name: string
    client_phone: string
    arrival_date: string
    arrival_time: string
    arrival_airline: string
    arrival_flight_number: string
    departure_date?: string
    departure_time?: string
    departure_airline?: string
    departure_flight_number?: string
    details?: string
}

export interface CompleteSaleResponse {
    status: string
    message: string
    data?: unknown
    [key: string]: unknown
}

const completeSale = async (
    payload: CompleteSalePayload
): Promise<CompleteSaleResponse> => {
    const data = await fetchData('/sales/done/', {
        method: 'POST',
        body: payload
    })

    return data as CompleteSaleResponse
}

export { getSaleByStripeCode, completeSale }
export default createSale

