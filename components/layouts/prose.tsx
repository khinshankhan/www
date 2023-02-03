import { FCC } from "types/react";
import React from "react";
import { PageSkeletonLayout as Layout } from "./page-skeleton";
import type { Computed } from "lib/contentlayer";
import { Box } from "components/primitives";
import { Toc } from "components/sidebars";

export const Prose: FCC<Computed> = ({ frontmatter, headings, children }) => {
  const { title, subtitle } = frontmatter;
  return (
    <Layout
      title={title}
      subtitle={subtitle}
      sidebar={<Toc headings={headings} />}
      direction="right"
    >
      <Box id="content">{children}</Box>
    </Layout>
  );
};

export default Prose;
