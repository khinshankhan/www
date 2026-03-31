import { cva, type VariantProps } from "class-variance-authority"

export const tabsListVariants = cva("", {
  variants: {
    variant: {
      default: "relative z-0 flex gap-1 border-b border-surface-4 px-1 py-0.5",
      segmented:
        "relative z-0 inline-flex gap-1 rounded-full border border-surface-4/55 bg-background-2 p-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export const tabsTabVariants = cva("", {
  variants: {
    variant: {
      default:
        "flex h-8 cursor-pointer items-center justify-center border-0 px-2 font-medium break-keep whitespace-nowrap text-foreground-muted outline-none select-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:-outline-offset-1 before:outline-stark-contrast hover:text-foreground focus-visible:relative focus-visible:before:absolute focus-visible:before:outline focus-visible:before:outline-1 data-[selected]:text-foreground-strong",
      segmented:
        "text-base min-w-[7.5rem] cursor-pointer rounded-full border border-transparent px-4 py-2 leading-none font-medium whitespace-nowrap text-foreground-subtle transition-colors hover:text-foreground data-[selected]:text-foreground",
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
        "absolute top-1/2 left-0 -z-1 h-6 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 rounded-sm bg-stark-contrast/10 transition-all duration-200 ease-in-out",
      segmented:
        "absolute top-1/2 left-0 -z-1 h-[calc(100%-0.5rem)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 rounded-full border border-surface-5/75 bg-surface-a4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 ease-in-out",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TabsVariantProps = VariantProps<typeof tabsListVariants>
