import React from "react"

import { narray } from "lib/utils"

import { PageSkeletonLayout } from "components/layouts/page-skeleton"

export default function Page() {
  return (
    <PageSkeletonLayout title="About" subtitle="Me, myself, and I">
      <Lorem n={20} />
      <p className="text-sky-400">hello there and lorem ipsum</p>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p className="main-nav">main nav</p>
      <p>paragraph</p>
      <h3>
        <a className="anchor" href="https://google.com">
          Anchored Link
        </a>
      </h3>
      This is a link <a href="https://google.com">Google link</a> and it goes to google.
      <Lorem />
    </PageSkeletonLayout>
  )
}

function Lorem({ n = 50 }) {
  return (
    <>
      {narray(n).map((v) => {
        return (
          <p key={v}>
            Hello there, this is some random gibberish. It is not meant to have any meaning, it
            sounds like gibberish because it is gibberish.
          </p>
        )
      })}
    </>
  )
}
