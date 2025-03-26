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

function IntroSection() {
  return (
    <section className="flex flex-col items-center space-y-8 text-center md:items-end md:text-right">
      <Heading
        as="h1"
        variant="h1"
        className="relative flex flex-col rounded-lg bg-background-1 p-2 font-extrabold md:whitespace-nowrap"
      >
        <span role="presentation" className="noise" />

        <span
          className={
            // z-1 ensures content is above the noise background
            "relative z-1"
          }
        >
          <span>Hello there</span> <Emoji name=":wave:" className="animate-waving-hand" />
        </span>

        <Text
          as="span"
          variant="h2"
          className={
            // z-1 ensures content is above the noise background
            "relative z-1 font-extrabold"
          }
        >
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
        className="relative max-w-[435px] rounded-lg bg-background-1 p-2 font-medium text-balance hyphens-auto sm:hyphens-none"
      >
        <span role="presentation" className="noise" />

        <span
          className={
            // z-1 ensures content is above the noise background
            "relative z-1"
          }
        >
          Exploring the intersections of <span style={{ color: color2_bold }}>creativity</span> and{" "}
          <span style={{ color: color1_bold }}>technology</span>
        </span>
      </Heading>

      <Button asChild size="lg">
        <SmartLink variant="toc" href="/writings/" isMonochrome>
          Read my writings
        </SmartLink>
      </Button>
    </section>
  )
}

function MainContentText({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-lg bg-background-1 py-6 md:mx-8 md:px-6">
      <span role="presentation" className="noise" />
      <p
        className={
          // z-1 ensures content is above the noise background
          "relative z-1"
        }
      >
        {children}
      </p>
    </div>
  )
}
function MainContent() {
  return (
    <section
      className={cn(
        typographyVariants({ variant: "h4" }),
        "mx-auto max-w-[1400px] space-y-8 text-center font-normal hyphens-auto sm:hyphens-none"
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
            textShadow: `0 0 20px ${color3_base}, 0 0 30px ${color3_base}, 0 0 40px ${color3_base}, 0 0 50px ${color3_base}, 0 0 60px ${color3_base}, 0 0 70px ${color3_base}`,
          }}
        >
          0
        </span>{" "}
        hidden easter eggs. Can you find them all? Happy hunting!
      </MainContentText>

      <MainContentText>
        Meanwhile, feel free to check out my <SmartLink href="/writings/">writings</SmartLink>
        {" or "}
        <SmartLink href="/projects/">projects</SmartLink>. If you&apos;d like to get in touch, you
        can <SmartLink href="/connect/">connect with me</SmartLink>.
      </MainContentText>

      <MainContentText>Enjoy exploring!</MainContentText>
    </section>
  )
}

export default function Page() {
  return (
    <HeroLayout slug="/">
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
