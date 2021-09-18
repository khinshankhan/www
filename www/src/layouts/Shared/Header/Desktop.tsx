import React from "react";
import ToggleMode from "src/components/ToggleMode";
import { Flex, Button, Stack } from "@chakra-ui/react";
import Logo from "src/assets/logo";

const Desktop = (): JSX.Element => (
  <Flex align="center" justify="space-between" p="4">
    <Logo />
    <Stack isInline spacing="3">
      <Button variant="ghost">About</Button>
      <Button variant="ghost">Portfolio</Button>
      <Button variant="ghost">Writing</Button>
      <ToggleMode />
      <ToggleMode />
      <ToggleMode />
    </Stack>
  </Flex>
);

export default Desktop;
