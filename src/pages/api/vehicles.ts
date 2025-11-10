import getVehicles from "../../libs/api/vehicles"

export async function GET() {
  const vehicles = await getVehicles()
  return new Response(JSON.stringify(vehicles.results), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}