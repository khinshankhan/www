import React from "react";
import { ListItem } from "@chakra-ui/react";
import { fontSizes } from "src/constants/fonts";

const li = (props) => {
  const { children }: { children: React.ReactNode } = props;

  return (
    <ListItem fontSize={fontSizes} {...props}>
      {children}
    </ListItem>
  );
};

export default li;
