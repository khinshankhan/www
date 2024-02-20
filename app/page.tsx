import { Lorem } from "@/components/lorem"
import { typographyVariants } from "@/components/primitives/typography"

export default function Home() {
  return (
    <main className="normalize">
      <h1 className={typographyVariants({ variant: "h1" })}>Hello there!</h1>
      <Lorem />
    </main>
  )
}
