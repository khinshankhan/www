import { cva, type VariantProps } from "class-variance-authority"
import { focusRing } from "./focus.variants"

export const linkVariants = cva(
  [
    focusRing,
    // links are inline text with no radius of their own, so the ring would otherwise
    // trace a hard-cornered rectangle; soften it without reading as a pill
    "focus-visible:rounded-sm",
    "transition-[color] duration-500",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-r from-accent-11 to-accent-11 subtle-underline show-underline bg-no-repeat hover:from-accent-8 hover:to-accent-8 hover:drastic-underline",
        nav: "bg-linear-to-r from-accent-11 to-accent-11 link-hide bg-right-bottom bg-no-repeat transition-[color,background-size] hover:link-show hover:bg-left-bottom data-[active=true]:link-show data-[active=true]:bg-left-bottom",
        toc: "data-[active=true]:text-accent-11",
        none: "",
      },
      isMonochrome: {
        false: "hover:text-accent-11",
        true: "",
      },
    },
    defaultVariants: {
      variant: "default",
      isMonochrome: false,
    },
  }
)

export type LinkVariants = VariantProps<typeof linkVariants>
