"use client"

import React from "react"
import { Button, typographyVariants } from "@/components/ui"

// TODO: get back to this...
export default function EggText() {
  return (
    <p className={typographyVariants({ variant: "main-nav", className: "page-container" })}>
      this site currently has{" "}
      <Button className="p-0">
        <span className="text-theme-accent">0</span> easter eggs
      </Button>{" "}
      !
    </p>
  )
}
