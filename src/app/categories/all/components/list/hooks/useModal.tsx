import { useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
    console.log(isOpen)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return { isOpen, openModal, closeModal }
}

export default useModal
