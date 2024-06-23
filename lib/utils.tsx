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
