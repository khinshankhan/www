import type { FCC } from "types/react";
import React, { useEffect } from "react";
import { styled, media } from "lib/theme";
import clsx from "clsx";
import { useScrollSpy, useIsBreakpoint, useDisclosure } from "hooks";
import { scrollToElement } from "lib/utils/scroll";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton } from "components/primitives";
import type { IMenuToggleProps } from "components/toggles";

const TocToggle = ({ className = "", isOpen, onClick = () => {}, ...props }: IMenuToggleProps) => {
  const MenuIcon = isOpen ? ChevronDownIcon : ChevronRightIcon;
  const action = isOpen ? "Close" : "Open";

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
          [media("xs")]: "row",
        }}
        style={{ width: "100%" }}
      >
        <span>Table of Contents</span>
        <span style={{ display: "inline-block" }}>
          <MenuIcon />
        </span>
      </Flex>
    </Button>
  );
};

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

  return (
    <>
      <h2 className="h4" style={{ textAlign: "center", width: "100%" }}>
        {isBelowXl ? <TocToggle isOpen={isOpen} onClick={onToggle} /> : <>Table of Contents</>}
      </h2>
      <Flex
        as="ul"
        flexDirection="column"
        style={{ overflow: "hidden", maxHeight: !isOpen ? 0 : 35 * headings.length }}
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
