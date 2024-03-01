import { cva, VariantProps } from "class-variance-authority"

export const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "font-body text-base tracking-wider antialiased md:text-lg lg:text-xl",
      h1: "font-heading text-3xl font-semibold tracking-wider md:text-4xl lg:text-5xl",
      h2: "font-heading text-2xl font-semibold tracking-wide md:text-3xl lg:text-4xl",
      h3: "font-heading text-xl font-semibold tracking-wide md:text-2xl lg:text-3xl",
      h4: "font-heading text-lg font-semibold tracking-wide md:text-xl lg:text-2xl",
      h5: "font-heading text-base font-semibold tracking-wide md:text-lg lg:text-xl",
      h6: "font-heading text-sm font-semibold tracking-wide md:text-base lg:text-lg",
      nav: "font-body text-base font-medium tracking-wide md:text-lg lg:text-xl",
      small: "font-body text-xs md:text-sm lg:text-base",
      /* animated link decorations
       *
       * initially link underline animation was based off https://tobiasahlin.com/blog/css-trick-animating-link-underlines/
       * however since (before:*) would break for multiple lines, new animation is based off the research danny did around
       * the issue https://www.dannyguo.com/blog/animated-multiline-link-underlines-with-css
       */
      link: "bg-gradient-to-l from-link-on to-link-on bg-link-hide bg-right-bottom bg-no-repeat text-link-base transition-[color,background-size] duration-500 hover:bg-link-show hover:bg-left-bottom hover:text-link-active",
      "link-on":
        "bg-gradient-to-r from-link-base to-link-base bg-link-show bg-[0%_100%] bg-no-repeat text-link-on transition-[color,background-size] duration-500 hover:text-link-active",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>
