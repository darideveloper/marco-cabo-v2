import { TOKEN_KEY } from './config'
import { BASE_URL } from './config'


const fetchData = async (url: string, options?: FetchOptions) => {
  const method = options?.method || 'GET'
  const headers: Record<string, string> = {
    'Authorization': `Token ${TOKEN_KEY}`,
    ...options?.headers
  }

  // Add Content-Type header for JSON body (unless it's FormData)
  if (options?.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const fetchOptions: RequestInit = {
    method,
    headers
  }

  // Add body for POST, PUT, PATCH, DELETE requests
  if (options?.body) {
    if (options.body instanceof FormData) {
      fetchOptions.body = options.body
      // Remove Content-Type header for FormData (browser will set it with boundary)
      delete headers['Content-Type']
    } else {
      fetchOptions.body = JSON.stringify(options.body)
    }
  }

  const response = await fetch(`${BASE_URL}/api${url}`, fetchOptions)

  // Handle non-JSON responses
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json()
    return data
  } else {
    // Return text or blob for non-JSON responses
    return await response.text()
  }
}

export default fetchData