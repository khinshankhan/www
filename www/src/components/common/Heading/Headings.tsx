import React, { ReactNode } from "react";
import { Heading as ChakraHeading } from "@chakra-ui/react";
import { headingsOptions, HeadingsOptions } from "./shared";

export type IHeadingsTemplateProps = {
  children: ReactNode;
  [key: string]: any;
};

export type HeadingsTag = (props: IHeadingsTemplateProps) => JSX.Element;

/* eslint-disable indent */
const HeadingTemplate = (tag: HeadingsOptions) =>
  (({ children, ...props }) => (
    <ChakraHeading as={tag} variant={tag} {...props}>
      {children}
    </ChakraHeading>
  )) as HeadingsTag;

export const Headings = headingsOptions.reduce(
  (stored, curr) => ({
    ...stored,
    [curr]: HeadingTemplate(curr),
  }),
  {} as Record<HeadingsOptions, HeadingsTag>
);

export default Headings;
