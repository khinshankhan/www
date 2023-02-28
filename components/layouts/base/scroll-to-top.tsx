import React from "react"
import { m } from "framer-motion"

import { isBrowser, useMounted } from "hooks"

import { Icon } from "components/ui"
import { ArrowUp } from "components/icons"

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export function ScrollToTop() {
  const mounted = useMounted()

  if (!mounted || !isBrowser) return null

  return (
    <span className="fixed bottom-5 right-5 rounded-full">
      <m.button
        className="rounded-full border-2 border-theme-placeholder bg-transparent p-2 md:p-2.5 xl:p-3"
        onClick={scrollToTop}
      >
        <ArrowUp />
      </m.button>
    </span>
  )
}

export default ScrollToTop
/*
    <span className="fixed bottom-5 right-5 rounded-full">
      <m.button className="rounded-full p-2 md:p-2.5 xl:p-3" onClick={scrollToTop}>
        <ArrowUp />
      </m.button>
</span>
*/

/*
 scroll-to-top.tsx     4  21 lsp-flycheck-info-unnecessary 6133   'useMounted' is declared but its value is never read. (lsp)
 scroll-to-top.tsx     6   1 lsp-flycheck-info-unnecessary 6133   'Icon' is declared but its value is never read. (lsp)
 scroll-to-top.tsx    21  20 error    2322   Type '{ "--value": string; "--size": string; "--thickness": string; }' is not assignable to type 'Properties<string | number, string & {}>'.
   Object literal may only specify known properties, and '"--value"' does not exist in type 'Properties<string | number, string & {}>'. (lsp)

 */
