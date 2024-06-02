import React, { Fragment } from "react"

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <div className="content-container grow bg-content text-content-foreground">{children}</div>
    </Fragment>
  )
}
