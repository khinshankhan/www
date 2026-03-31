import { cva, type VariantProps } from "class-variance-authority"

export const drawerBackdropVariants = cva(
  "fixed inset-0 bg-black/60 opacity-100 transition-opacity duration-220 ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[swiping]:transition-none motion-reduce:transition-none"
)

export const drawerViewportVariants = cva("fixed inset-0 isolate overflow-hidden")

export const drawerPopupVariants = cva(
  "pointer-events-none absolute inset-0 z-10 flex transform-gpu items-end transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full data-[swiping]:transition-none motion-reduce:transition-none"
)

export const drawerContentVariants = cva(
  "pointer-events-auto relative w-full overscroll-contain rounded-t-3xl border border-surface-7/60 bg-background-1 shadow-[0_-24px_80px_rgba(0,0,0,0.22)]",
  {
    variants: {
      size: {
        auto: "",
        sm: "h-[56vh]",
        default: "h-[72vh]",
        lg: "h-[84vh]",
        full: "h-dvh rounded-none border-x-0 border-b-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export const drawerSwipeAreaVariants = cva("fixed inset-x-0 bottom-0 z-1 h-8 touch-none")

export const drawerUnderlayVariants = cva(
  "pointer-events-none fixed inset-x-0 bottom-0 z-0 h-0 bg-background-1 opacity-0"
)

export type DrawerContentVariantProps = VariantProps<typeof drawerContentVariants>
