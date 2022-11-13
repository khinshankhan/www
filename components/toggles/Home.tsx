import React from "react";
import { IconButton } from "@chakra-ui/react";
import { Link } from "components/common/Link";
import type { ILogoProps } from "components/icons/Logo";
import { Logo } from "components/icons/Logo";

interface IHomeToggleProps extends ILogoProps {
  size?: number | string;
}

export const HomeToggle = ({ size = 50, ...props }: IHomeToggleProps) => (
  <IconButton
    as={Link}
    href="/"
    aria-label={`Navigate to homepage`}
    variant="ghost"
    icon={
      <Logo
        width={size}
        height={size}
        bgColor="transparent"
        fgColor="chakra-body-text"
        borderColor="transparent"
        {...props}
      />
    }
    chakraProps={{
      border: 2.75,
      borderStyle: `solid`,
      borderColor: `chakra-body-text`,
      borderRadius: 7,
      _hover: {
        ".fg": {
          fill: `primary`,
          transform: `translate(-50px,-50px)`,
          path: {
            transform: `scale(1.25)`,
          },
        },
        borderColor: `primary`,
      },
    }}
  />
);

export default HomeToggle;
