import React from "react"
import * as Form from "@radix-ui/react-form"

import { Link } from "components/ui"
import { PageSkeletonLayout } from "components/layouts/page-skeleton"

export default function Page() {
  return (
    <PageSkeletonLayout title="Contact" subtitle="Getting in touch. Boop :point_up_2:">
      <p>
        {`I'm always happy to chat. If you have any concerns/ thoughts about the website or content or
        just want to talk with me, you can get in touch with me either through the contact form
        below or one of my`}{" "}
        <Link href="/links" isInternal>
          links
        </Link>
        .
      </p>

      <h2 id="#say-hi">
        <Link href="#say-hi" className="anchor">
          Say hi.
        </Link>
      </h2>
      <p>{`Or say low. I'm not your mom.`}</p>

      <Form.Root
        className="flex w-full flex-col gap-5"
        onSubmit={(event) => {
          // prevent default form submission
          event.preventDefault()

          const data = Object.fromEntries(new FormData(event.currentTarget))
          alert(JSON.stringify(data))
        }}
      >
        <Form.Field className="formfield" name="name">
          <div className="flex items-baseline justify-between">
            <Form.Label>Your name</Form.Label>
            <Form.Message match="valueMissing">Please enter your name or moniker</Form.Message>
          </div>
          <Form.Control asChild>
            <input type="text" required placeholder="shan" />
          </Form.Control>
        </Form.Field>

        <Form.Field className="formfield" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label>Email</Form.Label>
            <Form.Message match="valueMissing">Please enter your email</Form.Message>
            <Form.Message match="typeMismatch">Please provide a valid email</Form.Message>
          </div>
          <Form.Control asChild>
            <input type="email" required placeholder="shan@uptogood.dev" />
          </Form.Control>
        </Form.Field>

        <Form.Field className="formfield" name="message">
          <div className="flex items-baseline justify-between">
            <Form.Label>Message</Form.Label>
            <Form.Message match="valueMissing">Please enter a message</Form.Message>
          </div>
          <Form.Control asChild>
            <textarea className="" required placeholder="I decided to say low. Low :)" />
          </Form.Control>
        </Form.Field>

        <div className="mt-2 flex w-full flex-row justify-end">
          <Form.Submit asChild>
            <button className="bg-violet-9 p-2.5 text-white hover:bg-violet-11 focus:bg-violet-11 dark:bg-violet-8 dark:text-theme-placeholder dark:hover:bg-violet-10 dark:focus:bg-violet-10">
              Send message
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </PageSkeletonLayout>
  )
}
