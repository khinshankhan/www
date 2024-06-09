import tailwindConfig from "@/tailwind.config.mjs"
import { ClassValue, clsx } from "clsx"
import { extendTailwindMerge, twMerge } from "tailwind-merge"

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
