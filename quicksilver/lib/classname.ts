import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

export { clsx, type ClassValue }

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      // must match the --text-* scale in css/tw-sane-base.css, or tailwind-merge
      // misclassifies unlisted sizes as text colors and mis-merges them
      text: ["12", "14", "16", "18", "20", "22", "24", "30", "36", "48", "60", "72"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
