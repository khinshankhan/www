import React, { Fragment } from "react"

export default function WritingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <div className="content-container grow bg-content text-content-foreground">{children}</div>
    </Fragment>
  )
}
