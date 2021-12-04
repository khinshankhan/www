import React from "react";
import { UnorderedList } from "@chakra-ui/react";

interface IUlProps {
  children: React.ReactNode;
  [key: string]: any;
}

const ul = ({ children, ...props }: IUlProps) => (
  <UnorderedList {...props}>{children}</UnorderedList>
);

export default ul;
