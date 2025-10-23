import { create } from 'zustand'

export const useMainFormStore = create((set) => ({
  bears: 0,
  vehicle: null,
  service: null,
  destination: null,
  setVehicle: (vehicle: string) => set({ vehicle }),
  setService: (service: string) => set({ service }),
  setDestination: (destination: string) => set({ destination }),
}))
