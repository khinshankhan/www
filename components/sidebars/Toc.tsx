import type { FCC } from "types/react";
import React, {useState, useEffect} from "react";
import { Link, Flex } from "components/primitives";
import { styled } from "lib/theme";

const Li = styled("li", {
  paddingLeft: "8px",
  "&[data-level='3']": {
    paddingLeft: "24px",
  },
  "&[data-level='4']": {
    paddingLeft: "40px",
  },
  "&[data-level='5']": {
    paddingLeft: "56px",
  },
  "&[data-level='6']": {
    paddingLeft: "70px",
  },

  transition: "box-shadow 0.4s ease-in-out",
  "&[data-active='true']": {
    boxShadow: "inset 4px 0px 0px 0px $colors$linkActive"
  }
})

export type HeadingInfo = { id: string; level: number; content: string };

export const Toc: FCC<{ headings: HeadingInfo[] }> = ({ headings }) => {
  const [active, setActive] = useState("")
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    const existingElements = headings.map(({id}) => document.getElementById(id)).filter(Boolean)

    existingElements.forEach((el) => {
      if (el) {
        observer.observe(el)
      }
    })

  }, [])

  return(
  <>
    <h2
      className="h4"
      style={{
        textAlign: "center",
      }}
    >
      Table of Contents
    </h2>
    <Flex as="ul" flexDirection="column">
      {headings.map(({ id, level, content }) => (
        <Li key={id} data-level={level} data-active={active === id}>
          <Link href={`#${id}`}>
            {content}
          </Link>
        </Li>
      ))}
    </Flex>
  </>
);}
