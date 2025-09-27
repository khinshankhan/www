import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/* string utils */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
