export function scrollToElement(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return // TODO: should probably alert/ toast here
  el.scrollIntoView()
}
