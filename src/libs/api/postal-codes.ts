import fetchData from "../common/fetchData"


const getPostalCodes = async () => {
    const data = await fetchData(`/postal-codes?page-size=1000`)
    return data
}

export default getPostalCodes