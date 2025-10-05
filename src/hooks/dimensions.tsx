import { useRef, useState } from "react"
import { useIsomorphicEffect } from "@/hooks/core/useIsomorphicEffect"

interface Size {
  width: number
  height: number
  top: number
  left: number
}

export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [rect, setRect] = useState<Size>({ width: 0, height: 0, top: 0, left: 0 })

  useIsomorphicEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const r = el.getBoundingClientRect()
      setRect({ width: r.width, height: r.height, top: r.top, left: r.left })
    }

    // measure immediately (should cover first render and font loads)
    measure()

    // Watch element size changes
    const ro = new ResizeObserver(() => {
      // batch with raf to avoid layout thrashing
      requestAnimationFrame(measure)
    })
    ro.observe(el)

    window.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)

    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
    }
  }, [])

  return { ref, rect }
}
