import { cva, type VariantProps } from "class-variance-authority"
import { focusRingInset } from "./focus.variants"

export const tabsRootVariants = cva("overflow-hidden rounded-md", {
  variants: {
    variant: {
      default: "border border-muted bg-background-1",
      segmented: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export const tabsListVariants = cva("", {
  variants: {
    variant: {
      default: "relative z-0 flex gap-1 border-b border-surface-4 px-1 py-0.5",
      segmented:
        "relative z-0 inline-flex gap-1 rounded-full border border-surface-4/55 bg-background-2/90 p-1 backdrop-blur-xs",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export const tabsTabVariants = cva("", {
  variants: {
    variant: {
      default: [
        focusRingInset,
        "flex h-8 cursor-pointer items-center justify-center rounded-sm border-0 px-2 font-medium break-keep whitespace-nowrap text-foreground-muted transition-[color,transform] duration-200 ease-out select-none hover:text-foreground data-[active]:text-foreground-strong",
      ],
      segmented: [
        focusRingInset,
        "text-base min-w-[7.5rem] cursor-pointer rounded-full border border-transparent px-4 py-2 leading-none font-medium whitespace-nowrap text-foreground-subtle transition-[color,transform] duration-200 ease-out hover:text-foreground data-[active]:translate-y-[-0.5px] data-[active]:text-foreground",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export const tabsIndicatorVariants = cva("", {
  variants: {
    variant: {
      default:
        "absolute top-1/2 left-0 -z-1 h-6 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 rounded-sm bg-stark-contrast/10 transition-[translate,width,height] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
      segmented:
        "absolute top-1/2 left-0 -z-1 h-[calc(100%-0.5rem)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 rounded-full border border-surface-5/75 bg-surface-a4 transition-[translate,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export const tabsPanelVariants = cva([
  focusRingInset,
  "relative bg-background-2 focus-visible:rounded-md focus-visible:rounded-t-none",
])

export type TabsVariantProps = VariantProps<typeof tabsListVariants>
