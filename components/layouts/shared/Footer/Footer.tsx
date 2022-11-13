import React from "react";
import { Box, Container } from "@chakra-ui/react";
import type { Footer as ConfigFooter } from "contentlayer/generated";
import { metaConfig } from "contentlayer/generated";
import Copyright from "./Copyright";
import Navigation from "./Navigation";

export const Footer = () => (
  <Box bg="chakra-body-bg-opaque" mt={5} pt={7} pb={7}>
    <Container variant="page" as="footer" id="footer">
      {(metaConfig.footer as ConfigFooter | null) != null && <Navigation />}
      <Copyright />
    </Container>
  </Box>
);

export default Footer;
