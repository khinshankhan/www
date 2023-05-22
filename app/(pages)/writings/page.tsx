import React from "react"
import { Link, typographyVariants } from "@/components/ui"

// TODO: replace this stub with actual content
const posts = [
  {
    id: 1,
    slug: "/bye",
    title: "Bye now",
    subtitle: "Greetings 'n stuff pt2",
    excerpt: `Salutation in parting, also goodbye, good bye, good-by, 1590s, from godbwye (1570s).`,
    imgSrc:
      "https://images.unsplash.com/photo-1636193535246-a07cd0aa6fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 0,
    slug: "/hello",
    title: "Hello there",
    subtitle: "Greetings 'n stuff",
    excerpt: `The dictionary says it was Thomas Edison who put hello into common usage. He urged the people who used his phone to say "hello" when answering. His rival, Alexander Graham Bell, thought the better word was "ahoy."`,
    imgSrc:
      "https://images.unsplash.com/photo-1500576992153-0271099def59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
  },
]

export default function Writings() {
  return (
    <ul className="space-y-8 ">
      {posts.map((post) => (
        <li key={post.id} className="card-link link-box flex w-full bg-theme-card">
          <div className="flex h-full w-full flex-col flex-col-reverse md:flex-row">
            <div className="p-6">
              <h3 className={typographyVariants({ variant: "h3" })}>
                <Link className="link-overlay" href={post.slug}>
                  {post.title}
                </Link>
              </h3>
              <h4 className={typographyVariants({ variant: "h4" })}>{post.subtitle}</h4>
              <span className="line-clamp-3 text-theme-muted">{post.excerpt}</span>
            </div>

            <div className="relative -z-1 h-32 w-full flex-none sm:h-48 md:h-auto md:w-72 lg:w-96">
              <img
                src={post.imgSrc}
                // TODO: will be filled in when there's actual content
                alt=""
                className="md:clip-list-image relative inset-0 h-full w-full object-cover md:absolute"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
