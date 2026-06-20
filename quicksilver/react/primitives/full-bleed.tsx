import { type ComponentPropsWithoutRef, type CSSProperties } from "react"
import { cn } from "@/quicksilver/lib/classname"

export interface FullBleedProps extends ComponentPropsWithoutRef<"div"> {
  background: string
  border?: string
}

export function FullBleed({
  background,
  border,
  children,
  className,
  style,
  ...props
}: FullBleedProps) {
  return (
    <div
      className={cn(
        "relative bg-(--full-bleed-bg) shadow-[0_0_0_100vmax_var(--full-bleed-bg)] [clip-path:inset(0_-100vmax)]",
        border &&
          "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-(--full-bleed-border) before:shadow-[0_0_0_100vmax_var(--full-bleed-border)] before:content-[''] before:[clip-path:inset(0_-100vmax)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-(--full-bleed-border) after:shadow-[0_0_0_100vmax_var(--full-bleed-border)] after:content-[''] after:[clip-path:inset(0_-100vmax)]",
        className
      )}
      style={
        {
          ...style,
          "--full-bleed-bg": background,
          "--full-bleed-border": border,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
}
