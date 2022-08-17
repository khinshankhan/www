import React from "react";
import { Flex } from "@chakra-ui/react";
import { BaseLayout as Layout, IBaseLayoutProps } from "src/components/layouts";
import type { FCC } from "src/types/react";

export const CenteredLayout: FCC<IBaseLayoutProps> = ({ children }) => (
  <Layout>
    <Flex
      justifyContent="center"
      align="center"
      pt={{ base: `12vh`, sm: `14vh` }}
      pb={{ base: 4, xs: 5 }}
    >
      {children}
    </Flex>
  </Layout>
);

export default CenteredLayout;
