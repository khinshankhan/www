import React, { Fragment, ReactNode } from "react";
import type { FlexProps } from "@chakra-ui/react";
import { Button, Heading, Flex, Link, Text } from "@chakra-ui/react";
import type { FooterSectionItem, FooterSocialItem } from "contentlayer/generated";
import { metaConfig } from "contentlayer/generated";
import type { FCC } from "lib/types/react";

interface ISectionProps extends FlexProps {
  items: {
    title: ReactNode;
    link: string;
  }[];
  innerFlexProps?: FlexProps;
}
const Section: FCC<ISectionProps> = ({ items, innerFlexProps = {}, children, ...props }) => (
  <Flex flexDirection="column" alignItems="flex-start" mb={{ base: 8, lg: 0 }} {...props}>
    {children}
    <Flex
      flexDirection={{ base: `row`, lg: `column` }}
      alignItems="flex-start"
      flexWrap={{ base: `wrap`, lg: `nowrap` }}
      w="100%"
      {...innerFlexProps}
    >
      {items.map((item) => (
        <Fragment key={item.link}>
          <Link mr={{ base: 2, lg: 0 }} p={1} href={item.link}>
            {item.title}
          </Link>
        </Fragment>
      ))}
    </Flex>
  </Flex>
);

const convertSectionItems = (items: FooterSectionItem[]) =>
  items.map(({ title, link }) => ({
    title: <Text>{title}</Text>,
    link,
  }));

const convertSocialItems = (items: FooterSocialItem[]) =>
  items.map(({ title, link }) => ({
    title: <Text casing="capitalize">{title}</Text>,
    link,
  }));

export const Navigation = () => {
  const { sections, socials } = metaConfig!.footer;

  return (
    <Flex
      flexDirection={{ base: `column`, lg: `row` }}
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <Section
        items={convertSocialItems(socials)}
        alignItems="center"
        innerFlexProps={{ alignItems: `center` }}
        order={{ base: 0, lg: sections.length }}
      >
        <Button borderRadius={20} p={{ base: 7, lg: 3 }} mb={{ base: 3, lg: 0 }}>
          <Heading as="p" variant="h6">
            Subscribe via RSS Feed
          </Heading>
        </Button>
      </Section>

      {sections.map(({ title, items }, i) => (
        <Section key={title} items={convertSectionItems(items)} order={{ base: i + 1, lg: i }}>
          <Heading as="p" variant="h4">
            {title}
          </Heading>
        </Section>
      ))}
    </Flex>
  );
};

export default Navigation;
