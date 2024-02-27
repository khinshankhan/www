import React from "react"
import { cn } from "@/lib/utils"
import { Logo, type ILogoProps } from "@/components/icons"
import { Link } from "@/components/primitives/link"

interface IHomeToggleProps extends ILogoProps {
  size?: number | string
  scalable?: boolean
}

export function HomeToggle({
  size: sizeProp = undefined,
  scalable = true,
  className = "",
  ...props
}: IHomeToggleProps) {
  return (
    <Link href="/" aria-label="Navigate to homepage." className="home-link">
      <Logo className={cn("size:h-[55px] size-[42px] md:size-[48px]", className)} {...props} />
    </Link>
  )
}
