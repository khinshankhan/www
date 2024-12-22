import { type LinkProps } from "next/link"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/* string utils */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
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

/* focus utils */

// NOTE: requires element to be focusable
export function focusElement(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return

  // @ts-expect-error: just trust a focusable element is passed in
  el.focus({ preventScroll: true })
}

export async function checkIfElementInView(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return false

  let observer: IntersectionObserver
  return new Promise((resolve) => {
    observer = new IntersectionObserver(([entry]) => {
      resolve(entry.isIntersecting)
      observer.unobserve(el)
    })

    observer.observe(el)
  })
}

/* scroll utils */

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

/* url utils */

export function isInternalLink(href: LinkProps["href"]) {
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

export function isFileLink(href: LinkProps["href"]) {
  // not bothering with link object, an extension-less url is probably just an url
  if (typeof href !== "string" || !hasExtension(href)) return false
  return COMMON_FILE_EXTENSIONS.includes(getExtension(href).toLowerCase())
}

/* navigator */

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

/* event target utils */

const interactiveTags = ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"]
const interactiveRoles = ["button", "link", "textbox", "listbox", "switch"]
export function isInteractiveElement(element: HTMLElement) {
  return (
    interactiveTags.includes(element.tagName) ||
    interactiveRoles.includes(element.getAttribute("role") || "")
  )
}
