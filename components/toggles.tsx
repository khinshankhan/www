"use client"

import React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Logo, type ILogoProps } from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu"
import { Link } from "@/components/primitives/link"

interface IHomeToggleProps extends ILogoProps {
  size?: number | string
  scalable?: boolean
}

export function HomeToggle({
  size: sizeProp = undefined,
  scalable = true,
  className = "size-[42px] md:size-[45px] lg:size-[55px]",
  ...props
}: IHomeToggleProps) {
  return (
    <Link href="/" aria-label="Navigate to homepage." className="home-link">
      <Logo className={cn("", className)} {...props} />
    </Link>
  )
}

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button>
          <SunIcon className="block size-[1.2rem] dark:hidden" />
          <MoonIcon className="hidden size-[1.2rem] dark:block" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled={theme === "light"} onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem disabled={theme === "dark"} onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem disabled={theme === "system"} onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
