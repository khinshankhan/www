import React from "react";
import Link from "next/link";
import { styled } from "lib/theme";
import type { ILogoProps } from "components/icon/Logo";
import Logo from "components/icon/Logo";

interface IHomeToggleProps extends ILogoProps {
  size?: number | string;
}

// TODO: replace purple with theme primary
const LogoLink = styled(Link, {
  "&:focus, &:focus-visible, &:hover": {
    ".fg": {
      transform: `translate(-50px,-50px) scale(1.25)`,
    },
    ".bg": {
      fill: "rgba(0, 0, 0, 0.12)",
    },

    border: "none",
    outline: "none",
    ".border": {
      stroke: "$linkActive",
    },
  },
});

export const ToggleHome = ({ size = 50, ...props }: IHomeToggleProps) => {
  return (
    <LogoLink href="/" aria-label={`Navigate to homepage`}>
      <Logo
        width={size}
        height={size}
        fgColor="var(--anchorage-colors-logoFg)"
        bgColor="var(--anchorage-colors-logoBg)"
        borderColor="var(--anchorage-colors-logoBorder)"
        {...props}
      />
    </LogoLink>
  );
};

export default ToggleHome;
