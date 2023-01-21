import type { FCC } from "types/react";
import React from "react";
import { Link, Flex } from "components/primitives";
import { styled } from "lib/theme";
import { useScrollSpy } from "hooks";

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
    boxShadow: "inset 4px 0px 0px 0px $colors$linkActive",
  },
});

export type HeadingInfo = { id: string; level: number; content: string };

export const Toc: FCC<{ headings: HeadingInfo[] }> = ({ headings }) => {
  const activeIds = useScrollSpy(
    [`[id="excerpt"]`,...headings.map(({ id }) => `[id="${id}"]`)],
    {
      rootMargin: "-20% 0% -80% 0%",
    }
  );

  return (
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
          <Li key={id} data-level={level} data-active={activeIds.includes(id)}>
            <Link href={`#${id}`}>{content}</Link>
          </Li>
        ))}
      </Flex>
    </>
  );
};
