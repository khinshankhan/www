import React, { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "src/theme";

interface IChakraThemeProps {
  resetCSS?: boolean;
  portalZIndex?: number;
}

export const ChakraWrapper: FC<IChakraThemeProps> = ({
  children,
  resetCSS = true,
  portalZIndex = 40,
}) => (
  <ChakraProvider theme={Theme} resetCSS={resetCSS} portalZIndex={portalZIndex}>
    {children}
  </ChakraProvider>
);

export default ChakraWrapper;
