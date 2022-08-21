import React from "react";
import type { FC } from "react";
import { Box } from "@chakra-ui/react";

interface ISpoilerProps {
  text: string;
}

// Inspired by: https://stackoverflow.com/a/41712116
// TODO: circle back for a11y and better theming
export const Spoiler: FC<ISpoilerProps> = ({ text }) => (
  <Box
    as="span"
    cursor="default"
    marginBottom="10px"
    padding="10px"
    backgroundColor="codeBg"
    borderLeft="0.25em solid #baadb3"
    tabIndex={0}
    sx={{
      "::after": {
        content: `"${text}"`,
        color: `transparent`,
        padding: `0 0.5em`,
      },
      "&:focus::after, &:hover::after": {
        cursor: `auto`,
        color: `white`,
        transition: `color .5s ease-in-out`,
      },
    }}
  />
);

export default Spoiler;
