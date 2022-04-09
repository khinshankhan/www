import React from "react";
import { useColorModeValue, Container, Stack } from "@chakra-ui/react";

export const Footer = () => {
  const dividerColor = useColorModeValue(`gray.200`, `white`);

  return (
    <Container variant="page" as="footer" id="footer">
      <Stack
        direction={{ base: `column-reverse`, md: `row` }}
        justifyContent="space-between"
        alignItems="center"
        pt="5"
        borderTop={1}
        borderStyle="solid"
        borderColor={dividerColor}
      >
        <div>c</div>
        <div>s</div>
      </Stack>
    </Container>
  );
};

export default Footer;
