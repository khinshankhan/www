import React, { useState, useEffect } from "react";
import { useMediaQuery } from "hooks";
import Link from "next/link";
import { styled, theme, selectMedia, config } from "lib/theme";
import type { ILogoProps } from "components/icons";
import { Logo } from "components/icons";

const getSizeParts = (sizeProp: number | string | undefined = undefined) => {
  const defaultSize = sizeProp?.toString() ?? `50px`;

  const re = /([-0-9]+)(.*)/g;
  const parts = [...defaultSize.matchAll(re)][0];
  const unit = parts[2].toString();
  return {
    size: Number(parts[1]),
    unit: unit === "" ? "px" : unit,
  };
};

interface IHomeToggleProps extends ILogoProps {
  size?: number | string;
  scalable?: boolean;
}

// TODO: replace purple with theme primary
const LogoLink = styled(Link, {
  ".border": {
    transition: "all 1s ease",
  },
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

export const HomeToggle = ({
  size: sizeProp = undefined,
  scalable = true,
  ...props
}: IHomeToggleProps) => {
  const { size: defaultSize, unit } = getSizeParts(sizeProp);
  const [size, setSize] = useState(defaultSize.toString() + unit);
  const increasedSize = useMediaQuery(config.media.lg);

  useEffect(() => {
    if (scalable && increasedSize) {
      setSize((defaultSize * 1.1).toString() + unit);
    } else {
      setSize(defaultSize.toString() + unit);
    }
  }, [scalable, increasedSize, defaultSize, unit]);

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
