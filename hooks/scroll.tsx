import React, { useEffect, useRef, useState } from "react"
import { useIsomorphicEffect } from "./media"

const defaultTarget = typeof window !== "undefined" ? window : null
const defaultUpThreshold = 0
const defaultDownThreshold = 0

interface UseScrollDirectionProps {
  initalIsScrollingUp?: boolean
  target?: Node | Window | null
  upThreshold?: number
  downThreshold?: number
}

export function useScrollDirection({
  initalIsScrollingUp = false,
  target = defaultTarget,
  upThreshold = defaultUpThreshold,
  downThreshold = defaultDownThreshold,
}: UseScrollDirectionProps): boolean {
  const [ticking, setTicking] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(initalIsScrollingUp)

  useEffect(() => {
    const handleScrollUpdate = () => {
      const currentScrollTop = target.pageYOffset || document.documentElement.scrollTop
      const distanceScrolled = Math.abs(currentScrollTop - lastScrollTop)

      if (currentScrollTop < lastScrollTop && distanceScrolled > upThreshold) {
        setIsScrollingUp(true)
      } else if (currentScrollTop > lastScrollTop && distanceScrolled > downThreshold) {
        setIsScrollingUp(false)
      }

      setLastScrollTop(currentScrollTop)
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollUpdate()
          setTicking(false)
        })
        setTicking(true)
      }
    }

    target.addEventListener("scroll", handleScroll)
    return () => target.removeEventListener("scroll", handleScroll)
  }, [target, lastScrollTop, upThreshold, downThreshold, ticking])

  return isScrollingUp
}

interface UseHeadroomProps extends UseScrollDirectionProps {
  pinStart?: number
}

interface UseHeadroomState {
  positionStatus: "before-start" | "at-start" | "after-start"
  isScrollingUp: boolean
}

export function useHeadroom({
  target = defaultTarget,
  initalIsScrollingUp,
  upThreshold = defaultUpThreshold,
  downThreshold = defaultDownThreshold,
  pinStart = 0,
}: UseHeadroomProps): HeadroomState {
  const [ticking, setTicking] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const isScrollingUp = useScrollDirection({
    initalIsScrollingUp,
    target,
    upThreshold,
    downThreshold,
  })
  const [positionStatus, setPositionStatus] =
    useState<HeadroomState["positionStatus"]>("before-start")

  useIsomorphicEffect(() => {
    if (!target) return

    const handleScrollUpdate = () => {
      const currentScrollTop = target.pageYOffset
      setPositionStatus((_) => {
        if (currentScrollTop < pinStart) {
          return "before-start"
        } else if (currentScrollTop > pinStart) {
          return "after-start"
        } else {
          return "at-start"
        }
      })
      setLastScrollTop(currentScrollTop)
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollUpdate()
          setTicking(false)
        })
        setTicking(true)
      }
    }

    target.addEventListener("scroll", handleScroll)
    return () => {
      target.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollTop])

  return { positionStatus, isScrollingUp }
}
