import React from "react";
import { OrderedList } from "@chakra-ui/react";

interface IOlProps {
  children: React.ReactNode;
  [key: string]: any;
}

const ol = ({ children, ...props }: IOlProps) => (
  <OrderedList {...props}>{children}</OrderedList>
);

export default ol;
