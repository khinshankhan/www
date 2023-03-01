import React, { useEffect, useState } from "react"
import { m, useAnimationControls, useScroll } from "framer-motion"

import { isBrowser, useMounted } from "hooks"

import { ArrowUp } from "components/icons"

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// based off https://upmostly.com/next-js/how-to-create-a-scroll-to-top-button-in-next-js
const ScrollToTopContainerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
}

function ScrollToTopButton() {
  const { scrollYProgress } = useScroll()
  const [show, setShow] = useState(false)

  useEffect(() => {
    return scrollYProgress.on("change", (latestValue) => {
      setShow(latestValue > 0.05)
    })
  }, [])

  // TODO: add focus ring
  // TODO: switch to linear for reduced motion?
  return (
    <m.span
      className="fixed bottom-5 right-5"
      variants={ScrollToTopContainerVariants}
      initial="hide"
      animate={show ? "visible" : "hidden"}
      transition={{ type: "bounce" }}
    >
      <button
        aria-label="Scroll to top."
        className="rounded-full border-2 border-theme-placeholder bg-theme-bg/60 p-2 md:p-2.5 xl:p-3"
        onClick={scrollToTop}
      >
        <ArrowUp />
      </button>
    </m.span>
  )
}

export function ScrollToTop() {
  const mounted = useMounted()

  if (!mounted || !isBrowser) return null
  return <ScrollToTopButton />
}

export default ScrollToTop
