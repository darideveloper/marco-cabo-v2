import fetchData from "../common/fetchData"

const getHotelsData = async () => {
  const data = await fetchData(`/hotels?page-size=1000`)
  return data
}

export default getHotelsData