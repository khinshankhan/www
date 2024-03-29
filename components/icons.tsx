import React, { type SVGProps } from "react"
import { cn } from "@/lib/utils"

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
  fgColor = "hsl(var(--logo-fg))",
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

export interface RawIconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

export function Moon({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  )
}

export function Sun({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  )
}

export function Hamburger({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  )
}

export function XMark({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export function ChevronDown({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

export function ArrowUp({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
  )
}

export function ArrowUpRight({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  )
}

export function ArrowDownTray({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  )
}

export function ClipboardDocument({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
      />
    </svg>
  )
}

export function ClipboardDocumentCheck({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
      />
    </svg>
  )
}

export function InformationCircle({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  )
}

export function XCircle({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export function ExclamationTriangle({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  )
}

export function CheckCircle({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

// FaTheaterMasks from react-icons
// seems react icon's paths are thin so the stroke width needs to be much thicker
export function TheaterMasks({ className = "", ...props }: RawIconProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 640 512"
      strokeWidth={15}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M206.86 245.15c-35.88 10.45-59.95 41.2-57.53 74.1 11.4-12.72 28.81-23.7 49.9-30.92l7.63-43.18zM95.81 295L64.08 115.49c-.29-1.62.28-2.62.24-2.65 57.76-32.06 123.12-49.01 189.01-49.01 1.61 0 3.23.17 4.85.19 13.95-13.47 31.73-22.83 51.59-26 18.89-3.02 38.05-4.55 57.18-5.32-9.99-13.95-24.48-24.23-41.77-27C301.27 1.89 277.24 0 253.32 0 176.66 0 101.02 19.42 33.2 57.06 9.03 70.48-3.92 98.48 1.05 126.58l31.73 179.51c14.23 80.52 136.33 142.08 204.45 142.08 3.59 0 6.75-.46 10.01-.8-13.52-17.08-28.94-40.48-39.5-67.58-47.61-12.98-106.06-51.62-111.93-84.79zm97.55-137.46c-.73-4.12-2.23-7.87-4.07-11.4-8.25 8.91-20.67 15.75-35.32 18.32-14.65 2.58-28.67.4-39.48-5.17-.52 3.94-.64 7.98.09 12.1 3.84 21.7 24.58 36.19 46.34 32.37 21.75-3.82 36.28-24.52 32.44-46.22zM606.8 120.9c-88.98-49.38-191.43-67.41-291.98-51.35-27.31 4.36-49.08 26.26-54.04 54.36l-31.73 179.51c-15.39 87.05 95.28 196.27 158.31 207.35 63.03 11.09 204.47-53.79 219.86-140.84l31.73-179.51c4.97-28.11-7.98-56.11-32.15-69.52zm-273.24 96.8c3.84-21.7 24.58-36.19 46.34-32.36 21.76 3.83 36.28 24.52 32.45 46.22-.73 4.12-2.23 7.87-4.07 11.4-8.25-8.91-20.67-15.75-35.32-18.32-14.65-2.58-28.67-.4-39.48 5.17-.53-3.95-.65-7.99.08-12.11zm70.47 198.76c-55.68-9.79-93.52-59.27-89.04-112.9 20.6 25.54 56.21 46.17 99.49 53.78 43.28 7.61 83.82.37 111.93-16.6-14.18 51.94-66.71 85.51-122.38 75.72zm130.3-151.34c-8.25-8.91-20.68-15.75-35.33-18.32-14.65-2.58-28.67-.4-39.48 5.17-.52-3.94-.64-7.98.09-12.1 3.84-21.7 24.58-36.19 46.34-32.37 21.75 3.83 36.28 24.52 32.45 46.22-.73 4.13-2.23 7.88-4.07 11.4z"
      ></path>
    </svg>
  )
}
