import React, { FC } from "react";
import { Card, Pill, PillGroup } from "src/components/blocks";

export const WritingCard: FC = ({ node, ...props }) => {
  const tagPills = (
    <PillGroup>
      {node.fields.tags.map((tag) => (
        <Pill
          key={tag}
          onClick={() => {
            console.log({ tag });
          }}
        >
          {tag}
        </Pill>
      ))}
    </PillGroup>
  );

  return (
    <Card
      href={node.fields.slug}
      {...props}
      title={node.frontmatter.title}
      middle={tagPills}
      body={node.excerpt}
    />
  );
};

export default WritingCard;
