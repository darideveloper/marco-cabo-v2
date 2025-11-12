import fetchData from '../common/fetchData'

interface PricingParams {
  location: number
  vehicle: number
  service_type: number
}

interface PricingResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    id: number
    location: {
      id: number
      name: string
    }
    vehicle: {
      id: number
      name: string
    }
    service_type: {
      id: number
      name: string
    }
    price: number
  }>
}

const getPricing = async (params: PricingParams): Promise<PricingResponse> => {
  const queryParams = new URLSearchParams({
    location: params.location.toString(),
    vehicle: params.vehicle.toString(),
    service_type: params.service_type.toString()
  })
  const data = await fetchData(`/pricing/?${queryParams.toString()}`)
  return data
}

export default getPricing

