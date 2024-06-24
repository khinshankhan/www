import React from "react"
import { cn } from "@/lib/utils"

interface DividerProps {
  text?: React.ReactNode
  width?: string
  gradient?: string
  bg?: string
  textColor?: string
}

export function Divider({
  text,
  width = "w-full",
  gradient = "bg-gradient-to-r from-knockout/0 via-knockout/30 to-knockout/0",
  bg = "bg-background",
  textColor = "text-knockout",
}: DividerProps) {
  return (
    <div role="separator" className="relative">
      <div className={cn("mx-auto h-px", gradient, width)}></div>

      {text && (
        <div className="flex -translate-y-3 justify-center">
          <div className={cn("px-2", bg)}>
            <span className={cn("text-xs uppercase", textColor)}>{text}</span>
          </div>
        </div>
      )}
    </div>
  )
}
