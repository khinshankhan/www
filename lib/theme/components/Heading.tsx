import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { CSS } from "@stitches/react";
import { Box } from "./Box";

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
// TODO: fix type for css
type CompatibleHeadingProps = Omit<HeadingProps, "ref"> | { css: CSS };

const headingsOptions = [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`] as const;
type HeadingsOptions = typeof headingsOptions[number];

type HeadingsTag = (props: CompatibleHeadingProps) => JSX.Element;

export const Heading = headingsOptions.reduce(
  (stored, current) => ({
    ...stored,
    [current]: (props: CompatibleHeadingProps) => (
      <Box as={current} className={current} {...props} />
    ),
  }),
  {} as Record<HeadingsOptions, HeadingsTag>
);

export default Heading;
