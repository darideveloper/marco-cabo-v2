import { create } from 'zustand'

interface ConfirmationFormStore {
  client_name: string
  passengers: number | null
  client_last_name: string
  client_phone: string
  arrival_date: string
  arrival_time: string
  arrival_airline: string
  arrival_flight_number: string
  departure_date: string
  departure_time: string
  departure_airline: string
  departure_flight_number: string
  details: string
  setClientName: (name: string) => void
  setPassengers: (passengers: number | null) => void
  setClientLastName: (lastName: string) => void
  setClientPhone: (phone: string) => void
  setArrivalDate: (date: string) => void
  setArrivalTime: (time: string) => void
  setArrivalAirline: (airline: string) => void
  setArrivalFlightNumber: (flightNumber: string) => void
  setDepartureDate: (date: string) => void
  setDepartureTime: (time: string) => void
  setDepartureAirline: (airline: string) => void
  setDepartureFlightNumber: (flightNumber: string) => void
  setDetails: (details: string) => void
  reset: () => void
}

const initialState = {
  client_name: '',
  passengers: null,
  client_last_name: '',
  client_phone: '',
  arrival_date: '',
  arrival_time: '',
  arrival_airline: '',
  arrival_flight_number: '',
  departure_date: '',
  departure_time: '',
  departure_airline: '',
  departure_flight_number: '',
  details: '',
}

export const useConfirmationFormStore = create<ConfirmationFormStore>((set) => ({
  ...initialState,
  setClientName: (name) => set({ client_name: name }),
  setPassengers: (passengers) => set({ passengers }),
  setClientLastName: (lastName) => set({ client_last_name: lastName }),
  setClientPhone: (phone) => set({ client_phone: phone }),
  setArrivalDate: (date) => set({ arrival_date: date }),
  setArrivalTime: (time) => set({ arrival_time: time }),
  setArrivalAirline: (airline) => set({ arrival_airline: airline }),
  setArrivalFlightNumber: (flightNumber) => set({ arrival_flight_number: flightNumber }),
  setDepartureDate: (date) => set({ departure_date: date }),
  setDepartureTime: (time) => set({ departure_time: time }),
  setDepartureAirline: (airline) => set({ departure_airline: airline }),
  setDepartureFlightNumber: (flightNumber) => set({ departure_flight_number: flightNumber }),
  setDetails: (details) => set({ details }),
  reset: () => set(initialState),
}))

