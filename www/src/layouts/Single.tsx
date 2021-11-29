import React, { ReactNode } from "react";
import { Container, Flex } from "@chakra-ui/react";
import Header from "./Shared/Header";

interface ISingleLayoutProps {
  children?: ReactNode;
}

const SingleLayout = ({ children }: ISingleLayoutProps): JSX.Element => (
  <>
    <Container>
      <Header />
    </Container>
    <Container>{children}</Container>
    <Container>
      <Flex as="footer" align="center" justify="center" color="gray.400">
        All Rights Reserved
      </Flex>
    </Container>
  </>
);

export default SingleLayout;
