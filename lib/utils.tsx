import tailwindConfig from "@/tailwind.config.mjs"
import { ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/* string utils */

export const customTwMerge = extendTailwindMerge({
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
