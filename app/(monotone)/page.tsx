"use client"

import React, { type ReactNode } from "react"
import { Emoji } from "@/components/emoji"
import { Shell } from "@/components/layouts/elements/shell"
import { color1_bold, color2_bold, color3_base, color3_bold } from "@/lib/constants"
import { cn } from "@/quicksilver/lib/classname"
import { GridPattern } from "@/quicksilver/react/patterns/decorations/grid-pattern"
import { Button } from "@/quicksilver/react/primitives/button"
import { Link } from "@/quicksilver/react/primitives/link"
import { H1, H2, Paragraph, Text } from "@/quicksilver/react/primitives/text"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { info } from "@/settings"
import { ProfileImage } from "./profile-image"

function IntroSection() {
  return (
    <section className="flex flex-col items-center space-y-8 text-center md:items-end md:text-right">
      <H1 className="relative flex flex-col rounded-lg bg-background-1 p-2 font-extrabold md:whitespace-nowrap">
        <span>
          <span>Hello there</span> <Emoji name=":wave:" className="animate-waving-hand" />
        </span>

        <Text
          variant="h2"
          className="font-extrabold"
          render={(props) => {
            return (
              <span {...props}>
                <span>I&apos;m </span>

                {info.fullname.split(" ").map((part, i, arr) => {
                  const color = [color1_bold, color2_bold][i % 2]

                  return (
                    <span key={i} style={{ color: color }}>
                      {part} {i !== arr.length - 1 && <>&nbsp;</>}
                    </span>
                  )
                })}
              </span>
            )
          }}
        />
      </H1>

      <H2
        variant="h3"
        className="max-w-[435px] rounded-lg bg-background-1 p-2 font-medium text-balance hyphens-auto sm:hyphens-none"
      >
        Exploring the intersections of <span style={{ color: color2_bold }}>creativity</span> and{" "}
        <span style={{ color: color1_bold }}>technology</span>
      </H2>

      <Button
        size="lg"
        render={({ className, ...props }) => {
          return (
            <Link
              variant="toc"
              href="/writings/"
              isMonochrome
              className={cn("group relative", className)}
              {...props}
            >
              <span>Read my writings</span>
              <span
                className="absolute right-4 ml-3 opacity-0 transition-all duration-300 ease-in-out group-hover:right-2 group-hover:opacity-100"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          )
        }}
      />
    </section>
  )
}

function MainContentText({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-lg bg-background-1 py-6 md:mx-8 md:px-6">
      <Paragraph>{children}</Paragraph>
    </div>
  )
}
function MainContent() {
  return (
    <section
      className={cn(
        textVariants({ variant: "h4" }),
        "mx-auto max-w-[1200px] space-y-4 text-center font-normal hyphens-auto sm:hyphens-none"
      )}
    >
      <MainContentText>
        Welcome to my little corner of the internet! Here, I share my thoughts and musings. Whether
        you learn something new or just have a bit of fun, I hope you enjoy your stay.
      </MainContentText>

      <MainContentText>
        Landing pages can be a bit bland with all that whitespace, so here&apos;s a little
        engagement hook: this website has{" "}
        <span
          style={{
            color: color3_bold,
            textShadow: `0 0 10px ${color3_base}, 0 0 20px ${color3_base}, 0 0 30px ${color3_base}, 0 0 40px ${color3_base}, 0 0 50px ${color3_base}, 0 0 60px ${color3_base}`,
          }}
        >
          0
        </span>{" "}
        hidden easter eggs. Can you find them all? Happy hunting!
      </MainContentText>

      <MainContentText>
        Meanwhile, feel free to check out my <Link href="/writings/">writings</Link>
        {" or "}
        <Link href="/projects/">projects</Link>. If you&apos;d like to get in touch, you can{" "}
        <Link href="/connect/">connect with me</Link>.
      </MainContentText>

      <MainContentText>Enjoy exploring!</MainContentText>
    </section>
  )
}

export default function Page() {
  return (
    <Shell>
      <div className="relative pb-24">
        <section className="mx-auto mt-8 flex maxw-page flex-col items-center justify-center space-y-12 md:mt-20">
          <GridPattern
            pattern="both"
            size="sm"
            style={{
              maskImage: "radial-gradient(90% 70% at 50% 40%, black, transparent)",
              backgroundAttachment: "fixed",
            }}
          />
          <header className="z-1 flex flex-col items-center justify-center gap-4 md:flex-row-reverse">
            <ProfileImage />

            <IntroSection />
          </header>

          <MainContent />
        </section>
      </div>
    </Shell>
  )
}
