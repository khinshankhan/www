import React, { ReactNode } from "react";
import { Container, chakra } from "@chakra-ui/react";
import { Header, Footer } from "./common";

interface ISingleLayoutProps {
  children?: ReactNode;
}
const Page = ({ children }: ISingleLayoutProps): JSX.Element => (
  <chakra.div id="page">
    <Header />
    <Container variant="page" minH="74vh" id="content">
      {children}
    </Container>
    <Footer />
  </chakra.div>
);

export default Page;
