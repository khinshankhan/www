import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  cn(
    "ghost-button text-logo-fg inline-block border-0 bg-transparent",
    /* animation is based off https://codepen.io/finnhvman/pen/jLXKJw */
    "transition-background active:bg-ghostBg active:bg-full hover:ripple-bg bg-center duration-1000 active:duration-0"
  ),
  {
    variants: {
      variant: {
        ghost: "",
        primary:
          "bg-violet-9 hover:bg-violet-11 focus:bg-violet-11 dark:bg-violet-8 dark:text-theme-placeholder dark:hover:bg-violet-10 dark:focus:bg-violet-10 text-white",
      },
      isIcon: {
        true: "p-1.5 leading-[0]",
        false: "p-2.5",
      },
      isRound: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "ghost",
      isIcon: false,
      isRound: false,
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "ghost", isIcon = false, isRound = false, className, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, isIcon, isRound, className }))}
      ref={ref}
      {...props}
    />
  )
)
Button.displayName = "Button"

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "ghost", isIcon = true, isRound = true, className, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, isIcon, isRound, className }))}
      ref={ref}
      {...props}
    />
  )
)
IconButton.displayName = "IconButton"

interface IconProps {
  className?: string
  children: ReactNode
}

export function Icon({ className = "", children }: IconProps) {
  return <span className={cn("inline-block border-0 leading-[0]", className)}>{children}</span>
}
