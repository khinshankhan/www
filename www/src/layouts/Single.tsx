import React, { ReactNode } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { SearchInfoProvider } from "src/contexts/SearchInfo";
import Header from "./Shared/Header";

const Contexts = ({ children }: { children: ReactNode }) => (
  <SearchInfoProvider>{children}</SearchInfoProvider>
);

interface ISingleLayoutProps {
  children?: ReactNode;
}

const SingleLayout = ({ children }: ISingleLayoutProps): JSX.Element => (
  <Contexts>
    <Container>
      <Header />
    </Container>
    <Container>{children}</Container>
    <Container>
      <Flex as="footer" align="center" justify="center" color="gray.400">
        All Rights Reserved
      </Flex>
    </Container>
  </Contexts>
);

export default SingleLayout;
