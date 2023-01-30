import React from "react";
import Link from "next/link";
import { styled, theme, selectMedia } from "lib/theme";
import type { ILogoProps } from "components/icons";
import { Logo } from "components/icons";

interface IHomeToggleProps extends ILogoProps {
  size?: number | string;
}

// TODO: replace purple with theme primary
const LogoLink = styled(Link, {
  [selectMedia("at")]: {
    ".fg": {
      transform: `translate(-50px,-50px) scale(1.25)`,
    },
    ".bg": {
      fill: theme.colors.ghostBg,
    },

    outlineOffset: "2px",
    border: "none",
    ".border": {
      stroke: theme.colors.linkActive,
    },
  },
});

export const HomeToggle = ({ size = 50, ...props }: IHomeToggleProps) => {
  return (
    <LogoLink href="/" aria-label="Navigate to homepage">
      <Logo
        width={size}
        height={size}
        fgColor={theme.colors.logoFg.toString()}
        bgColor={theme.colors.logoBg.toString()}
        borderColor={theme.colors.logoBorder.toString()}
        {...props}
      />
    </LogoLink>
  );
};

export default HomeToggle;
