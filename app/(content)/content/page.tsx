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

      <div className="bounded-content-layout prose py-6">
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
          I quite like ice cream. I like it a lot. I like it so much that I decided to write a whole
          paragraph about it. Even though I could have written about anything else, I chose ice
          cream. I like it that much. This page's title is "Icecream Lorem Ipsum" after all. So
          here's a paragraph about ice cream. I hope you like it. Enjoy!
        </p>

        <ul>
          <li>
            Item 1
            <ul>
              <li>Sub-item 1</li>
              <li>Sub-item 2</li>
            </ul>
          </li>
          <li>
            Item 2
            <ul>
              <li>Sub-item 1</li>
              <li>
                Sub-item 2
                <ul>
                  <li>Sub-sub-item 1</li>
                  <li>Sub-sub-item 2</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>Item 3</li>
        </ul>

        <p>Some things I like that you may like:</p>
        <ul className="mb-40">
          <li>cooking</li>
          <li>linguistics</li>
          <li>puzzles &amp; fallacies</li>
          <li>(video | board | *)games</li>
          <li>interactivity</li>
          <li>unordered lists</li>
        </ul>

        {[0].map((i) => (
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
