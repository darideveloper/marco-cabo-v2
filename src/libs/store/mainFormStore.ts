import { create } from 'zustand'

interface MainFormStore {
  selectedTrip: number | null
  selectedTripName: string | null
  selectedVehicleId: number | null
  selectedVehicleName: string | null
  selectedLocationId: number | null
  selectedHotel: { name: string; hotelName: string } | null
  selectedPostalCode: { name: string } | null
  contactName: string
  contactEmail: string
  setSelectedTrip: (tripId: number, tripName: string) => void
  setSelectedVehicle: (vehicleId: number, vehicleName: string) => void
  setSelectedLocationId: (locationId: number | null) => void
  setSelectedHotel: (hotel: { name: string; hotelName: string } | null) => void
  setSelectedPostalCode: (postalCode: { name: string } | null) => void
  setContactName: (name: string) => void
  setContactEmail: (email: string) => void
}

export const useMainFormStore = create<MainFormStore>((set) => ({
  selectedTrip: null,
  selectedTripName: null,
  selectedVehicleId: null,
  selectedVehicleName: null,
  selectedLocationId: null,
  selectedHotel: null,
  selectedPostalCode: null,
  contactName: '',
  contactEmail: '',
  setSelectedTrip: (tripId: number, tripName: string) => set({ selectedTrip: tripId, selectedTripName: tripName }),
  setSelectedVehicle: (vehicleId: number, vehicleName: string) => set({ selectedVehicleId: vehicleId, selectedVehicleName: vehicleName }),
  setSelectedLocationId: (locationId: number | null) => set({ selectedLocationId: locationId }),
  setSelectedHotel: (hotel: { name: string; hotelName: string } | null) => set({ selectedHotel: hotel }),
  setSelectedPostalCode: (postalCode: { name: string } | null) => set({ selectedPostalCode: postalCode }),
  setContactName: (name: string) => set({ contactName: name }),
  setContactEmail: (email: string) => set({ contactEmail: email }),
}))
