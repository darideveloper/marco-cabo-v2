import fetchData from "../common/fetchData"


const getPostalCodes = async () => {
    const data = await fetchData(`/postal-codes`)
    return data
}

export default getPostalCodes