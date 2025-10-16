import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const fadeVariants = cva("", {
  variants: {
    direction: {
      top: "w-full bg-gradient-to-t",
      bottom: "w-full bg-gradient-to-b",
      left: "h-full bg-gradient-to-l",
      right: "h-full bg-gradient-to-r",
    },
    // TODO: abstract out gradient colors to tokens
    intensity: {
      soft: "from-background-1/100 via-background-1/50 to-background-1/0",
      strong: "from-background-1/100 via-background-1/60 to-background-1/0",
    },
  },
  defaultVariants: { direction: "bottom", intensity: "soft" },
})

type FadeVariantProps = VariantProps<typeof fadeVariants>

export interface EdgeFadeProps extends React.HTMLAttributes<HTMLDivElement>, FadeVariantProps {
  direction: NonNullable<FadeVariantProps["direction"]>
}

export function EdgeFade({
  direction,
  intensity = "soft",
  className = "",
  ...props
}: EdgeFadeProps) {
  return <div className={cn(fadeVariants({ direction, intensity }), className)} {...props} />
}
