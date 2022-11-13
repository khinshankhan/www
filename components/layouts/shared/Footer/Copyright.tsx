import React from "react";
import type { TextProps } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { metaConfig } from "contentlayer/generated";

const Copyright = (props: TextProps) => {
  const { startYear, fullname } = metaConfig;

  return (
    <Text align="center" {...props}>
      &copy; {startYear}+, {fullname}. All rights reserved.
    </Text>
  );
};

export default Copyright;
