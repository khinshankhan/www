import React from "react"
import { Heading, Strong, Text } from "@/components/base/typography"

export default async function Page() {
  return (
    <article>
      <header className="page-container bg-background-1 py-14 text-center">
        <Heading as="h1" variant="h1" className="text-balance">
          Icecream Lorem Ipsum
        </Heading>

        <Text as="h2" variant="nav" className="text-balance pt-6 text-muted-foreground">
          ...with a cherry on top!
        </Text>
      </header>

      <main className="py-6">
        <section className="content-container my-4">
          <p>
            The goal of typography is to relate font size, line height, and line width in a
            proportional way that maximizes beauty and makes reading easier and more pleasant.
          </p>

          <div className="w-full space-y-4 bg-accent-4 py-4">
            <p>I wanna be full width</p>

            <p>I wanna be full width 2</p>
          </div>

          <p>
            The <Strong>Golden Ratio</Strong> is a mathematical ratio that's commonly found in
            nature. It can be used to create pleasing, natural-looking compositions in your design
            work.
          </p>

          <p>
            Cherry bananas rainbow sprinkles, hot fudge cookie dough blueberries strawberries french
            vanilla oreos. Strawberry strawberries blueberries pistachio chocolate Pistachio mint
            chocolate chip rocky road peanut butter strawberries coffee vanilla chocolate chip
            cookie dough almonds. Neopolitan chocolate chip caramel syrup, french vanilla gummy
            worms bananas oreos oreos. Strawberry salted caramel syrup chocolate cake batter whipped
            cream cherry rocky road gummy worms Strawberry chocolate sprinkles blueberries dark
            chocolate cake batter. Cookies and cream mint chocolate chip cookies and cream vanilla
            kitkat peanuts, mint cake batter. Caramel syrup peanuts mint chocolate chip peanuts.
          </p>

          {[].map((i) => (
            <p key={i}>
              Cherry bananas rainbow sprinkles, hot fudge cookie dough blueberries strawberries
              french Chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie
              dough chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie
              dough chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie
              dough chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie
              dough chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie
              dough chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie
              dough vanilla oreos. Strawberry strawberries blueberries pistachio chocolate Pistachio
              mint
            </p>
          ))}
        </section>
      </main>
    </article>
  )
}
