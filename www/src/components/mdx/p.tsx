import React, { ReactNode } from "react";
import { Text } from "@chakra-ui/react";

interface IPProps {
  children: ReactNode;
  [key: string]: any;
}

const p = ({ children, ...props }: IPProps) => (
  <Text variant="body" {...props}>
    {children}
  </Text>
);

export default p;
