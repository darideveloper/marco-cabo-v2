import { TOKEN_KEY } from './config'


const fetchData = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Token ${TOKEN_KEY}`
    }
  })
  const data = await response.json()
  return data
}

export default fetchData