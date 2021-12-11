import React, { ReactNode } from "react";
import { ListItem } from "@chakra-ui/react";
import { fontSizes } from "constants/fonts";

interface ILiProps {
  children: ReactNode;
  [key: string]: any;
}

const li = ({ children, ...props }: ILiProps) => (
  <ListItem fontSize={fontSizes} {...props}>
    {children}
  </ListItem>
);

export default li;
