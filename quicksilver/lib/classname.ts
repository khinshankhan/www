import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

export { clsx, type ClassValue }

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["14", "16", "18", "20", "24", "30", "36", "48", "60", "72"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
