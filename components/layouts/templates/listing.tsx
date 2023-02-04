import { FCC } from "types/react";
import React from "react";
import { PageSkeletonLayout as Layout } from "../page-skeleton";
import { Box } from "components/primitives";
import { emojiFauxRehype } from "components/mdx";

interface IListingProps {
  title: string;
  subtitle: string;
}

export const Listing: FCC<IListingProps> = ({ title, subtitle, children }) => {
  return (
    <Layout
      title={title}
      subtitle={emojiFauxRehype(subtitle, true)}
      sidebar={null}
      direction="left"
    >
      <Box id="content">{children}</Box>
    </Layout>
  );
};

export default Listing;
