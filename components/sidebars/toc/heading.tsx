import type { FCC } from "types/react";
import React from "react";
import { css, media } from "lib/theme";
import clsx from "clsx";
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

const tocHeadingStyles = css({
  width: "100%",
  [media("xlMax")]: {
    marginBottom: "10px",
  },
});

interface ITocHeadingProps extends IMenuToggleProps {
  isBelowXl: boolean;
}

export const TocHeading: FCC<ITocHeadingProps> = ({ isBelowXl, isOpen, onClick = () => {} }) => {
  return (
    <h2 className={clsx("h4", tocHeadingStyles().toString())}>
      {isBelowXl ? <TocToggle isOpen={isOpen} onClick={onClick} /> : "On this page"}
    </h2>
  );
};

export default TocHeading;
