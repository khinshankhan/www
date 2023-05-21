// TODO: maybe scroll up vs down should be different functions
export function scrollToElement(selector: string) {
  const el = document.querySelector(selector)
  // TODO: should probably alert/ toast here
  if (!el) return
  el.scrollIntoView()
}
