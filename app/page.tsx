import React from "react"
import { Heading, Strong, Text } from "@/components/base/typography"

export default async function Page() {
  return (
    <article>
      <header className="py-14 text-center">
        <Heading as="h1" variant="h1" className="text-balance">
          States Work to Make Digital Services Accessible for All
        </Heading>

        <Text as="h2" variant="nav" className="text-balance pt-6 text-muted-foreground">
          A Look at State Efforts vs Reality
        </Text>
      </header>

      <section className="">
        <p>
          The goal of typography is to relate font size, line height, and line width in a{" "}
          <Strong>proportional</Strong> way that maximizes beauty and makes reading easier and more
          pleasant.
        </p>
      </section>
    </article>
  )
}
