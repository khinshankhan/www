import { type LinkProps } from "next/link"
import tailwindConfig from "@/tailwind.config.mjs"
import { ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/* string utils */

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-position": [{ bg: Object.keys(tailwindConfig?.theme?.extend?.backgroundPosition ?? {}) }],
      "bg-size": [{ bg: Object.keys(tailwindConfig?.theme?.extend?.backgroundSize ?? {}) }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/* boolean predicates */

export const existPredicate = <T,>(item: T | undefined | null): item is T => {
  return item !== null && item !== undefined
}

/* array utils */

export function range(startOrEnd: number, end?: number, step: number = 1): number[] {
  if (step === 0) {
    throw new Error("Step cannot be zero.")
  }

  const actualStart = end === undefined ? 0 : startOrEnd
  const actualEnd = end === undefined ? startOrEnd : end

  const n = Math.max(Math.ceil((actualEnd - actualStart) / step), 0)
  return Array.from({ length: n }, (_, index) => actualStart + index * step)
}

/* url utils */

// isRelative means within the project, not necessary the opposite of absolute
export function isRelative(href: LinkProps["href"]) {
  return (
    // if href is a url obj it's a local link with state (probably)
    typeof href !== "string" ||
    // / is totally a local url
    href.startsWith("/") ||
    // # means same page so still relative
    href.startsWith("#")
  )
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
const COMMON_FILE_EXTENSIONS = ["pdf", "svg"]

export function isUrlFile(href: LinkProps["href"]) {
  // not bothering with link object, an extension-less url is probably just an url
  if (typeof href !== "string" || !hasExtension(href)) return false
  return COMMON_FILE_EXTENSIONS.includes(getExtension(href).toLowerCase())
}
