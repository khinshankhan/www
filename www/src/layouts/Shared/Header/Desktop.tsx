import React from "react";
import ToggleMode from "src/components/ToggleMode";
import { Flex, Text, Button, Stack } from "@chakra-ui/react";

const Desktop = (): JSX.Element => (
  <Flex align="center" justify="space-between" p="4">
    <Text>shannyboi</Text>
    <Stack isInline spacing="3">
      <Button variant="ghost">About</Button>
      <Button variant="ghost">Portfolio</Button>
      <Button variant="ghost">Writing</Button>
      <ToggleMode />
      <ToggleMode />
    </Stack>
  </Flex>
);

export default Desktop;
