import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

interface IButtonProps {
  selected?: boolean;
  [key: string]: any;
}

const Button = ({ selected = false, ...props }: IButtonProps) => {
  // TODO: use theme variables once theme has been made
  if (selected) {
    return <ChakraButton {...props} bg={`#F40057`} />;
  }
  return <ChakraButton {...props} />;
};

export default Button;
