import React from "react";
import { Box } from "@chakra-ui/react";
import type { FCC } from "src/types/react";

// Inspired by: https://stackoverflow.com/a/41712116
// TODO: circle back for a11y and better theming
export const Spoiler: FCC = () => (
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
        content: `"Hello there budaroo"`,
        color: `codeBg`,
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
