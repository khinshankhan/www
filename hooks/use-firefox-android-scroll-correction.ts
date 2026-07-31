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
 * How many rendered frames to keep watching the top after a navigation. Once the page has held the
 * top for this many, later movement stops being treated as toolbar drift -- an empirical cutoff,
 * not a guarantee from the browser. Counted in frames because the check has to observe successive
 * painted states, the drift being a layout event that a timer firing between frames can miss. Not a
 * fixed duration either: eight frames is roughly 133ms at 60Hz and about 67ms at 120Hz.
 *
 * Inside this window a reader who scrolls immediately after tapping a link is indistinguishable
 * from drift and gets reset too. Kept short so that stays cheap.
 */
const TOP_WATCH_FRAME_COUNT = 8

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

          if (framesAtTop >= TOP_WATCH_FRAME_COUNT) {
            stop()
            return
          }
        } else if (framesAtTop > 0) {
          // Left a top we had already seen, so treat it as drift. A reader scrolling within the
          // watch window looks identical and gets reset too; that is the accepted tradeoff.
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
