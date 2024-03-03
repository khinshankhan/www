import Image from "next/image"
import { Link } from "@/components/primitives/link"
import { EggText } from "./egg-text"

function Wave() {
  return (
    <Image
      alt=":wave:"
      width={16}
      height={16}
      src="https://github.githubassets.com/images/icons/emoji/unicode/1f44b.png?v8"
      className="animate-wave inline aspect-auto size-[1em]"
    />
  )
}

export default function Home() {
  return (
    <section className="page-container mx-auto my-8 flex flex-col items-center justify-center space-y-20">
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

        <section className="flex flex-col items-center space-y-6 text-center md:items-end md:text-right">
          <section>
            <h1 className="font-heading text-5xl font-bold md:whitespace-nowrap md:text-7xl">
              Hello there <Wave />
            </h1>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">{"I'm"} Khinshan Khan</h2>
          </section>
          <h3 className="mx-auto max-w-[700px] hyphens-auto text-balance text-3xl sm:hyphens-none">
            Welcome to my corner of the internet to explore the intersections of creativity and
            technology
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

      <section className="mx-auto max-w-[1400px] hyphens-auto text-balance text-center text-3xl sm:hyphens-none">
        <p>
          I {"wasn't"} really sure what to put here, especially since I have an{" "}
          <Link href="/about/" nav={true} underline={false}>
            about
          </Link>{" "}
          page which has the most of what I {"would've"} thrown here. So I put something which would
          interest me:
        </p>
        <p>
          This website currently has <EggText /> easter eggs. Can you find them all?
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] hyphens-auto text-balance text-center text-3xl sm:hyphens-none">
        In the meantime, you can check out my{" "}
        <Link href="/writings/" nav={true} underline={false}>
          writings
        </Link>{" "}
        or{" "}
        <Link href="/projects/" nav={true} underline={false}>
          projects
        </Link>
        . I put in a fair amount of effort into them. If you want to get in touch, you can{" "}
        <Link href="/connect/" nav={true} underline={false}>
          connect with me
        </Link>
        . Hopefully you find something interesting here. Have fun and happy exploring!
      </section>
    </section>
  )
}
