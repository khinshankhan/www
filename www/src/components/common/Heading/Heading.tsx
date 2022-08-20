import { ComponentWithAs, Heading as ChakraHeading } from "@chakra-ui/react";
import AnchorHeadings, { HeadingsAnchorTag } from "./AnchorHeadings";
import Headings, { HeadingsTag } from "./Headings";
import type { HeadingProps } from "./shared";
import { headingsOptions } from "./shared";

type HeadingType = ComponentWithAs<"h2", HeadingProps> & {
  [key: string]: HeadingsTag | HeadingsAnchorTag;
};

export const Heading = ChakraHeading as HeadingType;

headingsOptions.forEach((tag) => {
  Heading[tag] = Headings[tag];
  Heading[`${tag}Anchor`] = AnchorHeadings[tag];
});

export default Heading;
