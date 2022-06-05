import React from "react";
import { BoxProps, forwardRef, Box, Container, Stack } from "@chakra-ui/react";
import Copyright from "./Copyright";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = forwardRef((props: BoxProps, ref = null) => (
  <Box
    top={0}
    bg="bgAlpha"
    backdropFilter="blur(7px)"
    pos="sticky"
    zIndex="sticky"
    ref={ref}
    {...props}
  >
    <Container variant="page" as="footer" id="footer">
      <Stack
        direction={{ base: `column-reverse`, md: `row` }}
        justifyContent="space-between"
        alignItems="center"
        pt={4}
        pb={4}
        bg="bgAlpha"
      >
        <Copyright />
        <SocialMediaLinks />
      </Stack>
    </Container>
  </Box>
));

export default Footer;
