import React from "react";
import { GatsbySSR } from "gatsby";
import ChakraWrapper from "./Chakra";
import Fonts from "./Fonts";

export const RootWrapper: GatsbySSR["wrapRootElement"] = ({ element }) => (
  <ChakraWrapper>
    <Fonts />
    {element}
  </ChakraWrapper>
);

export default RootWrapper;
