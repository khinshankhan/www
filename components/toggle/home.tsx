import React from "react";
import Link from "next/link";
import { css } from "lib/theme";
import type { ILogoProps } from "components/icon/Logo";
import Logo from "components/icon/Logo";

interface IHomeToggleProps extends ILogoProps {
  size?: number | string;
}

// TODO: replace purple with theme primary
const svgAt = css({
  "&:focus, &:focus-visible, &:hover":{
    ".fg": {
      transform: `translate(-50px,-50px) scale(1.25)`,
    },
    ".bg": {
      fill: "rgba(0, 0, 0, 0.12)"
    },

    border: "none",
    outline: "none",
    ".border": {
      stroke: "purple"
    },
  }
})

export const HomeToggle = ({ size = 50, ...props }: IHomeToggleProps) => {
  return (
    <Link
      href="/"
      className={svgAt()}
      aria-label={`Navigate to homepage`}
    >
      <Logo
        width={size}
        height={size}
        fgColor="var(--anchorage-colors-logoFg)"
        bgColor="var(--anchorage-colors-logoBg)"
        borderColor="var(--anchorage-colors-logoBorder)"
        {...props}
      />
    </Link>
  );
};

export default HomeToggle;
