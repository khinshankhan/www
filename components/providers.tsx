"use client"

import React, { type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { TooltipProvider as RadixTooltipProvider } from "@radix-ui/react-tooltip"

// https://github.com/pacocoursey/next-themes/issues/152#issuecomment-1364280564

export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />
}

export const TooltipProvider = RadixTooltipProvider

export function FramerMotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <div className="h-full w-full" key={pathname}>
          {children}
        </div>
      </AnimatePresence>
    </LazyMotion>
  )
}
