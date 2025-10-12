import { cva, VariantProps } from "class-variance-authority"

export const linkVariants = cva("transition-[color] duration-500", {
  variants: {
    variant: {
      default:
        "bg-linear-to-r from-accent-11 to-accent-11 subtle-underline show-underline hover:from-accent-8 hover:to-accent-8 hover:drastic-underline bg-no-repeat",
      nav: "bg-linear-to-r from-accent-11 to-accent-11 link-hide hover:link-show data-[active=true]:link-show bg-right-bottom bg-no-repeat transition-[color,background-size] hover:bg-left-bottom data-[active=true]:bg-left-bottom",
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
})

export type LinkVariants = VariantProps<typeof linkVariants>
