import fetchData from '../common/fetchData'

export interface CreateSalePayload {
    vehicle: number
    service_type: number
    location: number
    client_name: string
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

const createSale = async (
    payload: CreateSalePayload
): Promise<CreateSaleResponse> => {
    const data = await fetchData('/sales/', {
        method: 'POST',
        body: payload
    })

    return data as CreateSaleResponse
}

export default createSale

