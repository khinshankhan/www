import React, { ReactNode } from "react";
import { Text } from "@chakra-ui/react";

interface IPProps {
  children: ReactNode;
  [key: string]: any;
}

const p = (props: IPProps) => <Text {...props} />;

export default p;
