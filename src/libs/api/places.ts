export interface GooglePlacesReview {
  name: string
  relativePublishTimeDescription: string
  rating: number
  text: {
    text: string
    languageCode: string
  }
  originalText: {
    text: string
    languageCode: string
  }
  authorAttribution: {
    displayName: string
    uri: string
    photoUri: string
  }
  publishTime: string
  flagContentUri: string
  googleMapsUri: string
}

export interface GooglePlacesResponse {
  displayName?: {
    text: string
    languageCode: string
  }
  formattedAddress?: string
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  placeId?: string
  reviews?: GooglePlacesReview[]
}

const getPlaceDetails = async (
  placeId?: string
): Promise<GooglePlacesResponse> => {
  const apiKey = import.meta.env.PUBLIC_GOOGLE_PLACES_API_KEY
  const businessId = import.meta.env.PUBLIC_GOOGLE_PLACES_BUSINESS_ID || placeId

  if (!apiKey) {
    throw new Error('Google Places API key is not configured')
  }

  if (!businessId) {
    throw new Error('Google Places Business ID is not configured')
  }

  const url = `https://places.googleapis.com/v1/places/${businessId}`
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'displayName,formattedAddress,rating,userRatingCount,googleMapsUri,reviews'
    }
  })

  if (!response.ok) {
    throw new Error(`Google Places API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  // Add the placeId to the response
  return { ...data, placeId: businessId } as GooglePlacesResponse
}

export default getPlaceDetails

