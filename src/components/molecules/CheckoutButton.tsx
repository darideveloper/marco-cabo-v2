// libs
import { useState } from 'react'

// components
import ButtonSubmit from '../atoms/ButtonSubmit'
import CheckoutModal from './CheckoutModal'

interface Props {
  className?: string
}

export default function CheckoutButton({ className }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  return (
    <>
      <ButtonSubmit
        className={className}
        onClick={handleOpen}
      />
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </>
  )
}
