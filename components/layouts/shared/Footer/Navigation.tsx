import React, { Fragment } from "react";
import { Heading, Flex, Link, Text } from "@chakra-ui/react";
import type { FooterSectionItem } from "contentlayer/generated";
import { metaConfig } from "contentlayer/generated";
import type { FCC } from "lib/types/react";

interface ISectionProps {
  items: FooterSectionItem[];
}
const Section: FCC<ISectionProps> = ({ items, children }) => (
  <Flex flexDirection="column" alignItems="flex-start" mb={{ base: 8, lg: 0 }}>
    {children}
    <Flex
      flexDirection={{ base: `row`, lg: `column` }}
      alignItems="flex-start"
      flexWrap={{ base: `wrap`, lg: `nowrap` }}
      w="100%"
    >
      {items.map((item) => (
        <Fragment key={item.link}>
          <Link mr={{ base: 2, lg: 0 }} p={1} href={item.link}>
            <Text>{item.title}</Text>
          </Link>
        </Fragment>
      ))}
    </Flex>
  </Flex>
);

export const Navigation = () => {
  const { sections } = metaConfig!.footer;
  return (
    <Flex
      flexDirection={{ base: `column`, lg: `row` }}
      flexWrap="wrap"
      justifyContent="space-between"
    >
      {sections.map(({ title, items }) => (
        <Section key={title} items={items}>
          <Heading as="p" variant="h4">
            {title}
          </Heading>
        </Section>
      ))}
    </Flex>
  );
};

export default Navigation;
