export function isInternalPageNavigation(event: MouseEvent) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    !(event.target instanceof Element)
  ) {
    return false
  }

  const anchor = event.target.closest<HTMLAnchorElement>("a[href]")
  if (!anchor || anchor.download || (anchor.target && anchor.target !== "_self")) {
    return false
  }

  const destination = new URL(anchor.href)
  // Hash links are excluded deliberately: they're meant to land mid-page (TOC anchors), so
  // callers correcting scroll must leave them alone.
  if (destination.origin !== window.location.origin || destination.hash) {
    return false
  }

  return (
    destination.pathname !== window.location.pathname ||
    destination.search !== window.location.search
  )
}
