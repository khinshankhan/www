import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import Logo from "src/assets/logo";

interface IDesktopProps {
  children?: ReactNode;
}

const Desktop = ({ children }: IDesktopProps): JSX.Element => (
  <Flex as="nav" align="center" justify="space-between" p="4" m="4" mb="5">
    <Logo />
    {children}
  </Flex>
);

export default Desktop;
