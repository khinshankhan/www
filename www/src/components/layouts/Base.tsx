import React, { ReactNode } from "react";
import { Container, chakra } from "@chakra-ui/react";
import { Header, Footer } from "./common";

interface IBaseLayoutProps {
  // TODO: look into better type for this
  minH?: string | (string | null)[] | { [key: string]: string } | null;
  children?: ReactNode;
}

const BaseLayout = ({ minH = null, children }: IBaseLayoutProps): JSX.Element => {
  const minHeight = minH ?? { base: `70vh`, md: `75vh` };

  return (
    <chakra.div id="page">
      <Header />
      <Container variant="page" minH={minHeight} id="content">
        {children}
      </Container>
      <Footer />
    </chakra.div>
  );
};

export default BaseLayout;
