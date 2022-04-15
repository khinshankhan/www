import React from "react";
import { Button, Container, Stack } from "@chakra-ui/react";

export const SkipNav = () => (
  <Container
    as={Stack}
    variant="page"
    bg="bg"
    border={1}
    borderStyle="solid"
    borderColor="bgContrast"
    zIndex={2}
    pos="fixed"
    mt={10}
    p={3}
    left="-100vw"
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    _focusWithin={{
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    }}
  >
    <Button>Skip to main content</Button>
    <Button>Skip to footer</Button>
    <Button>Accessibility feedback</Button>
  </Container>
);

export default SkipNav;
