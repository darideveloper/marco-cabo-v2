import fetchData from "../common/fetchData"

const getHotelsData = async () => {
  const data = await fetchData(`/hotels`)
  return data
}

export default getHotelsData