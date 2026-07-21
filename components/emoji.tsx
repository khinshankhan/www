"use client"

import React, { useState } from "react"
import { emojiLookup, type EmojiKey } from "@/lib/emoji"
import { cn } from "@/quicksilver/lib/classname"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { TooltipContent, TooltipRoot, TooltipTrigger } from "@/quicksilver/react/primitives/tooltip"
import { InvalidEmojiException } from "@khinshankhan/emoji-helper-core"

interface EmojiProps {
  name: EmojiKey
  className?: string
  wrapperClassName?: string
}

export function Emoji({
  name,
  className: providedClassName = "",
  wrapperClassName = "",
}: EmojiProps) {
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleMouseEnter = () => setHovering(true)
  const handleMouseLeave = () => setHovering(false)

  // controlled open bypasses Base UI's built-in triggers, so each open path is tracked here
  const isTooltipOpen = hovering || focused || clicked

  const emojiInfo = emojiLookup.get(name)
  if (emojiInfo === undefined) {
    throw new InvalidEmojiException(`Emoji not found ${name}`)
  }

  return (
    <span className={wrapperClassName}>
      <TooltipRoot
        open={isTooltipOpen}
        onOpenChange={(_, eventDetail) => {
          if (eventDetail.reason === "outside-press") {
            setClicked(false)
          }
          if (eventDetail.reason === "escape-key") {
            setClicked(false)
            setFocused(false)
            setHovering(false)
          }
        }}
      >
        <TooltipTrigger
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            setClicked(false)
          }}
          onClick={() => setClicked((prev) => !prev)}
          render={({ className = "", ...props }) => (
            <button
              {...props}
              type="button"
              aria-label={emojiInfo.alt}
              className={cn(
                "inline cursor-pointer appearance-none border-0 bg-transparent p-0 align-baseline",
                className
              )}
            >
              <img
                // the button owns the name; alt stays for the broken-image fallback (the emoji char)
                aria-hidden="true"
                className={cn("inline aspect-auto size-[1em]", providedClassName)}
                src={emojiInfo.url}
                alt={emojiInfo.char ?? emojiInfo.alt}
                data-type="emoji"
                draggable="false"
                height="72"
                width="72"
              />
            </button>
          )}
        />
        <TooltipContent
          side="top"
          className={cn(textVariants({ variant: "xs" }), "w-full px-2.5 py-2")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-surface-1">{emojiInfo.alt}</span>
        </TooltipContent>
      </TooltipRoot>
    </span>
  )
}

export default Emoji
