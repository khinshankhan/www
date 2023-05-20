import { VariantProps, cva } from "class-variance-authority"

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
      /* animated link decorations
       *
       * initially link underline animation was based off https://tobiasahlin.com/blog/css-trick-animating-link-underlines/
       * however since (before:*) would break for multiple lines, new animation is based off the research danny did around
       * the issue https://www.dannyguo.com/blog/animated-multiline-link-underlines-with-css
       */
      link: "bg-gradient-to-r from-link-on to-link-on bg-link-hide bg-[0%_100%] bg-no-repeat text-link-base transition-[color,background-size] duration-500 hover:bg-link-show hover:text-link-active",
      "link-on":
        "bg-gradient-to-r from-link-base to-link-base bg-link-show bg-[0%_100%] bg-no-repeat text-link-on transition-[color,background-size] duration-500 hover:text-link-active",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>
