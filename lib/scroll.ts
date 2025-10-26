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
