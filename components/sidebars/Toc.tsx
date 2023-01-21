import type { FCC } from "types/react";
import React from "react";
import { Button, Flex } from "components/primitives";
import { styled } from "lib/theme";
import { useScrollSpy } from "hooks";
import {scrollToElement} from "lib/utils/scroll"

const Li = styled("li", {
  paddingLeft: "8px",
  "&[data-level='1']": {
    paddingLeft: "24px",
  },
  "&[data-level='2']": {
    paddingLeft: "40px",
  },
  "&[data-level='3']": {
    paddingLeft: "56px",
  },
  "&[data-level='4']": {
    paddingLeft: "70px",
  },

  transition: "box-shadow 0.4s ease-in-out",
  "&[data-active='true']": {
    boxShadow: "inset 4px 0px 0px 0px $colors$linkActive",
  },
});

export type HeadingInfo = { id: string; level: number; content: string };

export const Toc: FCC<{ headings: HeadingInfo[] }> = ({ headings: headingsProp }) => {
  // determine smallest heading, since headings go 1-6, 7 should be out of range
  const minLevel =
    headingsProp.length === 0
      ? 0
      : headingsProp.reduce((min, { level }) => Math.min(min, level), 7);

  // add excerpt to allow for a better 'default' intersection
  const headings = [{ id: "excerpt", level: minLevel, content: "Introduction" }, ...headingsProp];

  const activeIds = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    { rootMargin: "-20% 0% -80% 0%" }
  );

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id
    if(!id) return // too lazy to do type assertion
    // TODO: might be sweet to toast 'successfully scroll to <content>'
    scrollToElement(`[id="${id}"]`)
  }

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
          <Li key={id} data-level={level - minLevel} data-active={activeIds.includes(id)}>
            <Button variant="link" data-id={id} onClick={onClick}>{content}</Button>
          </Li>
        ))}
      </Flex>
    </>
  );
};
