import React from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const typographyVariants = cva("", {
  variants: {
    variant: {
      nav: "font-body text-lg font-medium tracking-wide md:text-xl lg:text-2xl",
      h1: "font-heading text-3xl font-semibold tracking-wider md:text-4xl lg:text-5xl",
      h2: "font-heading text-2xl font-semibold tracking-wide md:text-3xl lg:text-4xl",
      h3: "font-heading text-xl font-semibold tracking-wide md:text-2xl lg:text-3xl",
      h4: "font-heading text-lg font-semibold tracking-wide md:text-xl lg:text-2xl",
      h5: "font-heading text-base font-semibold tracking-wide md:text-lg lg:text-xl",
      h6: "font-heading text-sm font-semibold tracking-wide md:text-base lg:text-lg",
      p: "text-pretty font-body text-lg tracking-wider antialiased md:text-xl lg:text-2xl",
      small: "font-body text-sm md:text-base lg:text-xl",
      xs: "font-body text-xs md:text-sm lg:text-base",
    },
  },
  defaultVariants: {
    variant: "p",
  },
})

function Sample({ className, title = "Default" }: { className: string; title?: string }) {
  return (
    <div className={className}>
      <div className={(className === "foobar" ? "animated-background" : "bg-accent-6/60") + " p-4"}>
        <p className="font-bold">{`Alert! ${title} Theme`}</p>
        <p className="">
          <span>This is a placeholder alert message.</span> Please update the text accordingly. And
          this is a{" "}
          <a href="https://google.com" className="text-accent-link">
            lorem ipsum
          </a>{" "}
          link .
        </p>
      </div>
    </div>
  )
}

export default async function Page() {
  return (
    <article>
      <h1 className={cn(typographyVariants({ variant: "h1" }))}>Heading 1</h1>
      <h2 className={cn(typographyVariants({ variant: "h2" }))}>Heading 2</h2>
      <h3 className={cn(typographyVariants({ variant: "h3" }))}>Heading 3</h3>
      <h4 className={cn(typographyVariants({ variant: "h4" }))}>Heading 4</h4>
      <h5 className={cn(typographyVariants({ variant: "h5" }))}>Heading 5</h5>
      <h6 className={cn(typographyVariants({ variant: "h6" }))}>Heading 6</h6>
      <p className={cn(typographyVariants({ variant: "p", className: "mb-8" }))}>Paragraph</p>

      <Sample className="info-theme" title="Info" />
      <br />
      <Sample className="success-theme" title="Success" />
      <br />
      <Sample className="critical-theme" title="Critical" />
      <br />
      <Sample className="warning-theme" title="Foobar" />
      <br />
      <Sample className="danger-theme" title="Danger" />
      <br />
      <Sample className="foobar" title="Animated" />
      <br />
    </article>
  )
}
