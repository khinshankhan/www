import React, { ReactNode } from "react";
import { Heading as ChakraHeading } from "@chakra-ui/react";
import type { HeadingProps, HeadingsOptions } from "./shared";
import { headingsOptions } from "./shared";

export interface IHeadingsTemplateProps extends HeadingProps {
  children: ReactNode;
}

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
