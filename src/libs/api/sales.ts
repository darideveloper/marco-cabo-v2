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
        name: string
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

export { getSaleByStripeCode }
export default createSale

