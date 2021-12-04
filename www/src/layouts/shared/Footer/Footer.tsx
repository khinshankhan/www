import React from "react";
import { Box, Divider, Stack } from "@chakra-ui/react";
import Copyright from "./Copyright";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    maxW="7xl"
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
  </Box>
);

export default Footer;
