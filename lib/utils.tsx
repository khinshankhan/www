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

export const identity = <T,>(item: T): T => {
  return item
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

/* scroll utils */

// TODO: maybe scroll up vs down should be different functions
export function scrollToElement(selector: string) {
  const el = document.querySelector(selector)
  // TODO: should probably alert/ toast here
  if (!el) return
  el.scrollIntoView()
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

/* clipboard utils */

// based on https://stackoverflow.com/a/65996386
export async function copyToClipboardGraceful(text: string): Promise<boolean> {
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

/* event target utils */

const interactiveTags = ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"]
const interactiveRoles = ["button", "link", "textbox", "listbox", "switch"]
export function isInteractiveElement(element: HTMLElement) {
  return (
    interactiveTags.includes(element.tagName) ||
    interactiveRoles.includes(element.getAttribute("role") || "")
  )
}
