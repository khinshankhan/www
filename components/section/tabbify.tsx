"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/components/base/button"
import { useIsomorphicEffect } from "@/hooks/media"
import { motion } from "framer-motion"
import * as Tabs from "@radix-ui/react-tabs"

export interface TabbifyProps {
  labels: string[]
  defaultValue?: string
  children: React.ReactNode
}

export function Tabbify({ labels, defaultValue = undefined, children }: TabbifyProps) {
  const [activeTab, setActiveTab] = useState(defaultValue ?? labels[0])
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const updateUnderline = () => {
    if (!containerRef.current) return

    const activeTrigger = containerRef.current.querySelector(`[data-state="active"]`) as HTMLElement
    if (activeTrigger) {
      setUnderlineStyle({
        width: activeTrigger.offsetWidth,
        left: activeTrigger.offsetLeft,
      })
    }
  }

  useIsomorphicEffect(() => {
    updateUnderline()
    window.addEventListener("resize", updateUnderline)
    return () => {
      window.removeEventListener("resize", updateUnderline)
    }
  }, [activeTab])

  return (
    <Tabs.Root
      className=""
      defaultValue={defaultValue ?? labels[0]}
      onValueChange={(value) => setActiveTab(value)}
    >
      <div className="relative">
        <Tabs.List
          ref={containerRef}
          className="relative flex shrink-0 gap-2"
          aria-label="Change contents"
        >
          {labels.map((label) => (
            <Tabs.Trigger key={label} value={label} asChild className="relative focus:outline-none">
              <Button aria-label={`Change to ${label} contents`} variant="ghost">
                {label}
              </Button>
            </Tabs.Trigger>
          ))}

          {/* static underline */}
          <span className="absolute bottom-0 h-0.5 w-full bg-knockout/10 duration-0" />

          {/* animated underline */}
          <motion.div
            className="absolute bottom-0 h-0.5 w-full bg-accent-link"
            animate={underlineStyle}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        </Tabs.List>
      </div>

      {labels.map((label, labelIdx) => (
        <Tabs.Content key={label} className="mt-4" value={label}>
          {React.Children.toArray(children)[labelIdx]}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
