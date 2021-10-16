import React from "react";
import { Text } from "@chakra-ui/react";

const p = (props) => {
  const { children }: { children: React.ReactNode } = props;

  return (
    <Text variant="body" {...props}>
      {children}
    </Text>
  );
};

export default p;
