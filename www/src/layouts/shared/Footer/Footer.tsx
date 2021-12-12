import React from "react";
import { Container, Divider, Stack } from "@chakra-ui/react";
import Copyright from "./Copyright";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = () => (
  <Container
    as="footer"
    id="footer"
    role="contentinfo"
    mx="auto"
    py="12"
    px={{ base: `4`, md: `8` }}
    marginTop="5"
  >
    <Divider mb={10} />
    <Stack
      direction={{ base: `column-reverse`, md: `row` }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Copyright />
      <SocialMediaLinks />
    </Stack>
  </Container>
);

export default Footer;
