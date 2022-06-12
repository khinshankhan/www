import React, { FC } from "react";
import { BoxProps, chakra, Box, Container, Text, VStack } from "@chakra-ui/react";
import { Heading } from "src/components/common";
import { BaseLayout as Layout } from "src/components/layouts";

interface IPageLayoutProps extends BoxProps {
  title: string;
  taglines: string[];
}

export const PageLayout: FC<IPageLayoutProps> = ({ title, taglines = [], children }) => (
  <Layout>
    <Container variant="page" pb={12}>
      <Box pt={16} pb={12}>
        <Heading.h1 align="center" fontFamily="title" pb={taglines.length === 0 ? 0 : 8}>
          {title}
        </Heading.h1>
        {taglines.length !== 0 && (
          <VStack>
            {taglines.map((tagline) => (
              <Text as={chakra.span} key={tagline}>
                {tagline}
              </Text>
            ))}
          </VStack>
        )}
      </Box>
      {children}
    </Container>
  </Layout>
);

export default PageLayout;
