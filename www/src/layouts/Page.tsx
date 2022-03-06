import React, { ReactNode } from "react";
import { Container, chakra } from "@chakra-ui/react";

interface ISingleLayoutProps {
  children?: ReactNode;
}

const Page = ({ children }: ISingleLayoutProps): JSX.Element => (
  <chakra.div id="page">
    <Container minH="74vh" id="content">
      {children}
    </Container>
  </chakra.div>
);

export default Page;
