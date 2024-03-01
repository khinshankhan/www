"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { headerLinks } from "@/config"
import { cn } from "@/lib/utils"
import { Logo, type ILogoProps } from "@/components/icons"
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
            className={typographyVariants({ variant: pathname === link.href ? "link-on" : "link" })}
            onClick={onClick ?? (() => {})}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
