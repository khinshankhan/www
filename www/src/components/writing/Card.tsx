import React from "react";
import { Card } from "src/components/blocks";

export const WritingCard = ({ node, ...props }) => (
  <Card href={node.fields.slug} {...props}>
    {node.frontmatter.title}
    {node.fields.tags.join(`,`)}
    {node.excerpt}
  </Card>
);

export default WritingCard;
