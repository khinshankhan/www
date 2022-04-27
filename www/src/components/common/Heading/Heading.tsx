import { ComponentWithAs, HeadingProps, Heading as ChakraHeading } from "@chakra-ui/react";
import HeadingAnchor, { HeadingsAnchorTag } from "./HeadingAnchor";
import Headings, { HeadingsTag } from "./Headings";

type HeadingType = ComponentWithAs<"h2", HeadingProps> & {
  [key: string]: HeadingsTag | HeadingsAnchorTag;
};
const Heading = ChakraHeading as HeadingType;
Object.entries(Headings).forEach(([tag, Fn]) => {
  Heading[tag] = Fn;
  Heading[`${tag}Anchor`] = HeadingAnchor(Fn);
});

export default Heading;
