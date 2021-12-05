import React, { ReactNode } from "react";
import { Heading as ChakraHeading } from "@chakra-ui/react";

const headingsOptions = [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`] as const;
const headingsSizes = [`2xl`, `xl`, `lg`, `md`, `sm`, `xs`] as const;
type HeadingsOptions = typeof headingsOptions[number];

type IHeadingTemplateProps = {
  /*   id: string; */
  children: ReactNode;
  [key: string]: any;
};

/* eslint-disable indent */
const HeadingTemplate =
  (tag: HeadingsOptions, index?: number) =>
  ({ children, ...props }: IHeadingTemplateProps): JSX.Element =>
    (
      <ChakraHeading as={tag} size={headingsSizes[index ?? 0]} {...props}>
        {children}
      </ChakraHeading>
    );

const Heading = headingsOptions.reduce(
  (stored, curr, index) => ({
    ...stored,
    [curr]: HeadingTemplate(curr, index),
  }),
  {} as Record<HeadingsOptions, (args: IHeadingTemplateProps) => JSX.Element>
);

export default Heading;
