import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "src/theme";
import type { FCC } from "src/types/react";

interface IChakraThemeProps {
  resetCSS?: boolean;
  portalZIndex?: number;
}

export const ChakraWrapper: FCC<IChakraThemeProps> = ({
  children,
  resetCSS = true,
  portalZIndex = 40,
}) => (
  <ChakraProvider theme={Theme} resetCSS={resetCSS} portalZIndex={portalZIndex}>
    {children}
  </ChakraProvider>
);

export default ChakraWrapper;
