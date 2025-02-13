import { Button } from "@/components/base/button"
import { Image } from "@/components/base/image"
import { Heading, Text, typographyVariants } from "@/components/base/typography"
import { Emoji } from "@/components/composite/emoji"
import { SmartLink } from "@/components/composite/smart-link"
import { HeroLayout } from "@/components/template/hero-layout"
import { color1_bold, color2_bold, color3_base, color3_bold } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { info } from "@/settings"

function ProfileImage() {
  return (
    <div
      className="exclude-stars md:ml-8"
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
      <Heading
        as="h1"
        variant="h1"
        className="exclude-stars flex flex-col rounded-lg bg-background-1 p-2 font-extrabold md:whitespace-nowrap"
      >
        <span>
          <span>Hello there</span> <Emoji name=":wave:" className="animate-waving-hand" />
        </span>

        <Text as="span" variant="h2" className="font-extrabold">
          <span>I&apos;m </span>

          {info.fullname.split(" ").map((part, i, arr) => {
            const color = [color1_bold, color2_bold][i % 2]

            return (
              <span key={i} style={{ color: color }}>
                {part} {i !== arr.length - 1 && <>&nbsp;</>}
              </span>
            )
          })}
        </Text>
      </Heading>

      <Heading
        as="h2"
        variant="h3"
        className="exclude-stars max-w-[435px] rounded-lg bg-background-1 p-2 font-medium text-balance hyphens-auto sm:hyphens-none"
      >
        Exploring the intersections of <span style={{ color: color2_bold }}>creativity</span> and{" "}
        <span style={{ color: color1_bold }}>technology</span>
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
  const pClasses = cn("exclude-stars rounded-lg bg-background-1 py-6 md:mx-8 md:px-6")

  return (
    <section
      className={cn(
        typographyVariants({ variant: "h4" }),
        "mx-auto max-w-[1400px] space-y-8 text-center font-normal hyphens-auto sm:hyphens-none"
      )}
    >
      <p className={pClasses}>
        Welcome to my little corner of the internet! Here, I share my thoughts and musings. Whether
        you learn something new or just have a bit of fun, I hope you enjoy your stay.
      </p>

      <p className={pClasses}>
        Landing pages can be a bit bland with all that whitespace, so here&apos;s a little
        engagement hook: this website has{" "}
        <span
          style={{
            color: color3_bold,
            textShadow: `0 0 20px ${color3_base}, 0 0 30px ${color3_base}, 0 0 40px ${color3_base}, 0 0 50px ${color3_base}, 0 0 60px ${color3_base}, 0 0 70px ${color3_base}`,
          }}
        >
          0
        </span>{" "}
        hidden easter eggs. Can you find them all? Happy hunting!
      </p>

      <p className={pClasses}>
        Meanwhile, feel free to check out my <SmartLink href="/writings/">writings</SmartLink>
        {" or "}
        <SmartLink href="/projects/">projects</SmartLink>. If you&apos;d like to get in touch, you
        can <SmartLink href="/connect/">connect with me</SmartLink>.
      </p>

      <p className={pClasses}>Enjoy exploring!</p>
    </section>
  )
}

export default function Page() {
  return (
    <HeroLayout>
      <section className="bounded-page-layout mx-auto mt-8 flex flex-col items-center justify-center space-y-20 md:mt-20">
        <header className="flex flex-col items-center justify-center gap-4 md:flex-row-reverse">
          <ProfileImage />

          <IntroSection />
        </header>

        <MainContent />
      </section>
    </HeroLayout>
  )
}
