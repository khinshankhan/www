// NOTE: requires element to be focusable
export function focusElement(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return

  if (el instanceof HTMLElement || el instanceof SVGElement) {
    el.focus({ preventScroll: true })
  }
}

export async function checkIfElementInView(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return false

  let observer: IntersectionObserver
  return new Promise((resolve) => {
    observer = new IntersectionObserver(([entry]) => {
      if (!entry) {
        resolve(false)
        return
      }

      resolve(entry.isIntersecting)
      observer.unobserve(el)
    })

    observer.observe(el)
  })
}
