"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { useBreakpoint } from "hooks"

import { Logo, type ILogoProps } from "components/icons"

const getSizeParts = (sizeProp?: number | string) => {
  const defaultSize = sizeProp?.toString() ?? `50px`

  // matches consecutive number, then the rest is the second capture group
  const re = /([-0-9]+)(.*)/g
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
