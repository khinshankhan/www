import React from "react";
import { ColorModeScript } from "@chakra-ui/react";
import { GatsbySSR } from "gatsby";
import { RootWrapper } from "src/wrappers";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<ColorModeScript initialColorMode={`dark`} key="chakra-ui-no-flash" />]);
};

export const wrapRootElement: GatsbySSR["wrapRootElement"] = RootWrapper;
