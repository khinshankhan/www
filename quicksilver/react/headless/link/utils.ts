import type { LinkKind, LinkProps } from "./types"

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

export function getSaneProps(kind: LinkKind): Partial<LinkProps> {
  return {
    target: kind !== "external" ? undefined : "_blank",
    rel: kind !== "external" ? undefined : "noopener noreferrer external",
  }
}

// NOTE: extension logic should be used with the path rather than the url itself
export function hasExtension(ext: string) {
  return /\.[0-9a-z]+$/i.test(ext)
}

export function getExtension(href: string) {
  const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(href) ?? []
  return extension ?? ""
}

// TODO: exclude common extensions that are files
// NOTE: to some extent it will have to be manual vigilance when creating links
const COMMON_FILE_EXTENSIONS = ["pdf", "svg", "png"]

export function isFileLite(
  href: string | undefined,
  fileExtensions = COMMON_FILE_EXTENSIONS
): boolean {
  if (!href) {
    return false
  }

  if (!hasExtension(href)) {
    return false
  }
  return fileExtensions.includes(getExtension(href).toLowerCase())
}
