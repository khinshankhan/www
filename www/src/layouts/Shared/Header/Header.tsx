import React from "react";
import ToggleMode from "src/components/ToggleMode";
import { Flex, Text, Button, Stack } from "@chakra-ui/react";
/* import { Link } from "gatsby"; */

const Header = (): JSX.Element => (
  <Flex align="center" justify="space-between" p="4">
    <Text>shannyboi</Text>
    <Stack isInline spacing="3">
      <Button variant="ghost"> About</Button>
      <Button variant="ghost">Portfolio</Button>
      <Button variant="ghost">Writing</Button>
      <ToggleMode size={30} />
    </Stack>
  </Flex>
);

export default Header;
