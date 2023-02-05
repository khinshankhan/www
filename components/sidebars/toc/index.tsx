import type { FCC } from "types/react";
import React, { useEffect } from "react";
import { styled, theme, media } from "lib/theme";
import clsx from "clsx";
import type { Computed } from "lib/contentlayer";
import { useScrollSpy, useIsBreakpoint, useDisclosure } from "hooks";
import { Button, Flex } from "components/primitives";
import TocHeading from "./heading";
import { getHeadingsInfo, scrollToHeading } from "./utils";

const Li = styled("li", {
  WebkitHyphens: "auto",
  MozHyphens: "auto",
  MsHyphens: "auto",
  hyphens: "auto",
  paddingLeft: "10px",
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
  [media("xl")]: {
    "&[data-active='true']": {
      boxShadow: `inset 4px 0px 0px 0px ${theme.colors.linkActive}`,
    },
  },
});

export const Toc: FCC<{ headings: Computed["headings"] }> = ({ headings: headingsProp }) => {
  const { minLevel, headings, maxHeights } = getHeadingsInfo(headingsProp);
  const [maxHeightMobile, maxHeightDesktop] = maxHeights;

  const activeIds = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    { rootMargin: "-20% 0% -80% 0%" }
  );

  const { xl: isBelowXl } = useIsBreakpoint("xl");
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    if (isBelowXl) {
      onClose();
    } else {
      onOpen();
    }
  }, [isBelowXl, onClose, onOpen]);

  return (
    <>
      <TocHeading isBelowXl={isBelowXl} isOpen={isOpen} onClick={onToggle} />
      <Flex
        as="ul"
        flexDirection="column"
        style={{
          overflow: "hidden",
          maxHeight: !isOpen ? 0 : isBelowXl ? maxHeightMobile : maxHeightDesktop,
        }}
        className={clsx("collapsible", !isOpen && "closed")}
      >
        {headings.map(({ id, level, content }) => (
          <Li key={id} data-level={level - minLevel} data-active={activeIds.includes(id)}>
            <Button variant="link" data-id={id} onClick={scrollToHeading}>
              {content}
            </Button>
          </Li>
        ))}
      </Flex>
    </>
  );
};
