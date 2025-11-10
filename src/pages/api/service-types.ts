import { API_URL } from "../../libs/common/config"
import fetchData from "../../libs/common/fetchData"

export async function GET() {
  const data = await fetchData(`${API_URL}/service-types`)
  return new Response(JSON.stringify(data.results), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}