import React from "react";
import { Flex, Button, Stack, IconButton } from "@chakra-ui/react";
import ToggleColorMode from "src/components/ToggleColorMode";
import ToggleDirection from "src/components/ToggleDirection";
import Logo from "src/assets/logo";
import { FaCookie as Cookie } from "react-icons/fa";

const Desktop = (): JSX.Element => (
  <Flex align="center" justify="space-between" p="4">
    <Logo />
    <Stack isInline spacing="3">
      <Button variant="ghost">About</Button>
      <Button variant="ghost">Portfolio</Button>
      <Button variant="ghost">Writing</Button>
      <ToggleColorMode />
      <ToggleDirection />
      <IconButton
        aria-label={`View storage policy`}
        variant="ghost"
        icon={<Cookie fontSize="1.25rem" />}
      />
    </Stack>
  </Flex>
);

export default Desktop;
