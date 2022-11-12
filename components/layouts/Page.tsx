import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import type { FCC } from "lib/types/react";
import { Header } from "./shared";

export interface IPageLayoutProps {}

export const PageLayout: FCC<IPageLayoutProps> = ({ children }) => (
  <>
    <Flex direction="column" minH="96vh">
      <Header />
      <Container>{children}</Container>
    </Flex>
    <Container variant="page">Footer</Container>
  </>
);

export default PageLayout;
