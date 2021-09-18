import React from "react";
import ToggleMode from "src/components/ToggleMode";
import { Flex, Button, Stack, IconButton } from "@chakra-ui/react";
import Logo from "src/assets/logo";
import { FaCookie as Cookie } from "react-icons/fa";
import { MdFormatTextdirectionLToR as Direction } from "react-icons/md";

const Desktop = (): JSX.Element => (
  <Flex align="center" justify="space-between" p="4">
    <Logo />
    <Stack isInline spacing="3">
      <Button variant="ghost">About</Button>
      <Button variant="ghost">Portfolio</Button>
      <Button variant="ghost">Writing</Button>
      <ToggleMode />
      <IconButton
        aria-label={`Change header position`}
        variant="ghost"
        icon={<Direction fontSize="1.25rem" />}
      />
      <IconButton
        aria-label={`View storage policy`}
        variant="ghost"
        icon={<Cookie fontSize="1.25rem" />}
      />
    </Stack>
  </Flex>
);

export default Desktop;
