import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function narray(n: number) {
  return Array.from({ length: n }, (_v, i) => i)
}
