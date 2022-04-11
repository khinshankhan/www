import React, { ReactNode } from "react";
import { ComponentWithAs, HeadingProps, Heading as ChakraHeading } from "@chakra-ui/react";

const headingsOptions = [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`] as const;
type HeadingsOptions = typeof headingsOptions[number];

type IHeadingTemplateProps = {
  children: ReactNode;
  [key: string]: any;
};

/* eslint-disable indent */
const HeadingTemplate =
  (tag: HeadingsOptions) =>
  ({ children, ...props }: IHeadingTemplateProps): JSX.Element =>
    (
      <ChakraHeading as={tag} variant={tag} {...props}>
        {children}
      </ChakraHeading>
    );

const Headings = headingsOptions.reduce(
  (stored, curr) => ({
    ...stored,
    [curr]: HeadingTemplate(curr),
  }),
  {} as Record<HeadingsOptions, (args: IHeadingTemplateProps) => JSX.Element>
);

type HeadingType = ComponentWithAs<"h2", HeadingProps> & {
  [key: string]: (props: IHeadingTemplateProps) => JSX.Element;
};

const Heading = ChakraHeading as HeadingType;
Object.entries(Headings).forEach(([tag, fn]) => {
  Heading[tag] = fn;
});

export default Heading;
