import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(word: string) {
  if (!word) return ""
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export const existPredicate = <T>(item: T | undefined | null): item is T => {
  return item !== null && item !== undefined
}

export const truthyPredicate = <T>(item: T | false): item is T => {
  return Boolean(item)
}

// TODO: maybe scroll up vs down should be different functions
export function scrollToElement(selector: string) {
  const el = document.querySelector(selector)
  // TODO: should probably alert/ toast here
  if (!el) return
  el.scrollIntoView()
}
