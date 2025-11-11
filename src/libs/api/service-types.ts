import fetchData from "../common/fetchData"

const getServiceTypes = async () => {
  const data = await fetchData(`/service-types`)
  return data
}

export default getServiceTypes