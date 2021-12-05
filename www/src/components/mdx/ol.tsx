import React, { ReactNode } from "react";
import { OrderedList } from "@chakra-ui/react";

interface IOlProps {
  children: ReactNode;
  [key: string]: any;
}

const ol = ({ children, ...props }: IOlProps) => <OrderedList {...props}>{children}</OrderedList>;

export default ol;
