import React, { ReactNode } from "react";
import { Container, chakra } from "@chakra-ui/react";
import { Header, Footer } from "./shared";

interface ISingleLayoutProps {
  children?: ReactNode;
}

const SingleLayout = ({ children }: ISingleLayoutProps): JSX.Element => (
  <chakra.div id="page">
    <Container minH="74vh" id="content">
      <Header />
      {children}
    </Container>
    <Footer />
  </chakra.div>
);

export default SingleLayout;
