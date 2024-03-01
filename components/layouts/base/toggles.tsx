"use client"

import React from "react"
import { useTheme } from "next-themes"
import { capitalize } from "@/lib/utils"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/primitives/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu"

const themeOptionsList = ["light", "dark", "system"]

const ModeButton = React.forwardRef<HTMLButtonElement, {}>((props, ref) => {
  return (
    <button ref={ref} {...props}>
      <SunIcon className="block size-[1.2rem] dark:hidden" />
      <MoonIcon className="hidden size-[1.2rem] dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
})
ModeButton.displayName = "ModeButton"

/* NOTE: normally mode toggle would be 1 component but since the usage is split up, might as well */

export function ModeToggleMobile() {
  const { setTheme, theme } = useTheme()

  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <ModeButton />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-center sm:text-center">
            <DrawerTitle>Mode Toggle</DrawerTitle>
            <DrawerDescription>Set your preferred theme.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <DrawerFooter>
              {themeOptionsList.map((themeOption) => (
                <DrawerClose key={themeOption} asChild>
                  <button disabled={theme === themeOption} onClick={() => setTheme(themeOption)}>
                    {capitalize(themeOption)}
                  </button>
                </DrawerClose>
              ))}
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function ModeToggleDesktop() {
  const { setTheme, theme } = useTheme()

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
          >
            {capitalize(themeOption)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
