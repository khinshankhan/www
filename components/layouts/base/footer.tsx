import React from "react"

import { info } from "config"
import { cx } from "lib/utils"

export function Footer({ isHero }: { isHero?: boolean }) {
  return (
    <>
      {isHero && (
        <div role="presentation" className="page-container h-0.5 w-[70%] bg-theme-placeholder" />
      )}
      <footer className={cx("page-container bg-theme-bg pt-8 pb-10", isHero && "mt-5")}>
        <p className="text-center">
          &copy; {info.startYear}+, {info.fullname}. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default Footer
