"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/components/base/button"
import { useIsomorphicEffect } from "@/hooks/media"
import { motion } from "framer-motion"
import Slugger from "github-slugger"
import * as Tabs from "@radix-ui/react-tabs"

const slugger = new Slugger()

export interface TabbifyProps {
  labels: string[]
  defaultIndex?: number
  children: React.ReactNode
}

export function Tabbify({ labels, defaultIndex = undefined, children }: TabbifyProps) {
  slugger.reset()

  const labelWithSlugs = labels.map((label) => {
    return {
      label,
      slug: slugger.slug(label),
    }
  })

  const defaultTab = labelWithSlugs[defaultIndex ?? 0]
  const [activeTab, setActiveTab] = useState(defaultTab.slug)
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
      defaultValue={defaultTab.slug}
      onValueChange={(value) => setActiveTab(value)}
    >
      <div className="relative">
        <Tabs.List
          ref={containerRef}
          className="relative flex shrink-0 gap-2"
          aria-label="Change contents"
        >
          {labelWithSlugs.map((labelWithSlug) => (
            <Tabs.Trigger
              key={labelWithSlug.slug}
              value={labelWithSlug.slug}
              asChild
              className="relative focus:outline-hidden"
            >
              <Button aria-label={`Change to ${labelWithSlug.label} contents`} variant="ghost">
                {labelWithSlug.label}
              </Button>
            </Tabs.Trigger>
          ))}

          {/* static underline */}
          <span className="absolute bottom-0 h-0.5 w-full bg-knockout/10 duration-0" />

          {/* animated underline */}
          <motion.div
            className="absolute bottom-0 h-0.5 w-full bg-accent-11"
            animate={underlineStyle}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        </Tabs.List>
      </div>

      {labelWithSlugs.map((labelWithSlug, labelIdx) => (
        <Tabs.Content key={labelWithSlug.slug} className="mt-4" value={labelWithSlug.slug}>
          {React.Children.toArray(children)[labelIdx]}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
