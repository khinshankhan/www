import { useEffect, useState } from "react"

export const useDimensions = (): { [key: string]: number | null } => {
  const [innerWidth, setW] = useState(typeof window !== `undefined` ? window.innerWidth : null)
  const [innerHeight, setH] = useState(typeof window !== `undefined` ? window.innerHeight : null)

  function windowResizeHandler() {
    if (typeof window !== `undefined`) {
      setW(window.innerWidth)
      setH(window.innerHeight)
    }
  }

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener(`resize`, windowResizeHandler)
      return () => window.removeEventListener(`resize`, windowResizeHandler)
    }

    return undefined
  }, [])

  return { innerWidth, innerHeight }
}

export default useDimensions
