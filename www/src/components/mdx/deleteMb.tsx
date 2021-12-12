import React, { ReactNode } from "react";
import { chakra } from "@chakra-ui/react";

interface IDeleteMbProps {
  dmb?: string;
  children: ReactNode;
  [key: string]: any;
}

const deleteMb = ({ dmb = `-5`, children, ...props }: IDeleteMbProps) => (
  <chakra.div __css={{ marginBottom: dmb }} {...props}>
    {children}
  </chakra.div>
);

export default deleteMb;
