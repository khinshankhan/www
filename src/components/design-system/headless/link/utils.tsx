import { type LinkKind } from "./types"

export function isMailtoLite(href: string): boolean {
  return href.startsWith("mailto:")
}

export function isTelLite(href: string): boolean {
  return href.startsWith("tel:")
}

export function isHashLite(href: string): boolean {
  return href.startsWith("#")
}

export function isInternalLite(href: string): boolean {
  return href.startsWith("/")
}

export function isExternalLite(href: string): boolean {
  return !isHashLite(href) && !isMailtoLite(href) && !isTelLite(href) && !isInternalLite(href)
}

export function resolveKindLite(href: string): LinkKind {
  if (isMailtoLite(href)) {
    return "mailto"
  }
  if (isTelLite(href)) {
    return "tel"
  }

  if (isHashLite(href)) {
    return "hash"
  }
  return isInternalLite(href) ? "internal" : "external"
}
