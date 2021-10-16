import React from "react";
import { UnorderedList } from "@chakra-ui/react";

const ul = (props) => {
  const { children }: { children: React.ReactNode } = props;

  return <UnorderedList {...props}>{children}</UnorderedList>;
};

export default ul;
