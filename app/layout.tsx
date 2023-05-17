import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Khinshan Khan",
    template: "%s | Khinshan Khan",
  },
  description: "",
  openGraph: {
    title: "Khinshan Khan",
    description: "",
    url: "https://khinshankhan.com",
    siteName: "Khinshan Khan",
    locale: "en-US",
    type: "website",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
