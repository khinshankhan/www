import React from "react";
import { Heading } from "@chakra-ui/react";

const headingsOptions = [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`] as const;
const headingsSizes = [`2xl`, `xl`, `lg`, `md`, `sm`, `xs`] as const;
type HeadingsOptions = typeof headingsOptions[number];

type IHeadingTemplateProps = {
  /*   id: string; */
  children: React.ReactNode;
};

/* eslint-disable indent */
const HeadingTemplate =
  (tag: HeadingsOptions, index?: number) =>
  (props: IHeadingTemplateProps): JSX.Element => {
    const { children } = props;
    return (
      <Heading as={tag} size={headingsSizes[index ?? 0]} {...props}>
        {children}
      </Heading>
    );
  };

const headings = headingsOptions.reduce(
  (stored, curr, index) => ({
    ...stored,
    [curr]: HeadingTemplate(curr, index),
  }),
  {} as Record<HeadingsOptions, (args: IHeadingTemplateProps) => JSX.Element>
);

export default headings;
