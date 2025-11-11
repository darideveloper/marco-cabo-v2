import { TOKEN_KEY } from './config'
import { BASE_URL } from './config'

const fetchData = async (url: string) => {
  const response = await fetch(`${BASE_URL}/api${url}`, {
    headers: {
      'Authorization': `Token ${TOKEN_KEY}`
    }
  })
  const data = await response.json()
  return data
}

export default fetchData