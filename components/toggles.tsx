import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Logo, type ILogoProps } from "@/components/icons"

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
      <Logo
        className={cn(
          "h-[42px] w-[42px] md:h-[48px] md:w-[48px] lg:h-[55px] lg:w-[55px]",
          className
        )}
        {...props}
      />
    </Link>
  )
}
