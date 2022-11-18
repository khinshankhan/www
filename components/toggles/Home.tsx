import React from "react";
import { Link } from "components/common/Link";
import type { ILogoProps } from "components/icons/Logo";
import { Logo } from "components/icons/Logo";
import {
  _focus as IconButtonFocusStyles,
  _hover as IconButtonHoverStyles,
} from "lib/theme/styles/IconButton";

interface IHomeToggleProps extends ILogoProps {
  size?: number | string;
}

export const HomeToggle = ({ size = 50, ...props }: IHomeToggleProps) => {
  const svgAtProps = {
    ".fg": {
      fill: `primary`,
      transform: `translate(-50px,-50px) scale(1.25)`,
    },
    borderColor: `primary`,
  };

  return (
    <Link
      href="/"
      aria-label={`Navigate to homepage`}
      chakraProps={{
        border: 2.75,
        borderStyle: `solid`,
        borderColor: `chakra-body-text`,
        borderRadius: 7,
        _focus: { ...svgAtProps, ...IconButtonFocusStyles },
        _hover: { ...svgAtProps, ...IconButtonHoverStyles },
      }}
    >
      <Logo
        width={size}
        height={size}
        bgColor="transparent"
        fgColor="chakra-body-text"
        borderColor="transparent"
        {...props}
      />
    </Link>
  );
};

export default HomeToggle;
