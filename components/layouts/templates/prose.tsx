import { FCC } from "types/react";
import React from "react";
import { PageSkeletonLayout as Layout } from "../page-skeleton";
import type { Computed } from "lib/contentlayer";
import { Box } from "components/primitives";
import { Toc } from "components/sidebars";
import { emojiFauxRehype } from "components/mdx";

export const Prose: FCC<Computed> = ({ frontmatter, headings, children }) => {
  const { title, subtitle } = frontmatter;

  return (
    <Layout
      title={title}
      subtitle={emojiFauxRehype(subtitle, true)}
      sidebar={<Toc headings={headings} />}
      direction="right"
    >
      <Box id="content">{children}</Box>
    </Layout>
  );
};

export default Prose;
