"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { headerLinks } from "@/config"
import { cn } from "@/lib/utils"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
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
    <Link href="/" aria-label="Navigate to homepage." className="home-link">
      <Logo className={cn("", className)} {...props} />
    </Link>
  )
}

export function NavLinks({
  className = "",
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
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
          <Link
            href={link.href}
            variant={pathname === link.href ? "on" : "default"}
            onClick={onClick ?? (() => {})}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function HamburgerMenu() {
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <button>
          <HamburgerMenuIcon className="block size-[1.2rem]" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-center sm:text-center">
            <DrawerTitle>Navigation</DrawerTitle>
            <DrawerDescription>Take a journey to another page.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <DrawerFooter>
              <DrawerClose asChild>
                <NavLinks className="text-center" />
              </DrawerClose>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
