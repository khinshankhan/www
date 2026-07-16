import React, { type HTMLAttributes } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { cva, type VariantProps } from "class-variance-authority"

export const fadeVariants = cva(
  /* fade color is overridable via --edge-fade-color, eg to track a crossfading background */
  "[--edge-fade-from:var(--edge-fade-color,var(--color-background-1))]",
  {
    variants: {
      direction: {
        top: "w-full bg-gradient-to-t",
        bottom: "w-full bg-gradient-to-b",
        left: "h-full bg-gradient-to-l",
        right: "h-full bg-gradient-to-r",
      },
      intensity: {
        soft: "from-(--edge-fade-from) via-(--edge-fade-from)/50 to-(--edge-fade-from)/0",
        strong: "from-(--edge-fade-from) via-(--edge-fade-from)/60 to-(--edge-fade-from)/0",
      },
    },
    defaultVariants: { direction: "bottom", intensity: "soft" },
  }
)

type FadeVariantProps = VariantProps<typeof fadeVariants>

export interface EdgeFadeProps extends HTMLAttributes<HTMLDivElement>, FadeVariantProps {
  direction: NonNullable<FadeVariantProps["direction"]>
}

export function EdgeFade({ direction, intensity = "soft", className, ...props }: EdgeFadeProps) {
  return <div className={cn(fadeVariants({ direction, intensity }), className)} {...props} />
}
