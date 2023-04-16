import React from "react"
import { Button, H1, H2, Link, typographyVariants } from "@/components/ui"
import Emoji from "@/components/emoji"

export default function Page() {
  return (
    <div className="text-center">
      <H1 className="mt-20 flex flex-col lg:mt-16">
        <span>
          Hello there <Wave />
        </span>
        <span>
          I’m <span className="accent hyphens-auto">Khinshan</span>!
        </span>
      </H1>

      <H2 className="mt-10">I am a software engineer.</H2>

      <div className="page-container mt-10">
        <p
          className={typographyVariants({
            variant: "main-nav",
            className: "mx-auto md:max-w-[70%]",
          })}
        >
          I {`wasn't`} really sure what to put here, especially since I have an{" "}
          <Link href="/about" isInternal isFile={false}>
            about
          </Link>{" "}
          page which has the most of what I {`would've`} thrown here. So I put something which would
          interest me:
        </p>
      </div>

      <EggText />

      <p className={typographyVariants({ variant: "main-nav", className: "page-container mt-10" })}>
        Also, here are some nice projects you can check out:
      </p>
    </div>
  )
}

Page.isHero = true

// TODO: get back to this...
function EggText() {
  return (
    <p className={typographyVariants({ variant: "main-nav", className: "page-container" })}>
      this site currently has{" "}
      <Button className="p-0">
        <span className="text-theme-accent">0</span> easter eggs
      </Button>{" "}
      !
    </p>
  )
}

function Wave() {
  return <Emoji name=":waving_hand:" className="animate-wave" />
}
