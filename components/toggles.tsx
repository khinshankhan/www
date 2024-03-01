"use client"

import React from "react"
import { useTheme } from "next-themes"
import { capitalize, cn } from "@/lib/utils"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Logo, type ILogoProps } from "@/components/icons"
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
    <>
      <div className="hidden md:block">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button>
              <SunIcon className="block size-[1.2rem] dark:hidden" />
              <MoonIcon className="hidden size-[1.2rem] dark:block" />
              <span className="sr-only">Toggle theme</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["light", "dark", "system"].map((themeType) => (
              <DropdownMenuItem
                key={themeType}
                disabled={theme === themeType}
                onClick={() => setTheme(themeType)}
              >
                {capitalize(themeType)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="block md:hidden">
        <Drawer shouldScaleBackground={true}>
          <DrawerTrigger asChild>
            <button>
              <SunIcon className="block size-[1.2rem] dark:hidden" />
              <MoonIcon className="hidden size-[1.2rem] dark:block" />
              <span className="sr-only">Toggle theme</span>
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="text-center sm:text-center">
                <DrawerTitle>Mode Toggle</DrawerTitle>
                <DrawerDescription>Set your preferred theme.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <DrawerFooter>
                  {["light", "dark", "system"].map((themeType) => (
                    <DrawerClose key={themeType} asChild>
                      <button disabled={theme === themeType} onClick={() => setTheme(themeType)}>
                        {capitalize(themeType)}
                      </button>
                    </DrawerClose>
                  ))}
                </DrawerFooter>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}
