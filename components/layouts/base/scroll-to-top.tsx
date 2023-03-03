import React, { useEffect, useState } from "react"
import { m, useScroll } from "framer-motion"

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
  }, [scrollYProgress])

  // TODO: add focus ring
  // TODO: switch to linear for reduced motion?
  // radial progress is based off https://www.framer.com/motion/use-scroll/
  return (
    <m.span
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 xl:bottom-7 xl:right-7"
      variants={ScrollToTopContainerVariants}
      initial="hide"
      animate={show ? "visible" : "hidden"}
      transition={{ type: "bounce" }}
    >
      <button
        aria-label="Scroll to top."
        className="p-0.25 rounded-full bg-transparent md:scale-125 xl:scale-150"
        onClick={scrollToTop}
      >
        <svg aria-hidden className="h-8 w-8">
          <m.circle
            className="h-8 w-8 translate-y-8 -rotate-90 fill-theme-bg/60 stroke-violet-8 stroke-2"
            cx="50%"
            cy="50%"
            r="15"
            pathLength="1"
            style={{ pathLength: scrollYProgress }}
          />
          <ArrowUp aria-hidden viewBox="-3 -3 30 30" />
        </svg>
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
