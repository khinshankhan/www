import React from "react"

export interface ILogoProps {
  width?: number | string
  height?: number | string

  bgColor?: string
  fgColor?: string
  borderColor?: string
}
export function Logo({
  width = 460,
  height = 460,
  bgColor = "var(--logo-bg)",
  fgColor = "var(--logo-fg)",
  borderColor = "var(--logo-border)",
}: ILogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 460 460"
      style={{ display: "block" }}
    >
      <rect className="bg" width="100%" height="100%" fill={bgColor} />
      <path
        className="fg"
        fill={fgColor}
        d="m157.8 150 2.2 2.1v65c0 63.7 0 65 1.9 63.9 1.1-.5 4-4.1 6.6-8 2.5-3.8 5-7.2 5.6-7.5.5-.4.9-23.1.9-57.1 0-55.1 0-56.4 2-58.4 2.8-2.8 8.4-2.7 10.4.2 1.4 2 1.6 8.1 1.6 47 0 24.7.3 44.8.8 44.8.4 0 3.4-3.9 6.7-8.6 12.8-18.3 15.4-22 16.7-23.4.7-.9 3.1-4.2 5.3-7.5 2.2-3.3 4.5-6.5 5-7.1.6-.6 4.8-6.6 9.5-13.4 4.7-6.7 10.8-15.3 13.5-19.1 2.8-3.8 6.2-8.7 7.7-10.9 2.4-3.4 3.3-4 6.5-4 4.6 0 7.3 2.4 7.3 6.4 0 3.1-.6 4.1-16 26.1-2.7 3.8-6.8 9.7-9.1 13-2.3 3.3-5.2 7.2-6.3 8.6-1.2 1.5-2.9 3.7-3.8 5-.9 1.3-7.5 10.7-14.6 20.9-15.4 21.9-21.5 30.5-26 36.6-3.1 4.3-3.3 4.9-3 12.4l.3 7.9 6.4-9.2c3.6-5.1 7.1-9.9 7.8-10.7.7-.8 3.2-4.3 5.5-7.7 2.4-3.4 8.4-11.9 13.3-18.8 12.5-17.5 17.4-24.3 22-30.9 2.2-3.2 6.8-9.6 10.2-14.2 3.5-4.7 8.1-11 10.3-14.2 2.1-3.1 5.4-7.7 7.1-10.2 1.8-2.5 5.2-7.4 7.7-11 5.3-7.7 7.8-9.9 11.3-10 3.4 0 6.9 3.4 6.9 6.8 0 2.3-3.7 9.3-5.9 11.2-.3.3-2.4 3.2-4.6 6.4-2.2 3.3-4.4 6.4-5 7-.6.6-2.8 3.8-5 7.1s-4.4 6.5-5 7.1c-.5.7-1.8 2.2-2.7 3.5-14.2 19.9-17.8 25-17.8 25.5 0 .8 5.8 8.3 8.1 10.6 1 1 3.2 3.9 5 6.4 1.8 2.6 3.9 5.5 4.8 6.5.9 1 3.5 4.4 5.9 7.6 2.3 3.2 7.5 10.1 11.5 15.3 25.8 33.8 26.7 35 26.7 38.2 0 4.4-2.5 6.8-7 6.8-3.5 0-4.1-.5-11.8-10.8-4.5-5.9-9.4-12.2-10.9-14.1-1.6-1.9-3.5-4.4-4.3-5.7-2.3-3.4-13.2-17.8-14-18.4-.3-.3-1.7-2.1-3-4s-3.1-4.3-3.9-5.2c-2.1-2.2-2.9-3.2-7.6-9.8-2.2-3-4.3-6-4.8-6.5-.4-.6-1.5-1.9-2.3-3-1-1.3-1.7-1.6-2-.8-.3.6-2.1 3.2-4 5.7l-3.4 4.5 8.3 10.3c4.5 5.7 10.2 12.9 12.7 16.2 2.5 3.2 6.3 8.2 8.5 11 14.5 18.9 16.5 21.9 16.5 24.7 0 4.3-3.4 7.3-7.6 6.6-3.5-.6-4.8-1.9-11.6-10.7-10.2-13.4-17-22.3-22.2-29-3.2-4.1-7.4-9.7-9.3-12.3-2-2.6-3.8-4.6-4-4.3-.5.4-13.8 19-16.3 22.6-4.6 6.7-15.4 21.7-19.3 26.8-4.3 5.5-5.2 6.2-8.3 6.2-6.1 0-7.4-2.4-7.4-14.1 0-8.9-.2-10-1.5-8.9-.8.7-1.5 1.7-1.5 2.2 0 1.9-14.4 19.9-17.1 21.3-3.7 2-4.5 1.9-6.9-.7-2-2.2-2-3.1-2-82.2 0-73 .1-80.1 1.7-81.8 2.2-2.4 7.4-2.3 10.1.2z"
      />
      <path
        className="border"
        fill="none"
        stroke={borderColor}
        strokeWidth={20}
        d="M10 10h440v440H10z"
      />
    </svg>
  )
}

export function Moon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  )
}

export function Sun() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  )
}

export function Hamburger() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  )
}

export function XMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export function ListBullet() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  )
}
