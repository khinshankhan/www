import React, { useState } from "react";
import { Box, Fade, Icon, IconButton } from "@chakra-ui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import type { FCC } from "src/types/react";

interface ISpoilerProps {
  text: string;
}

// Inspired by: https://stackoverflow.com/a/41712116
// TODO: circle back for a11y and better theming
export const Spoiler: FCC<ISpoilerProps> = ({ text, children }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prev) => !prev);
  const icon = show ? FaRegEye : FaRegEyeSlash;
  const ariaLabel = show ? `hide spoiler (to the right)` : `show spoiler (to the right)`;

  return (
    <Box as="span">
      <Box as="span" marginBottom="10px" padding="10px" backgroundColor="inlineCodeBg">
        <IconButton
          aria-label={ariaLabel}
          colorScheme="transparent"
          onClick={toggleShow}
          icon={<Icon as={icon} color="bgContrast" />}
        />
      </Box>
      <Box
        as="span"
        cursor="default"
        backgroundColor="codeBg"
        marginBottom="10px"
        padding="10px"
        color="white"
        sx={{
          "::after": {
            content: show ? `""` : `"${text || children}"`,
            color: `transparent`,
            padding: `0 0.5em`,
          },
        }}
      >
        <Fade
          in={show}
          style={{
            display: `inline-block`,
          }}
        >
          {show && (children || text)}
        </Fade>
      </Box>
    </Box>
  );
};

export default Spoiler;
