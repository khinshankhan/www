import React from "react";
import { Button, Container, Flex, Spacer } from "@chakra-ui/react";

export const SkipNav = () => (
  <Container
    as={Flex}
    variant="page"
    bg="bg"
    border={1}
    borderStyle="solid"
    borderColor="bgContrast"
    zIndex={2}
    pos="fixed"
    mt={10}
    p={3}
  >
    <Button>Skip to main content</Button>
    <Spacer />
    <Button>Skip to footer</Button>
    <Spacer />
    <Button>Accessibility feedback</Button>
  </Container>
);

export default SkipNav;
