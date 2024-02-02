import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"
import overrides from "@/lib/theme/overrides"

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": Object.keys(overrides.fontSize)
        // slightly dangerous as Object.keys casts to string but I know they are numbers as that's how I think of them
        .map(Number)
        // unnecessary, but I like to keep them in order. ideally we should define the order of conflicting classes but
        // I don't know how to do that without messing up other text classes
        .sort()
        .map((size) => (size < 0 ? `-text-${Math.abs(size)}` : `text-${size}`)),
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
