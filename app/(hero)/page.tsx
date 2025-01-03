import { Button } from "@/components/base/button"
import { Image } from "@/components/base/image"
import { Heading, Text, typographyVariants } from "@/components/base/typography"
import { Emoji } from "@/components/composite/emoji"
import { SmartLink } from "@/components/composite/smart-link"
import { cn } from "@/lib/utils"
import { info } from "@/settings"

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
        width="256"
        height="256"
        src={info.avatarUrl}
        className="rounded-full transition-[border-radius] duration-500 select-none"
        style={{
          aspectRatio: "256/256",
          objectFit: "cover",
        }}
        draggable="false"
        disableZoom
      />
    </div>
  )
}

// TODO: add back animated wave emoji
function IntroSection() {
  return (
    <section className="flex flex-col items-center space-y-8 text-center md:items-end md:text-right">
      <Heading as="h1" variant="h1" className="flex flex-col font-extrabold md:whitespace-nowrap">
        <span>
          <span>Hello there</span> <Emoji name=":wave:" className="animate-waving-hand" />
        </span>

        <Text as="span" variant="h2" className="font-extrabold">
          <span>I&apos;m</span> <span className="text-accent-11">{info.fullname}</span>
        </Text>
      </Heading>

      <Heading
        as="h2"
        variant="h3"
        className="mx-auto max-w-[700px] font-medium text-balance hyphens-auto sm:hyphens-none"
      >
        Exploring the intersections of creativity and technology
      </Heading>

      <Button asChild size="lg">
        <SmartLink variant="toc" href="/writings/" isMonochrome>
          Read my writings
        </SmartLink>
      </Button>
    </section>
  )
}

function MainContent() {
  return (
    <section
      className={cn(
        typographyVariants({ variant: "h4" }),
        "md[&>*]:px-6 *:bg-background/10 mx-auto max-w-[1400px] space-y-8 text-center font-normal hyphens-auto *:rounded-lg *:py-6 *:backdrop-blur-[3px] sm:hyphens-none md:*:mx-8"
      )}
    >
      <p>
        Welcome to my little corner of the internet! Here, I share my thoughts and musings. Whether
        you learn something new or just have a bit of fun, I hope you enjoy your stay.
      </p>

      <p>
        Landing pages can be a bit bland with all that whitespace, so here&apos;s a little
        engagement hook: this website has 0 hidden easter eggs. Can you find them all? Happy
        hunting!
      </p>

      <p>
        Meanwhile, feel free to check out my <SmartLink href="/writings/">writings</SmartLink>
        {" or "}
        <SmartLink href="/projects/">projects</SmartLink>. If you&apos;d like to get in touch, you
        can <SmartLink href="/connect/">connect with me</SmartLink>.
      </p>

      <p>Enjoy exploring!</p>
    </section>
  )
}

export default function Page() {
  return (
    <section className="bounded-page-layout mx-auto mt-8 flex flex-col items-center justify-center space-y-20 md:mt-20">
      <header className="flex flex-col items-center justify-center gap-4 md:flex-row-reverse">
        <ProfileImage />

        <IntroSection />
      </header>

      <MainContent />
    </section>
  )
}
