import React from "react"
import NextLink from "next/link"

function Wave() {
  return (
    <img
      alt=":wave:"
      src="https://github.githubassets.com/images/icons/emoji/unicode/1f44b.png?v8"
      className="animate-wave inline aspect-auto h-[1em] w-[1em]"
    />
  )
}

export default function Page() {
  return (
    <section className="container mx-auto my-8 flex flex-col items-center justify-center space-y-12">
      <section className="flex flex-col items-center justify-center md:flex-row-reverse">
        <img
          alt="Profile Image"
          className="rounded-full md:ml-8"
          height="256"
          src="https://github.com/khinshankhan.png"
          style={{
            aspectRatio: "256/256",
            objectFit: "cover",
          }}
          width="256"
        />

        <section className="flex flex-col items-center space-y-4 text-center md:items-end md:text-right">
          <h1 className="text-5xl font-bold tracking-tighter md:text-7xl">
            Hello there <Wave />
          </h1>
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">I'm Khinshan Khan</h2>
          <h3 className="mx-auto max-w-[700px] hyphens-auto text-balance text-3xl text-gray-500 dark:text-gray-400 sm:hyphens-none">
            Welcome to my corner of the internet to explore the intersections of creativity and
            technology
          </h3>

          <NextLink
            href="/writings/"
            className="w-full rounded-lg bg-gray-900 py-3 text-gray-50 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-700 md:w-auto md:px-8 md:text-lg"
          >
            Read my writings
          </NextLink>
        </section>
      </section>

      <p className="mx-auto max-w-[1400px] hyphens-auto text-balance text-center text-3xl sm:hyphens-none">
        I {`wasn't`} really sure what to put here, especially since I have an{" "}
        <NextLink href="/about/">about</NextLink> page which has the most of what I {`would've`}{" "}
        thrown here. So I put something which would interest me:
      </p>
    </section>
  )
}
