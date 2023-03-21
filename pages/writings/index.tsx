import React from "react"
import { allWritings as pages, type Writing } from "contentlayer/generated"
import { useMDXComponent } from "next-contentlayer/hooks"

import { type Computed } from "lib/contentlayer"

import { Link } from "components/ui"
import { Prose } from "components/layouts"
import { MdxComponents } from "components/mdx"

// TODO: remove after demo
const src0 = "https://images.unsplash.com/photo-1534953196761-569fa264d8f9"
const src1 =
  "https://cdn.discordapp.com/attachments/1008571034733129864/1087798220186456124/bkparker_logo_design_with_icons_of_a_vintage_microphone_and_hea_0f65429e-760b-4986-aa75-1e34c1a7a9de.png"

function Card({ slug, computed, _id }: Writing) {
  const { frontmatter, mdx } = computed as Computed
  const MDXSubtitle = useMDXComponent(mdx.subtitle || "")
  const MDXExcerpt = useMDXComponent(mdx.excerpt || "")

  // TODO: remove after demo
  const imgsrc = _id === "writings/first/index.md" ? src0 : src1

  // TODO: change bg color and shadowing
  // TODO: add in linkbox linkoverlay logic
  return (
    <li className="link-box card-link mx-auto mb-8 flex w-full flex-col flex-col-reverse overflow-hidden rounded bg-theme-bg shadow-md md:flex-row">
      <div className="flex-1 p-4 md:p-8">
        <h3>
          <Link isInternal isFile={false} href={`/${slug}`} className="link-overlay">
            {frontmatter.title}
          </Link>
        </h3>
        <h4 className="text-theme-muted">
          {MDXSubtitle && <MDXSubtitle components={MdxComponents} />}
        </h4>
        <div className="line-clamp-1 xl:line-clamp-4 2xl:line-clamp-5 xmd:line-clamp-2 slg:line-clamp-3">
          {MDXExcerpt && <MDXExcerpt components={MdxComponents} />}
        </div>
      </div>

      <div className="round -z-1 max-w-full md:max-w-[375px] lg:max-w-[450px] 2xl:max-w-[500px] xmd:max-w-[400px] xmd:max-w-[425px] slg:max-w-[475px]">
        <img
          className="md:clip-list-image aspect-video h-full w-full object-cover isMobile:max-h-[100px] xs:isMobile:max-h-[150px] sm:isMobile:max-h-[200px]"
          src={imgsrc}
          alt="Testing 123"
        />
      </div>
    </li>
  )
}

function List({ pages }: { pages: Writing[] }) {
  return (
    <ul>
      {pages.map((page) => (
        <Card key={page._id} {...page} />
      ))}
    </ul>
  )
}

export default function Page() {
  return (
    <Prose title="Writings" subtitle="Rambling and stuff">
      <List pages={pages} />
    </Prose>
  )
}
