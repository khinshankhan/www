import React, { forwardRef, type HTMLProps } from "react"

import { cx } from "lib/utils"

type DefaultButtonProps = HTMLProps<HTMLButtonElement>
interface ButtonProps extends DefaultButtonProps {
  type?: "button" | "submit" | "reset"
  className?: string
  variant?: "ghost" | "primary"
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const {
    className = "",
    children,
    variant = "ghost",
    type: buttonType = "button",
    ...rest
  } = props
  return (
    <button
      className={cx(
        "ghost-button inline-block rounded-md border-0 bg-transparent p-2.5 text-logo-fg",
        variant === "primary" &&
          "bg-violet-9 text-white hover:bg-violet-11 focus:bg-violet-11 dark:bg-violet-8 dark:text-theme-placeholder dark:hover:bg-violet-10 dark:focus:bg-violet-10",
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
