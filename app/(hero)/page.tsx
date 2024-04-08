import Image from "next/image"
import { wordToMobileKey } from "@/lib/misc"
import { cn } from "@/lib/utils"
import { Emoji } from "@/components/emoji"
import { Link } from "@/components/primitives/link"
import { Spoiler } from "@/components/primitives/spoiler"
import { typographyVariants } from "@/components/primitives/typography"
import { EggText } from "./egg-text"

function Wave() {
  return <Emoji name=":wave:" className="animate-wave" />
}

export default function Home() {
  return (
    <section className="page-container mx-auto mt-8 flex flex-col items-center justify-center space-y-20 md:mt-20">
      <section className="flex flex-col items-center justify-center gap-4 md:flex-row-reverse">
        <Image
          alt="Profile Image"
          className="rounded-full md:ml-8"
          width={256}
          height={256}
          src="https://github.com/khinshankhan.png"
          style={{
            aspectRatio: "256/256",
            objectFit: "cover",
          }}
        />

        <section className="flex flex-col items-center space-y-8 text-center md:items-end md:text-right">
          <section>
            <h1
              className={cn(
                typographyVariants({ variant: "h1", className: "font-bold md:whitespace-nowrap" })
              )}
            >
              Hello there <Wave />
            </h1>
            <h2 className={cn(typographyVariants({ variant: "h2", className: "font-bold" }))}>
              {"I'm"} Khinshan Khan
            </h2>
          </section>
          <h3
            className={cn(
              typographyVariants({
                variant: "h3",
                className:
                  "mx-auto max-w-[700px] hyphens-auto text-balance font-normal sm:hyphens-none",
              })
            )}
          >
            Exploring the intersections of creativity and technology
          </h3>

          <Link
            href="/writings/"
            underline={false}
            className="w-full rounded-lg bg-secondary py-3 text-secondary-foreground shadow-lg transition-colors duration-300 ease-in-out hover:bg-secondary/90 md:w-auto md:px-8 md:text-lg"
          >
            Read my writings
          </Link>
        </section>
      </section>

      <section
        className={cn(
          typographyVariants({
            variant: "h4",
            className:
              "mx-auto max-w-[1400px] space-y-16 hyphens-auto text-center font-normal sm:hyphens-none",
          })
        )}
      >
        <p>
          Welcome to my corner of the internet, where I share my thoughts and musings. You may or
          may not learn something, but at least it'll be fun!
        </p>

        <p>
          Landing pages are always a bit awkward, too much whitespace to deal with so a bit of an
          engagement hook: this website currently has <EggText /> easter eggs. Can you find them
          all? One is just the <Spoiler>{wordToMobileKey("konami komando")}</Spoiler>. Happy
          hunting!
        </p>

        <p>
          In the meantime, you can check out my{" "}
          <Link href="/writings/" nav={true} underline={false}>
            writings
          </Link>{" "}
          or{" "}
          <Link href="/projects/" nav={true} underline={false}>
            projects
          </Link>
          . If you want to get in touch, you can{" "}
          <Link href="/connect/" nav={true} underline={false}>
            connect with me
          </Link>
          .
        </p>

        <p>Have fun and happy exploring!</p>
      </section>
    </section>
  )
}
