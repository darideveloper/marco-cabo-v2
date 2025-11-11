import { API_URL } from "../common/config"
import fetchData from "../common/fetchData"

const getHotelsData = async () => {
  const data = await fetchData(`${API_URL}/hotels`)
  return data
}

export default getHotelsData