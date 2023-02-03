import type { FCC } from "types/react";
import React, { useEffect } from "react";
import { styled, theme, media } from "lib/theme";
import clsx from "clsx";
import type { Computed } from "lib/contentlayer";
import { useScrollSpy, useIsBreakpoint, useDisclosure } from "hooks";
import { scrollToElement } from "lib/utils/scroll";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "components/primitives";
import type { IMenuToggleProps } from "components/toggles";

const TocToggle = ({ className = "", isOpen, onClick = () => {}, ...props }: IMenuToggleProps) => {
  const MenuIcon = isOpen ? ChevronDownIcon : ChevronRightIcon;
  const action = isOpen ? "Close" : "Open";

  // https://validator.w3.org/nu/#textarea
  return (
    <Button
      variant="ghost"
      className={className}
      css={{ width: "100%" }}
      aria-label={`${action} navigation menu`}
      onClick={onClick}
      {...props}
    >
      <Flex
        as="span"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{
          [media("initial")]: "column",
          [media("xss")]: "row",
        }}
        style={{ width: "100%" }}
      >
        <span>On this page</span>
        <span style={{ display: "inline-block" }}>
          <MenuIcon />
        </span>
      </Flex>
    </Button>
  );
};

const Li = styled("li", {
  wordBreak: "break-all",
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

const TocHeading = styled("h2", {
  width: "100%",
  [media("xlMax")]: {
    marginBottom: "10px",
  },
});

export const Toc: FCC<{ headings: Computed["headings"] }> = ({ headings: headingsProp }) => {
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
    const id = event.currentTarget.dataset.id;
    if (!id) return; // too lazy to do type assertion
    // TODO: might be sweet to toast 'successfully scroll to <content>'
    scrollToElement(`[id="${id}"]`);
  };

  const { xl: isBelowXl } = useIsBreakpoint("xl");
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    if (isBelowXl) {
      onClose();
    } else {
      onOpen();
    }
  }, [isBelowXl, onClose, onOpen]);

  const maxHeight = headings
    .map((heading) => {
      // account for left padding causing less characters per line
      const paddedContent = heading.content.length + (heading.level - minLevel);
      const lines = Math.floor(paddedContent / 18) + 1;
      return lines * 35;
    })
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <TocHeading className={"h4"}>
        {isBelowXl ? <TocToggle isOpen={isOpen} onClick={onToggle} /> : <>On this page</>}
      </TocHeading>
      <Flex
        as="ul"
        flexDirection="column"
        style={{ overflow: "hidden", maxHeight: !isOpen ? 0 : maxHeight }}
        className={clsx("collapsible", !isOpen && "closed")}
      >
        {headings.map(({ id, level, content }) => (
          <Li key={id} data-level={level - minLevel} data-active={activeIds.includes(id)}>
            <Button variant="link" data-id={id} onClick={onClick}>
              {content}
            </Button>
          </Li>
        ))}
      </Flex>
    </>
  );
};