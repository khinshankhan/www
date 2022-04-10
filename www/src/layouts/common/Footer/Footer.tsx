import React from "react";
import { useColorModeValue, Container, Stack } from "@chakra-ui/react";
import Copyright from "./Copyright";
import SocialMediaLinks from "./SocialMediaLinks";

export const Footer = () => {
  const dividerColor = useColorModeValue(`gray.200`, `white`);

  return (
    <Container variant="page" as="footer" id="footer">
      <Stack
        direction={{ base: `column-reverse`, md: `row` }}
        justifyContent="space-between"
        alignItems="center"
        pt="4"
        mb="3"
        mt="4"
        borderTop={1}
        borderStyle="solid"
        borderColor={dividerColor}
      >
        <Copyright />
        <SocialMediaLinks />
      </Stack>
    </Container>
  );
};

export default Footer;
