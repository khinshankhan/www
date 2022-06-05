import React, { FC } from "react";
import { ContainerProps, Container, chakra } from "@chakra-ui/react";
import { Header, Footer } from "./common";

export const BaseLayout: FC<ContainerProps> = ({
  minH = null,
  children,
  ...props
}): JSX.Element => {
  // TODO: utilize a proper formula instead of guess and check
  const minHeight = minH ?? { base: `76.5vh`, md: `80vh`, xl: `80.3vh`, "2xl": `81vh` };

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
