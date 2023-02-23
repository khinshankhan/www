"use client"

import React from "react"
import Link from "next/link"

import { Logo, type ILogoProps } from "components/icons"

interface IHomeToggleProps extends ILogoProps {
  size?: number | string
  scalable?: boolean
}

// TODO: build out link wrapper
export function HomeToggle(props: IHomeToggleProps) {
  const size = "50px"
  return (
    <Link href="/" aria-label="Navigate to homepage." className="home-link">
      <Logo width={size} height={size} {...props} />
    </Link>
  )
}
