import React, { forwardRef, type HTMLProps } from "react"

import { cx } from "lib/utils"

type ButtonProps = HTMLProps<HTMLButtonElement>
interface IconButtonProps extends ButtonProps {
  type?: "button" | "submit" | "reset"
  isRound?: boolean
  className?: string
}
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  props,
  ref
) {
  const { className = "", isRound = true, children, type: buttonType, ...rest } = props
  return (
    <button
      className={cx(
        "inline-block border-0 bg-transparent p-2.5 leading-[0] text-logo-fg",
        isRound ? "rounded-full" : "rounded-md",
        className
      )}
      type={buttonType ?? "button"}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  )
})