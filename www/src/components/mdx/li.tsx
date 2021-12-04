import React from "react";
import { ListItem } from "@chakra-ui/react";
import { fontSizes } from "src/constants/fonts";

interface ILiProps {
  children: React.ReactNode;
  [key: string]: any;
}

const li = ({ children, ...props }: ILiProps) => (
  <ListItem fontSize={fontSizes} {...props}>
    {children}
  </ListItem>
);

export default li;
