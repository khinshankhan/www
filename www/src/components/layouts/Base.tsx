import React, { FC } from "react";
import { ContainerProps, Container, chakra } from "@chakra-ui/react";
import { Header, Footer } from "./common";

export const BaseLayout: FC<ContainerProps> = ({
  minH = null,
  children,
  ...props
}): JSX.Element => {
  const minHeight = minH ?? { base: `70vh`, md: `75vh` };

  return (
    <chakra.div id="page">
      <Header />
      <Container id="content" variant="page" minH={minHeight} {...props}>
        {children}
      </Container>
      <Footer />
    </chakra.div>
  );
};

export default BaseLayout;
