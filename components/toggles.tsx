"use client"

import React, { forwardRef, useEffect, useState, type HTMLProps } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useBreakpoint, useMounted } from "@/hooks"
import { Icon, IconButton } from "@/components/ui"
import {
  Hamburger,
  Logo,
  Moon,
  Sun,
  TheaterMasks,
  XMark,
  type ILogoProps,
} from "@/components/icons"

const getSizeParts = (sizeProp?: number | string) => {
  const defaultSize = sizeProp?.toString() ?? `50px`

  // matches consecutive number, then the rest is the second capture group
  const re = /([-0-9]+)(.*)/g
  // @ts-ignore
  const parts = [...defaultSize.matchAll(re)][0] // only interested in the 0th group

  const size = Number(parts[1])
  const unit = parts[2].toString()
  return {
    size,
    unit: unit === "" ? "px" : unit, // unit could just be a number, idc use px as default
  }
}

interface IHomeToggleProps extends ILogoProps {
  size?: number | string
  scalable?: boolean
}

export function HomeToggle({
  size: sizeProp = undefined,
  scalable = true,
  ...props
}: IHomeToggleProps) {
  const { size: defaultSize, unit } = getSizeParts(sizeProp)
  const [size, setSize] = useState(defaultSize.toString() + unit)

  // increase the size to match the main nav on lg bp
  const increasedSize = useBreakpoint("lg")
  useEffect(() => {
    if (scalable && increasedSize) {
      setSize((defaultSize * 1.1).toString() + unit)
    } else {
      setSize(defaultSize.toString() + unit)
    }
  }, [scalable, increasedSize, defaultSize, unit])

  return (
    <Link href="/" aria-label="Navigate to homepage." className="home-link">
      <Logo width={size} height={size} {...props} />
    </Link>
  )
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const mounted = useMounted()
  const { setTheme, resolvedTheme } = useTheme()

  if (!mounted) {
    ;<IconButton className={className}>
      <Icon>
        <TheaterMasks />
      </Icon>
    </IconButton>
  }

  const isLight = resolvedTheme === `light`
  const oppositeTheme = isLight ? `dark` : `light`
  const ColorIcon = isLight ? Moon : Sun

  const toggleTheme = () => setTheme(oppositeTheme)

  return (
    <IconButton
      onClick={toggleTheme}
      aria-label={`Switch to ${oppositeTheme} mode`}
      className={className}
    >
      <Icon>
        <ColorIcon />
      </Icon>
    </IconButton>
  )
}

type ButtonProps = HTMLProps<HTMLButtonElement>
export interface MenuToggleProps extends ButtonProps {
  isOpen: boolean
  type?: "button" | "submit" | "reset"
  className?: string
}

// NOTE: is this just a one off element? maybe it should be moved closed to its usage of it is
export const MenuToggle = forwardRef<HTMLButtonElement, MenuToggleProps>(function MenuToggle(
  props,
  ref
) {
  const { className = "", isOpen, type: buttonType = "button", ...rest } = props
  const MenuIcon = isOpen ? XMark : Hamburger
  const action = isOpen ? "Close" : "Open"

  return (
    <IconButton
      className={className}
      aria-label={`${action} navigation menu.`}
      type={buttonType}
      // this should work but ts is being annoying
      // @ts-ignore
      ref={ref}
      {...rest}
    >
      <Icon>
        <MenuIcon />
      </Icon>
    </IconButton>
  )
})
