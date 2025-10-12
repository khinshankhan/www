import React from "react"

export type IconProps = React.HTMLAttributes<SVGElement>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IconComponent = (props: IconProps) => React.JSX.Element

// https://lucide.dev/icons/square-arrow-out-up-right
export function SquareArrowOutUpRight(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
      <path d="m21 3-9 9" />
      <path d="M15 3h6v6" />
    </svg>
  )
}
