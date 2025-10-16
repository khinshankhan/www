"use client"

import React from "react"
import { ListTree } from "@/components/design-system/primitives/icon"
import { H2 } from "@/components/design-system/primitives/text"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
  className?: string
}

// TODO: implement this
export function TableOfContents({ className = "" }: TableOfContentsProps) {
  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "bg-background-2 xl:bg-background-2/70 sticky top-0 w-full rounded-lg rounded-t-none px-2 py-3 backdrop-blur xl:-mt-3",
        className
      )}
    >
      <H2
        variant="h5"
        className="text-foreground mb-4 mt-0 flex flex-row items-center justify-start gap-2"
      >
        <span>
          <ListTree />
        </span>
        On this page
      </H2>

      <ul
        className="border-background-1 flex flex-col gap-2"
        style={{
          borderLeftWidth: "1.5px",
        }}
      >
        <li className="bg-background-1/70 w-full py-1 pl-4">
          <a className="hover:underline" href="#introduction">
            Introduction
          </a>
        </li>
        {[...Array(3).keys()].map((num) => (
          <li key={num}>
            <a className="pl-4 hover:underline" href={`#section-${num}`}>
              {`Section ${num}`}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
