import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["14", "16", "18", "20", "24", "30", "36", "48", "60", "72"],
    },
  },
})

/* string utils */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* focus utils */

// NOTE: requires element to be focusable
export function focusElement(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return

  // @ts-expect-error: just trust a focusable element is passed in
  el.focus({ preventScroll: true })
}

export async function checkIfElementInView(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return false

  let observer: IntersectionObserver
  return new Promise((resolve) => {
    observer = new IntersectionObserver(([entry]) => {
      resolve(entry.isIntersecting)
      observer.unobserve(el)
    })

    observer.observe(el)
  })
}

/* scroll utils */

// NOTE: maybe scroll up vs down should be different functions?
export function scrollToElement(selector: string, options?: boolean | ScrollIntoViewOptions) {
  const el = document.querySelector(selector)
  // should probably alert/ toast here about an error?
  // maybe we can lint to ensure no invalid selectors are possible
  if (!el) return
  el.scrollIntoView(options)
}

export async function waitForWindowScrollEnd() {
  return new Promise((resolve) => {
    const onUserScroll = () => {
      resolve(true)
    }

    window.addEventListener("scrollend", onUserScroll, { once: true })
  })
}
