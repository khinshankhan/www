import React from "react";
import { OrderedList } from "@chakra-ui/react";

const ol = (props) => {
  const { children }: { children: React.ReactNode } = props;

  return <OrderedList {...props}>{children}</OrderedList>;
};

export default ol;
