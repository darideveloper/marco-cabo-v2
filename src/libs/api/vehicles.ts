import { API_URL } from '../common/config'
import fetchData from '../common/fetchData'

const getVehicles = async () => {
  const data = await fetchData(`${API_URL}/vehicles`)
  return data
}

export default getVehicles