import React from "react"
import { Em, Heading, Strong, Text } from "@/components/base/typography"
import { SmartLink } from "@/components/composite/smart-link"

export default async function Page() {
  return (
    <article>
      <header className="bg-background-1 py-14 text-center">
        <div className="bounded-page-layout">
          <Heading as="h1" variant="h1" className="text-balance">
            Icecream Lorem Ipsum
          </Heading>

          <Text as="p" variant="nav" className="text-balance pt-6 text-muted-foreground">
            ...with a cherry on top!
          </Text>
        </div>
      </header>

      <div className="bounded-content-layout py-6">
        <p>
          Hello there. <SmartLink href="/">This</SmartLink> is where experiments sprout and blossom.
          Some even become features! Or they may become bugs that then become features. Or they...
          well yea, <SmartLink href="/hello.pdf">stuff happens</SmartLink>.
        </p>

        <p>
          The goal of{" "}
          <SmartLink href="https://en.wikipedia.org/wiki/Typography">typography</SmartLink> is to
          relate font size, line height, and line width in a proportional way that maximizes beauty
          and makes reading easier and more pleasant.
        </p>

        <p>
          The <Strong>Golden Ratio</Strong> is a <Em>mathematical ratio</Em> that is commonly found
          in{" "}
          <Strong>
            <Em>nature</Em>
          </Strong>
          . It can be used to create pleasing, natural-looking compositions in your design work.
        </p>

        <Heading as="h2" variant="h2">
          The Randomness of Lorem
        </Heading>
        <p>
          Cherry bananas rainbow sprinkles, hot fudge cookie dough blueberries strawberries french
          vanilla oreos. Strawberry strawberries blueberries pistachio chocolate Pistachio mint
          chocolate chip rocky road peanut butter strawberries coffee vanilla chocolate chip cookie
          dough almonds. Neopolitan chocolate chip caramel syrup, french vanilla gummy worms bananas
          oreos oreos. Strawberry salted caramel syrup chocolate cake batter whipped cream cherry
          rocky road gummy worms Strawberry chocolate sprinkles blueberries dark chocolate cake
          batter. Cookies and cream mint chocolate chip cookies and cream vanilla kitkat peanuts,
          mint cake batter. Caramel syrup peanuts mint chocolate chip peanuts.
        </p>

        {[].map((i) => (
          <p key={i}>
            Cherry bananas rainbow sprinkles, hot fudge cookie dough blueberries strawberries french
            Chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie dough
            chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie dough
            chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie dough
            chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie dough
            chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie dough
            chocolate chip cookie dough chocolate chip cookie dough chocolate chip cookie dough
            vanilla oreos. Strawberry strawberries blueberries pistachio chocolate Pistachio mint
          </p>
        ))}
      </div>
    </article>
  )
}
