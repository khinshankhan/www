import React from "react";
import { chakra, Box, Container, Text, VStack } from "@chakra-ui/react";
import { Heading, BackButton } from "src/components/common";
import type { IBackButtonProps } from "src/components/common";
import { BaseLayout as Layout } from "src/components/layouts";
import type { IBaseLayoutProps } from "src/components/layouts";
import type { FCC } from "src/types/react";

interface IPageLayoutProps extends IBaseLayoutProps {
  title: string;
  taglines: string[];
  backInfo?: IBackButtonProps;
}

export const PageLayout: FCC<IPageLayoutProps> = ({
  title,
  taglines = [],
  children,
  backInfo = null,
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const showBackButton = backInfo !== null;

  return (
    <Layout {...props}>
      <Box pt={showBackButton ? 7 : 14} pb={12} className="sharedNavBg" mb={10}>
        <Container variant="page">
          {showBackButton && <BackButton pb={6} {...backInfo} />}
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
        </Container>
      </Box>
      <Container variant="page" pt={12} pb={12}>
        {children}
      </Container>
    </Layout>
  );
};

export default PageLayout;
