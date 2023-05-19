import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* link underline (before:*) animation based off https://tobiasahlin.com/blog/css-trick-animating-link-underlines/ */
const linkStyles =
  "text-link-base before:bg-link-active hover:text-link-active relative before:absolute before:bottom-0 before:left-0 before:block before:h-px before:w-full before:scale-x-0 before:transition-transform before:duration-300 before:content-[''] hover:before:scale-x-100"

export const typographyVariants = cva("typography-transition", {
  variants: {
    variant: {
      default: "text-lg lg:text-[1.3125rem] 2xl:text-[1.43775rem]",
      h1: "font-heading text-3xl font-semibold tracking-wider sm:text-4xl 2xl:text-5xl",
      h2: "font-heading text-2xl font-semibold tracking-wider sm:text-3xl 2xl:text-4xl",
      h3: "font-heading text-xl font-semibold tracking-wide sm:text-2xl 2xl:text-3xl",
      h4: "font-heading text-lg font-semibold tracking-wide sm:text-xl 2xl:text-2xl",
      h5: "font-heading text-base font-semibold tracking-wide sm:text-lg 2xl:text-xl",
      h6: "font-heading text-sm font-semibold tracking-wide sm:text-base 2xl:text-lg",
      /* lg is avg lg and xl */
      "main-nav": "font-heading text-lg font-medium tracking-wide lg:text-[1.344rem]",
      small: "text-xs md:text-sm 2xl:text-base",
      link: linkStyles,
      "link-on": cn(
        linkStyles,
        "text-link-on before:bg-link-base hover:text-link-on before:bg-link-active before:scale-x-100"
      ),
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>
