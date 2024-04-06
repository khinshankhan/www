import { type LinkProps } from "next/link"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/* string utils */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(word: string) {
  if (!word) return ""
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

/* boolean predicates */

export const existPredicate = <T>(item: T | undefined | null): item is T => {
  return item !== null && item !== undefined
}

export const truthyPredicate = <T>(item: T | false): item is T => {
  return Boolean(item)
}

/* scroll utils */

// TODO: maybe scroll up vs down should be different functions
export function scrollToElement(selector: string) {
  const el = document.querySelector(selector)
  // TODO: should probably alert/ toast here
  if (!el) return
  el.scrollIntoView()
}

/* clipboard utils */

// from https://stackoverflow.com/a/65996386
async function copyToClipboardGraceful(text: string): Promise<boolean> {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  // Use the 'out of viewport hidden text area' trick
  const textArea = document.createElement("textarea")
  textArea.value = text

  // Move textarea out of the viewport so it's not visible
  textArea.style.position = "absolute"
  textArea.style.left = "-999999px"

  document.body.prepend(textArea)
  textArea.select()

  try {
    // NOTE: deprecated how it's literally for old browsers lol
    document?.execCommand("copy")
    return true
  } catch (error) {
    console.error(error)
    return false
  } finally {
    textArea.remove()
  }
}

export async function copyToClipboard(text: string): Promise<void> {
  const success = await copyToClipboardGraceful(text)
  if (!success) {
    throw new Error("Failed to copy text to clipboard")
  }
}

/* unit utils */

interface GetSizePartsProps {
  size?: number | string
  unit?: string
  fallbackSize?: number | string
}

export function getSizeParts({
  size,
  unit = "px", // unit could just be a number, idc use px as default
  fallbackSize = 50,
}: GetSizePartsProps): { size: number; unit: string } {
  if (typeof size === "number") {
    return { size, unit }
  }

  if (size === undefined) {
    return getSizeParts({ size: fallbackSize, unit, fallbackSize })
  }

  // matches consecutive number, then the rest is the second capture group
  const re = /([-0-9]+)(.*)/g
  // @ts-ignore
  const parts = [...size.matchAll(re)][0] // only interested in the 0th group

  const sizeNumber = Number(parts[1])
  const sizeUnit = parts[2].toString()
  return {
    size: sizeNumber,
    unit: sizeUnit === "" ? sizeUnit : unit,
  }
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
