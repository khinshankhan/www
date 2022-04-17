import React from "react";
import { GatsbySSR } from "gatsby";
import ChakraWrapper from "./Chakra";

export const RootWrapper: GatsbySSR["wrapRootElement"] = ({ element }) => (
  <ChakraWrapper>{element}</ChakraWrapper>
);

export default RootWrapper;
