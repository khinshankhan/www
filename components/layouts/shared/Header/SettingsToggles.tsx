import React from "react";
import type { ComponentWithAs, StackProps } from "@chakra-ui/react";
import { ToggleColorMode } from "components/toggles";

export interface IUseNavProps {
  Stack: ComponentWithAs<"div", StackProps>;
}

// NOTE: mobile header should be updated to pass in HStack for more than 1 setting toggle
const SettingsToggles = ({ Stack: SettingsToggleStack }: IUseNavProps) => (
  <SettingsToggleStack id="setting-toggles" m={0} p={0}>
    <ToggleColorMode />
  </SettingsToggleStack>
);

export default SettingsToggles;
