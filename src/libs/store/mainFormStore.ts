import { create } from 'zustand'

interface MainFormStore {
  selectedTrip: number | null
  selectedTripName: string | null
  selectedVehicleId: number | null
  selectedVehicleName: string | null
  selectedLocationId: number | null
  selectedHotel: { name: string; hotelName: string } | null
  selectedPostalCode: { name: string } | null
  contactFirstName: string
  contactLastName: string
  contactEmail: string
  total: string
  setSelectedTrip: (tripId: number, tripName: string) => void
  setSelectedVehicle: (vehicleId: number, vehicleName: string) => void
  setSelectedLocationId: (locationId: number | null) => void
  setSelectedHotel: (hotel: { name: string; hotelName: string } | null) => void
  setSelectedPostalCode: (postalCode: { name: string } | null) => void
  setContactFirstName: (firstName: string) => void
  setContactLastName: (lastName: string) => void
  setContactEmail: (email: string) => void
  setTotal: (total: string) => void
}

export const useMainFormStore = create<MainFormStore>((set) => ({
  selectedTrip: null,
  selectedTripName: null,
  selectedVehicleId: null,
  selectedVehicleName: null,
  selectedLocationId: null,
  selectedHotel: null,
  selectedPostalCode: null,
  contactFirstName: '',
  contactLastName: '',
  contactEmail: '',
  total: '$ 0.00',
  setSelectedTrip: (tripId: number, tripName: string) => set({ selectedTrip: tripId, selectedTripName: tripName }),
  setSelectedVehicle: (vehicleId: number, vehicleName: string) => set({ selectedVehicleId: vehicleId, selectedVehicleName: vehicleName }),
  setSelectedLocationId: (locationId: number | null) => set({ selectedLocationId: locationId }),
  setSelectedHotel: (hotel: { name: string; hotelName: string } | null) => set({ selectedHotel: hotel }),
  setSelectedPostalCode: (postalCode: { name: string } | null) => set({ selectedPostalCode: postalCode }),
  setContactFirstName: (firstName: string) => set({ contactFirstName: firstName }),
  setContactLastName: (lastName: string) => set({ contactLastName: lastName }),
  setContactEmail: (email: string) => set({ contactEmail: email }),
  setTotal: (total: string) => set({ total }),
}))
