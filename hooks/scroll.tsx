"use client"

import React, { useEffect, useRef, useState } from "react"
import { useIsomorphicEffect } from "./media"

// TODO: add support for custom target
type Target = (Window & typeof globalThis) | null
const defaultTarget = typeof window !== "undefined" ? window : null

interface UseScrollDirectionProps {
  initalIsScrollingUp?: boolean
  target?: Target
  upThreshold?: number
  downThreshold?: number
}

interface UseScrollDirectionState {
  isScrollingUp: boolean
}

export function useScrollDirection({
  initalIsScrollingUp = false,
  target = defaultTarget,
  upThreshold = 0,
  downThreshold = 0,
}: UseScrollDirectionProps): UseScrollDirectionState {
  const [ticking, setTicking] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(initalIsScrollingUp)

  useIsomorphicEffect(() => {
    if (!target) return

    const handleScrollUpdate = () => {
      const currentScrollTop = target.scrollY || document.documentElement.scrollTop
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

  return { isScrollingUp }
}

interface UseHeadroomProps {
  target?: Target
  pinStart?: number
}

interface UseHeadroomState {
  positionStatus: "before-start" | "at-start" | "after-start"
}

export function useHeadroom({
  target = defaultTarget,
  pinStart = 0,
}: UseHeadroomProps): UseHeadroomState {
  const [ticking, setTicking] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [positionStatus, setPositionStatus] =
    useState<UseHeadroomState["positionStatus"]>("before-start")

  useIsomorphicEffect(() => {
    if (!target) return

    const handleScrollUpdate = () => {
      const currentScrollTop = target.scrollY
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
  }, [target, lastScrollTop])

  return { positionStatus }
}
