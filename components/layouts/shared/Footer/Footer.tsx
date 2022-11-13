import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Copyright from "./Copyright";

export const Footer = () => (
  <Box bg="chakra-body-bg-opaque" mt={5} pt={7} pb={7}>
    <Container variant="page" as="footer" id="footer">
      <Copyright />
    </Container>
  </Box>
);

export default Footer;
