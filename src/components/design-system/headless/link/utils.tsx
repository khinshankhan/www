import { type LinkKind } from "./types"

export function isMailtoLite(href: string): href is "mailto" {
  return href.startsWith("mailto:")
}

export function isTelLite(href: string): href is "tel" {
  return href.startsWith("tel:")
}

export function isHashLite(href: string): href is "hash" {
  return href.startsWith("#")
}

export function isInternalLite(href: string): href is "internal" {
  return href.startsWith("/")
}

export function isExternalLite(href: string): href is "external" {
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
