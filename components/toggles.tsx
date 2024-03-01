"use client"

import React, { useCallback } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
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

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const onToggle = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [setTheme, resolvedTheme])

  return (
    <button onClick={onToggle}>
      <SunIcon className="block size-[1.2rem] dark:hidden" />
      <MoonIcon className="hidden size-[1.2rem] dark:block" />
    </button>
  )
}
