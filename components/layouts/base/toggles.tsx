"use client"

import React from "react"
import { useTheme } from "next-themes"
import { capitalize } from "@/lib/utils"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/primitives/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu"

const themeOptionsList = ["light", "dark", "system"]

const ModeButton = React.forwardRef<HTMLButtonElement, {}>((props, ref) => {
  return (
    <Button variant="ghost" size="icon" ref={ref} {...props}>
      <SunIcon className="block size-[1.2rem] dark:hidden" />
      <MoonIcon className="hidden size-[1.2rem] dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
})
ModeButton.displayName = "ModeButton"

export function ModeToggleDesktop() {
  const { setTheme, theme, systemTheme } = useTheme()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ModeButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptionsList.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption}
            disabled={theme === themeOption}
            onClick={() => setTheme(themeOption)}
            className="flex justify-between"
          >
            {capitalize(themeOption)}

            {(themeOption === "light" || (themeOption === "system" && systemTheme === "light")) && (
              <SunIcon className="size-[1.2rem]" />
            )}
            {(themeOption === "dark" || (themeOption === "system" && systemTheme === "dark")) && (
              <MoonIcon className="size-[1.2rem]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
