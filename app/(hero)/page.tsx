import React from "react"
import { Link, typographyVariants } from "@/components/ui"
import Emoji from "@/components/emoji"
import MigrationNotice from "@/components/migration-notice"
import EggText from "./egg-text"

export default function Home() {
  return (
    <main id="content" className="text-center">
      <h1
        className={typographyVariants({ variant: "h1", className: "mt-20 flex flex-col lg:mt-16" })}
      >
        <span>
          Hello there <Emoji name=":wave:" className="animate-wave" />
        </span>
        <span>
          I’m <span className="text-theme-accent">Khinshan</span>!
        </span>
      </h1>

      <h2 className={typographyVariants({ variant: "h2", className: "mt-10" })}>I am a writer.</h2>

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

      <MigrationNotice className="mt-10" />
    </main>
  )
}
