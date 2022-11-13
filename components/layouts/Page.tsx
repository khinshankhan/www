import React from "react";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import type { FCC } from "lib/types/react";
import { Header } from "./shared";

export interface IPageLayoutProps {
  title: string;
  subtitle?: string;
}

export const PageLayout: FCC<IPageLayoutProps> = ({ title, subtitle = null, children }) => (
  <>
    <Flex direction="column" minH="96vh">
      <Header />
      <Box pt={14} pb={12} position="relative" mb={10} zIndex={1}>
        <Container variant="page" centerContent>
          <Heading as="h1" variant="h1" fontFamily="title" pb={subtitle ? 0 : 8}>
            {title}
          </Heading>
          {subtitle && <Text>{subtitle}</Text>}
        </Container>
      </Box>
      <Container variant="page">{children}</Container>
    </Flex>
    <Container variant="page">Footer</Container>
  </>
);

export default PageLayout;
