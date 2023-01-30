import React, { useState, useEffect } from "react";
import { useMediaQuery } from "hooks";
import Link from "next/link";
import { styled, theme, selectMedia, config } from "lib/theme";
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

export const HomeToggle = ({ size: sizeProp = undefined, ...props }: IHomeToggleProps) => {
  const defaultSize = sizeProp ?? `50px`;
  const [size, setSize] = useState(defaultSize);
  const increasedSize = useMediaQuery(config.media.lg);

  useEffect(() => {
    if (increasedSize && sizeProp === undefined) {
      setSize(`55px`);
    } else {
      setSize(defaultSize);
    }
  }, [increasedSize]);

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
