// Hooks
import { useEffect, useState } from 'react'

// States
import { useMainFormStore } from '../../libs/store/mainFormStore'

// Components
import ButtonAction from './ButtonAction'

// Props
interface Props {
  className?: string
  onClick?: () => void
}

export default function ButtonSubmit({ className, onClick }: Props) {
  // Get all states from the store
  const selectedTrip = useMainFormStore((state) => state.selectedTrip)
  const selectedVehicleId = useMainFormStore((state) => state.selectedVehicleId)
  const selectedLocationId = useMainFormStore((state) => state.selectedLocationId)

  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    // Detect if any value if null
    const states = [selectedTrip, selectedVehicleId, selectedLocationId]
    if (states.some(state => state === null)) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [selectedTrip, selectedVehicleId, selectedLocationId])

  return (
    <ButtonAction
      className={className}
      text={"CONTINUE TO YOUR INFORMATION & CHECK OUT"}
      onClick={onClick}
      isDisabled={isDisabled}
    />
  )
}
