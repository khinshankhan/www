import Image from "next/image"
import { info } from "@/settings"
import { cn } from "@/lib/utils"
import { Emoji } from "@/components/emoji"
import { Link } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"

export default function Home() {
  return (
    <section className="page-container mx-auto mt-8 flex flex-col items-center justify-center space-y-20 md:mt-20">
      <header className="flex flex-col items-center justify-center gap-4 md:flex-row-reverse">
        <ProfileImage />

        <IntroSection />
      </header>

      <MainContent />
    </section>
  )
}

function ProfileImage() {
  return (
    <div
      className="md:ml-8"
      style={{
        minWidth: "256px",
        minHeight: "256px",
      }}
    >
      <Image
        alt="Profile Image"
        width={256}
        height={256}
        src={info.avatarUrl}
        className="select-none rounded-full transition-[border-radius] duration-500"
        draggable="false"
        style={{
          aspectRatio: "256/256",
          objectFit: "cover",
        }}
      />
    </div>
  )
}

function Wave() {
  return <Emoji name=":wave:" className="animate-wave" />
}

function IntroSection() {
  return (
    <section className="flex flex-col items-center space-y-8 text-center md:items-end md:text-right">
      <div>
        <h1
          className={cn(
            typographyVariants({ variant: "h1", className: "font-extrabold md:whitespace-nowrap" })
          )}
        >
          Hello there <Wave />
        </h1>
        <h2 className={cn(typographyVariants({ variant: "h2", className: "font-extrabold" }))}>
          {"I'm"} <span className="text-link-border-active">{info.fullname}</span>
        </h2>
      </div>
      <h3
        className={cn(
          typographyVariants({ variant: "h3" }),
          "mx-auto max-w-[700px] hyphens-auto text-balance font-normal sm:hyphens-none"
        )}
      >
        Exploring the intersections of creativity and technology
      </h3>

      <Link
        variant="toc"
        href="/writings/"
        className="w-full rounded-lg bg-secondary py-3 text-secondary-foreground shadow-lg transition-colors duration-300 ease-in-out hover:bg-secondary/90 md:w-auto md:px-8 md:text-lg"
      >
        Read my writings
      </Link>
    </section>
  )
}

function MainContent() {
  return (
    <section
      className={cn(
        typographyVariants({ variant: "h4" }),
        "md[&>*]:px-6 mx-auto max-w-[1400px] space-y-8 hyphens-auto text-center font-normal sm:hyphens-none [&>*]:rounded-lg [&>*]:bg-background/10 [&>*]:py-6 [&>*]:backdrop-blur-[3px] md:[&>*]:mx-8"
      )}
    >
      <p>
        Welcome to my little corner of the internet! Here, I share my thoughts and musings. Whether
        you learn something new or just have a bit of fun, I hope you enjoy your stay.
      </p>

      <p>
        Landing pages can be a bit bland with all that whitespace, so here’s a little engagement
        hook: this website has 0 hidden easter eggs. Can you find them all? Happy hunting!
      </p>

      <p>
        Meanwhile, feel free to check out my <Link href="/writings/">writings</Link> or{" "}
        <Link href="/projects/">projects</Link>. If you’d like to get in touch, you can{" "}
        <Link href="/connect/">connect with me</Link>.
      </p>

      <p>Enjoy exploring!</p>
    </section>
  )
}
