"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { headerLinks } from "@/config"
import { cn } from "@/lib/utils"
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Logo, type ILogoProps } from "@/components/icons"
import { Button } from "@/components/primitives/button"
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
import { Link } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"

interface IHomeLinkProps extends ILogoProps {
  size?: number | string
  scalable?: boolean
}

export function HomeLink({
  size: sizeProp = undefined,
  scalable = true,
  className = "size-[42px] md:size-[45px] lg:size-[55px]",
  ...props
}: IHomeLinkProps) {
  return (
    <Link href="/" aria-label="Navigate to homepage." underline={false} className="home-link">
      <Logo className={cn("", className)} {...props} />
    </Link>
  )
}

export function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname()

  return (
    <ul
      className={cn(
        typographyVariants({ variant: "nav" }),
        "flex flex-col gap-4 md:flex-row",
        className
      )}
    >
      {headerLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} variant={pathname === link.href ? "on" : "default"}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function HamburgerMenu() {
  const pathname = usePathname()

  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <HamburgerMenuIcon className="block size-[1.2rem]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-center sm:text-center">
            <DrawerTitle>Navigation</DrawerTitle>
            <DrawerDescription>Take a journey to another page.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <DrawerFooter>
              {headerLinks.map((link) => (
                <DrawerClose key={link.href} asChild>
                  <Link href={link.href} variant={pathname === link.href ? "disabled" : "default"}>
                    <Button
                      variant="outline"
                      disabled={pathname === link.href}
                      className="flex w-full justify-between"
                    >
                      {link.label}
                      <ArrowRightIcon className="block size-[1.2rem]" />
                    </Button>
                  </Link>
                </DrawerClose>
              ))}
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
