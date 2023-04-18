import React from "react"
import { Button } from "@/components/ui"

export function SkipNav() {
  return (
    <div id="skip-nav" tabIndex={-1} className="-z-1 focus-within:z-skipLink fixed mt-6 w-full">
      <div className="page-container">
        <Button
          id="skip-to-content"
          variant="primary"
          onClick={(event) => {
            const c = document.getElementById("content")
            console.log({ c })
            if (c) {
              event.currentTarget.blur()
              c?.focus()
              c?.blur()
            }
          }}
        >
          Skip to content
        </Button>
      </div>
    </div>
  )
}

export default SkipNav
