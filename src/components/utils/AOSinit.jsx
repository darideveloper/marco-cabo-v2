import { useEffect } from 'react'
import AOS from "aos"
import "aos/dist/aos.css"

export default function AOSInit() {
  // Start AOS when component mounts
  useEffect(() => {

    // Start Aos
    AOS.init({
      duration: 1000,
      delay: window.innerWidth < 768 ? 0 : 500,
      once: false,
    })

  }, [])

  return null
}