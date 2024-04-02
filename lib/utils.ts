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
