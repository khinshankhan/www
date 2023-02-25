import React from "react"
import { motion as m } from "framer-motion"

export default function Page() {
  return (
    <m.div
      className="page-container text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.25, ease: "easeInOut" }}
    >
      <h1>Hello there, I’m Khinshan!</h1>
    </m.div>
  )
}

Page.isHero = true
