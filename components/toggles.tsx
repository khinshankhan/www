"use client"

import React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
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
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              disabled={theme === "light"}
              onClick={() => setTheme("light")}
              className="flex justify-center"
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={theme === "dark"}
              onClick={() => setTheme("dark")}
              className="flex justify-center"
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={theme === "system"}
              onClick={() => setTheme("system")}
              className="flex justify-center"
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="block md:hidden">
        <Drawer>
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
                  <DrawerClose asChild>
                    <button disabled={theme === "light"} onClick={() => setTheme("light")}>
                      Light
                    </button>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <button disabled={theme === "dark"} onClick={() => setTheme("dark")}>
                      Dark
                    </button>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <button disabled={theme === "system"} onClick={() => setTheme("system")}>
                      System
                    </button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}
