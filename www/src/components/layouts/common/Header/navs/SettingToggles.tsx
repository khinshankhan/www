import React from "react";
import { ComponentWithAs, StackProps } from "@chakra-ui/react";
import { ToggleColorMode } from "src/components/toggles";

export interface IUseNavProps {
  Stack: ComponentWithAs<"div", StackProps>;
}

// NOTE: mobile header should be updated to pass in HStack for more than 1 setting toggle
const SettingToggles = ({ Stack: SettingsToggleStack }: IUseNavProps) => (
  <SettingsToggleStack as="menu" id="setting-toggles" m={0} p={0}>
    <ToggleColorMode />
  </SettingsToggleStack>
);

export default SettingToggles;
