import React, { type ReactNode } from "react"
import * as Form from "@radix-ui/react-form"

import { Button, Link } from "components/ui"
import Emoji from "components/emoji"
import { PageSkeletonLayout } from "components/layouts/page-skeleton"

function FieldInfo({ children }: { children: ReactNode }) {
  return <div className="flex flex-col items-baseline justify-between md:flex-row">{children}</div>
}

export default function Page() {
  return (
    <PageSkeletonLayout
      title="Contact"
      subtitle={
        <span>
          {`Getting in touch. Boop`} <Emoji name=":point_up_2:" />
        </span>
      }
    >
      <p>
        {`I'm always happy to chat. If you have any concerns/ thoughts about the website or content or
        just want to talk with me, you can get in touch with me either through one of my`}{" "}
        <Link href="/links" isInternal>
          links
        </Link>{" "}
        {`(feel free to dm, I'll take a looksie eventually) or better yet use the contact form below`}{" "}
        <Emoji name=":point_down:" />
      </p>

      <h2 id="#say-hi">
        <Link href="#say-hi" className="anchor">
          Say hi.
        </Link>
      </h2>
      <p>
        {`Or say low. I'm not your mom`} <Emoji name=":akkoShrug:" />
      </p>

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
          <FieldInfo>
            <Form.Label>Your name</Form.Label>
            <Form.Message match="valueMissing">Please enter your name or moniker</Form.Message>
          </FieldInfo>
          <Form.Control asChild>
            <input type="text" required placeholder="shan" />
          </Form.Control>
        </Form.Field>

        <Form.Field className="formfield" name="email">
          <FieldInfo>
            <Form.Label>Email</Form.Label>
            <Form.Message match="valueMissing">Please enter your email</Form.Message>
            <Form.Message match="typeMismatch">Please provide a valid email</Form.Message>
          </FieldInfo>
          <Form.Control asChild>
            <input type="email" required placeholder="shan@uptogood.dev" />
          </Form.Control>
        </Form.Field>

        <Form.Field className="formfield" name="message">
          <FieldInfo>
            <Form.Label>Message</Form.Label>
            <Form.Message match="valueMissing">Please enter a message</Form.Message>
          </FieldInfo>
          <Form.Control asChild>
            <textarea className="" required placeholder="I decided to say low. Low :)" />
          </Form.Control>
        </Form.Field>

        <div className="mt-2 flex w-full flex-row justify-end">
          <Form.Submit asChild>
            <Button className="bg-violet-9 text-white hover:bg-violet-11 focus:bg-violet-11 dark:bg-violet-8 dark:text-theme-placeholder dark:hover:bg-violet-10 dark:focus:bg-violet-10">
              Send message
            </Button>
          </Form.Submit>
        </div>
      </Form.Root>
    </PageSkeletonLayout>
  )
}
