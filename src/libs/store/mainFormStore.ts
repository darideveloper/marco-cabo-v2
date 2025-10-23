import { create } from 'zustand'

interface MainFormStore {
  vehicle: string
  service: string
  destination: string
}

export const useMainFormStore = create<MainFormStore>((set) => ({
  vehicle: "",
  service: "",
  destination: "",
  setVehicle: (vehicle: string) => set({ vehicle }),
  setService: (service: string) => set({ service }),
  setDestination: (destination: string) => set({ destination }),
}))
