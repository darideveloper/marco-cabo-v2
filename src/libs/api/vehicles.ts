import fetchData from '../common/fetchData'

const getVehicles = async () => {
  const data = await fetchData(`/vehicles`)
  return data
}

export default getVehicles