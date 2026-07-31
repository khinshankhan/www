/**
 * Firefox for Android's "hide address bar on scroll" resizes the viewport while a client-side
 * navigation is landing. The page reaches the top correctly and the browser then shifts it back
 * down, leaving the new page scrolled part-way. Only reproducible on a real device -- desktop
 * Gecko (and so headless Firefox) has no dynamic toolbar as far as i know.
 *
 * Preventing the shift proved impractical, so instead watch for its signature -- settle at the
 * top, then leave it without the user asking -- and correct once.
 */

import { useEffect } from "react"
import { isInternalPageNavigation } from "@/lib/navigation"
import { isFirefoxAndroid } from "@/lib/user-agent"

/** Give up if the navigation never settles, so a watcher can't outlive the thing it's watching. */
const NAVIGATION_TIMEOUT_MS = 5_000
/**
 * Frames the page must sit at the top before we trust the landing. Long enough to outlast the
 * drift, short enough not to catch a deliberate scroll. Frames, not a timeout, because the shift
 * is tied to paint.
 */
const SETTLE_FRAME_COUNT = 8

export function useFirefoxAndroidScrollCorrection() {
  useEffect(() => {
    if (!isFirefoxAndroid(navigator.userAgent)) {
      return
    }

    let animationFrame = 0

    const stop = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = 0
    }

    const watchNavigation = () => {
      stop()

      const startedAt = performance.now()
      let framesAtTop = 0

      const sample = (now: number) => {
        if (now - startedAt >= NAVIGATION_TIMEOUT_MS) {
          stop()
          return
        }

        if (window.scrollY <= 1) {
          framesAtTop += 1

          if (framesAtTop >= SETTLE_FRAME_COUNT) {
            stop()
            return
          }
        } else if (framesAtTop > 0) {
          // Only a departure from a top we already saw settle counts as drift. Without that
          // guard, someone scrolling immediately after navigating would get yanked back.
          stop()
          window.scrollTo({ top: 0, left: window.scrollX, behavior: "instant" })
          return
        }

        animationFrame = window.requestAnimationFrame(sample)
      }

      animationFrame = window.requestAnimationFrame(sample)
    }

    const onClick = (event: MouseEvent) => {
      if (isInternalPageNavigation(event)) {
        watchNavigation()
      }
    }

    document.addEventListener("click", onClick, true)

    return () => {
      document.removeEventListener("click", onClick, true)
      stop()
    }
  }, [])
}
