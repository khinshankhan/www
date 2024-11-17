import React, { Children } from "react"
import { Button } from "@/components/base/button"
import * as Tabs from "@radix-ui/react-tabs"

export interface TabbifyProps {
  labels: string[]
  defaultValue?: string
  children: React.ReactNode
}

export function Tabbify({ labels, defaultValue = undefined, children }: TabbifyProps) {
  return (
    <Tabs.Root className="" defaultValue={defaultValue ?? labels[0]}>
      <Tabs.List className="flex shrink-0 gap-2 border-b" aria-label="Change contents">
        {labels.map((label) => {
          return (
            <Tabs.Trigger key={label} value={label} asChild>
              <Button aria-label={`Change to ${label} contents`} variant="ghost">
                {label}
              </Button>
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>

      {labels.map((label, labelIdx) => {
        return (
          <Tabs.Content key={label} className="mt-4" value={label}>
            {Children.toArray(children)[labelIdx]}
          </Tabs.Content>
        )
      })}
    </Tabs.Root>
  )
}
