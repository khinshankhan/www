import type { Metadata } from "next"
import { emojiLookup } from "@/lib/emoji"

export const navLinks = [
  { label: "About", href: "/about/" },
  { label: "Writings", href: "/writings/" },
  { label: "Projects", href: "/projects/" },
  { label: "Connect", href: "/connect/" },
]

export const info = {
  fullname: "Khinshan Khan",
  startYear: 2017,
  avatarUrl: "https://github.com/khinshankhan.png",
}

const faviconSrc =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test"
    ? "/favicon.ico?v=1"
    : emojiLookup.get(":dancer:")?.url

export const defaultMetadata = {
  viewport: {
    viewportFit: "cover",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  metadataBase: new URL("https://khinshankhan.com"),
  title: {
    default: "Khinshan Khan",
    template: "%s | Khinshan Khan",
  },
  description:
    "Hello! Welcome to my digital garden, where I share my thoughts and musings. You may or may not learn something, but at least it'll be fun!",
  icons: {
    shortcut: faviconSrc,
  },
  openGraph: {
    title: "Khinshan Khan",
    description:
      "Hello! Welcome to my digital garden, where I share my thoughts and musings. You may or may not learn something, but at least it'll be fun!",
    url: "https://www.khinshankhan.com",
    siteName: "Khinshan Khan",
    // TODO: look into how to best support multiple languages
    locale: "en-US",
    type: "website",
    images: [
      {
        url: "https://www.khinshankhan.com/og.png?v=8",
        width: 1125,
        height: 590,
      },
    ],
  },
  twitter: {
    title: "Khinshan Khan",
    card: "summary_large_image",
  },
} satisfies Metadata
