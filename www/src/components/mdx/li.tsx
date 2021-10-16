import React from "react";
import { ListItem } from "@chakra-ui/react";

const li = (props) => {
  const { children }: { children: React.ReactNode } = props;

  return <ListItem {...props}>{children}</ListItem>;
};

export default li;
