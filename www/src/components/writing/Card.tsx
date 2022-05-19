import React from "react";
import { Card, Pill, PillGroup } from "src/components/blocks";

export const WritingCard = ({ node, ...props }) => (
  <Card href={node.fields.slug} {...props}>
    {node.frontmatter.title}
    <PillGroup>
      {node.fields.tags.map((tag) => (
        <Pill key={tag} zIndex={0}>
          {tag}
        </Pill>
      ))}
    </PillGroup>
    {node.excerpt}
  </Card>
);

export default WritingCard;
