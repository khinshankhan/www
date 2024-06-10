import React from "react"

export function Toc() {
  return (
    <div className="grow bg-content text-content-foreground">
      <h1>Table of Contents</h1>
      <ul className="list-none">
        <li>
          <a href="/toc">Table of Contents</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/content-layout">Content Layout</a>
        </li>
        <li>
          <a href="/page">Page</a>
        </li>
        <li>
          <a href="/layout">Layout</a>
        </li>
      </ul>
    </div>
  )
}

export default Toc
