import React, { ReactNode } from "react";
import { ListItem as ChakraListItem } from "@chakra-ui/react";
import { fontSizes } from "src/constants/fonts";

export interface IListItemProps {
  children: ReactNode;
  [key: string]: any;
}

const ListItem = ({ children, ...props }: IListItemProps) => (
  <ChakraListItem fontSize={fontSizes} {...props}>
    {children}
  </ChakraListItem>
);

export default ListItem;
