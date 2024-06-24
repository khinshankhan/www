import React from "react"
import { usePathname } from "next/navigation"
import { headerLinks } from "@/settings"
import { cn } from "@/lib/utils"
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Logo, type ILogoProps } from "@/components/logo"
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

interface IHomeLinkProps extends ILogoProps {
  className?: string
  sizes?: string
}

export function HomeLink({
  className = "",
  sizes = "size-[42px] md:size-[45px] lg:size-[55px]",
  ...props
}: IHomeLinkProps) {
  return (
    <Link href="/" aria-label="Navigate to homepage." variant="none" className="home-link">
      <Logo className={cn(sizes, className)} {...props} />
    </Link>
  )
}

export function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname()

  return (
    <ul className={cn("flex flex-col gap-4 md:flex-row", className)}>
      {headerLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} variant="nav" data-active={pathname === link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

// TODO: change icons and use sprite icon
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
                  <Button
                    asChild
                    variant="outline"
                    disabled={pathname === link.href}
                    className="flex w-full justify-between"
                  >
                    <Link variant="toc" href={link.href} data-active={pathname === link.href}>
                      {link.label}
                      <ArrowRightIcon className="block size-[1.2rem]" />
                    </Link>
                  </Button>
                </DrawerClose>
              ))}
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
