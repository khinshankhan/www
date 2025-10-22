import React, { type HTMLAttributes } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Paragraph } from "@/quicksilver/react/primitives/text"
import { cva, type VariantProps } from "class-variance-authority"

const footerVariants = cva("flex w-full flex-col items-center", {
  variants: {
    // variants for positioning the footer based on hero vs page layouts
    position: {
      fixed: "fixed bottom-24",
      static: "static pt-14.5 pb-24",
    },
  },
  defaultVariants: {
    position: "static",
  },
})

type FooterVariantProps = VariantProps<typeof footerVariants>

interface FooterProps extends HTMLAttributes<HTMLDivElement>, FooterVariantProps {}

export function FooterParagraph() {
  return (
    <Paragraph variant="nav" className="text-center">
      &copy; 2017+, Khinshan Khan. All rights reserved.
    </Paragraph>
  )
}

export function Footer({ position, className = "", ...props }: FooterProps) {
  return (
    <footer className={cn(footerVariants({ position }), className)} {...props}>
      <FooterParagraph />
    </footer>
  )
}
