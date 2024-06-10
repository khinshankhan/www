import React from "react"
import { usePathname } from "next/navigation"
import { headerLinks } from "@/settings"
import { cn } from "@/lib/utils"
import { Logo, type ILogoProps } from "@/components/logo"
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
