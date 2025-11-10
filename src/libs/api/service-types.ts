import fetchData from "../common/fetchData"
import { API_URL } from "../common/config"

const getServiceTypes = async () => {
  const data = await fetchData(`${API_URL}/service-types`)
  return data
}

export default getServiceTypes