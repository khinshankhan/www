import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const siteFooterVariants = cva("flex w-full flex-col items-center", {
  variants: {
    // variants for positioning the footer based on hero vs page layouts
    position: {
      fixed: "fixed bottom-24",
      static: "pt-14.5 static pb-24",
    },
  },
  defaultVariants: {
    position: "static",
  },
})

type SiteFooterVariantProps = VariantProps<typeof siteFooterVariants>

interface SiteFooterProps extends React.HTMLAttributes<HTMLDivElement>, SiteFooterVariantProps {}

export function FooterParagraph() {
  return <p className="text-center">&copy; 2017+, Khinshan Khan. All rights reserved.</p>
}

export function SiteFooter({ position, className = "", ...props }: SiteFooterProps) {
  return (
    <footer className={cn(siteFooterVariants({ position }), className)} {...props}>
      <FooterParagraph />
    </footer>
  )
}
