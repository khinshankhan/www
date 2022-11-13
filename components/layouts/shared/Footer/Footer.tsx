import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { metaConfig } from "contentlayer/generated";
import Copyright from "./Copyright";
import Navigation from "./Navigation";

export const Footer = () => {
  const showFooterNavigation = metaConfig.footer.sections.length !== 0;

  return (
    <Box bg="chakra-body-bg-opaque" mt={5} pt={7} pb={7}>
      <Container variant="page" as="footer" id="footer">
        {showFooterNavigation && <Navigation />}
        <Copyright mt={{ base: 0, lg: showFooterNavigation ? 7 : 0 }} />
      </Container>
    </Box>
  );
};

export default Footer;
