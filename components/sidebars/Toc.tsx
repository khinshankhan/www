import type { FCC } from "types/react";
import React from "react";
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
})

export type HeadingInfo = { id: string; level: number; content: string };

export const Toc: FCC<{ headings: HeadingInfo[] }> = ({ headings }) => (
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
        <Li key={id} data-level={level}>
          <Link href={`#${id}`}>
            {content}
          </Link>
        </Li>
      ))}
    </Flex>
  </>
);
