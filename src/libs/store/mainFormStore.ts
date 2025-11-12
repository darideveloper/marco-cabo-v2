import { create } from 'zustand'

interface MainFormStore {
  vehicle: string
  service: string
  destination: string
  selectedTrip: number | null
  selectedTripName: string | null
  selectedVehicleName: string | null
  selectedHotel: { name: string; hotelName: string } | null
  selectedPostalCode: { name: string } | null
  setVehicle: (vehicle: string) => void
  setService: (service: string) => void
  setDestination: (destination: string) => void
  setSelectedTrip: (tripId: number, tripName: string) => void
  setSelectedVehicle: (vehicleName: string) => void
  setSelectedHotel: (hotel: { name: string; hotelName: string } | null) => void
  setSelectedPostalCode: (postalCode: { name: string } | null) => void
}

export const useMainFormStore = create<MainFormStore>((set) => ({
  vehicle: "",
  service: "",
  destination: "",
  selectedTrip: null,
  selectedTripName: null,
  selectedVehicleName: null,
  selectedHotel: null,
  selectedPostalCode: null,
  setVehicle: (vehicle: string) => set({ vehicle }),
  setService: (service: string) => set({ service }),
  setDestination: (destination: string) => set({ destination }),
  setSelectedTrip: (tripId: number, tripName: string) => set({ selectedTrip: tripId, selectedTripName: tripName }),
  setSelectedVehicle: (vehicleName: string) => set({ selectedVehicleName: vehicleName }),
  setSelectedHotel: (hotel: { name: string; hotelName: string } | null) => set({ selectedHotel: hotel }),
  setSelectedPostalCode: (postalCode: { name: string } | null) => set({ selectedPostalCode: postalCode }),
}))
