import React, { FC } from "react";
import { BoxProps, Flex } from "@chakra-ui/react";
import { BaseLayout as Layout } from "src/components/layouts";

export const CenteredLayout: FC<BoxProps> = ({ children }) => (
  <Layout>
    <Flex
      justifyContent="center"
      align="center"
      pt={{ base: `10vh`, sm: `12vh` }}
      pb={{ base: 4, xs: 5 }}
    >
      {children}
    </Flex>
  </Layout>
);

export default CenteredLayout;
