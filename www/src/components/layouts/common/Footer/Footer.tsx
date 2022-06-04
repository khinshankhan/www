import React, { FC } from "react";
import { Box, Container, Stack } from "@chakra-ui/react";
import Copyright from "./Copyright";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer: FC = () => (
  <Box mt={4} top={0} bg="bgAlpha" backdropFilter="blur(7px)" pos="sticky" zIndex="sticky">
    <Container variant="page" as="footer">
      <Stack
        direction={{ base: `column-reverse`, md: `row` }}
        justifyContent="space-between"
        alignItems="center"
        pt={4}
        pb={4}
        mt={4}
        bg="bgAlpha"
      >
        <Copyright />
        <SocialMediaLinks />
      </Stack>
    </Container>
  </Box>
);

export default Footer;
