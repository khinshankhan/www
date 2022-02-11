import React, { ReactNode } from "react";
import { ListItem } from "@chakra-ui/react";

interface ILiProps {
  children: ReactNode;
  [key: string]: any;
}

const li = (props: ILiProps) => <ListItem {...props} />;

export default li;
