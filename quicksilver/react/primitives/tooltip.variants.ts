import { cva } from "class-variance-authority"
import { textVariants } from "./text.variants"

export const tooltipPopupVariants = cva([
  textVariants({ variant: "small" }),
  "z-50 rounded-md bg-stark-contrast px-3 py-1.5 text-surface-1 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]",
  "outline outline-1 outline-stark-contrast",
  "origin-[var(--transform-origin)] transition-[transform,opacity] duration-180 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
  "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[starting-style]:data-[side=bottom]:-translate-y-1 data-[starting-style]:data-[side=left]:translate-x-1 data-[starting-style]:data-[side=right]:-translate-x-1 data-[starting-style]:data-[side=top]:translate-y-1",
  "data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:data-[side=bottom]:-translate-y-0.5 data-[ending-style]:data-[side=left]:translate-x-0.5 data-[ending-style]:data-[side=right]:-translate-x-0.5 data-[ending-style]:data-[side=top]:translate-y-0.5",
])

export const tooltipArrowVariants = cva(
  "pointer-events-none data-[side=bottom]:-top-2 data-[side=left]:-right-[14px] data-[side=left]:rotate-90 data-[side=right]:-left-[14px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180"
)
