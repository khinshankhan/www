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
