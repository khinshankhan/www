import React, { FC } from "react";
import { Card, Pill, PillGroup } from "src/components/blocks";
import type { WritingNode } from "src/queries/writing";

interface IWritingCardProps {
  node: WritingNode;
  // TODO: move this out
  tags: { [key: string]: boolean };
  toggle: (tag: string) => void;
}

export const WritingCard: FC<IWritingCardProps> = ({ node, tags, toggle, ...props }) => {
  const tagPills = (
    <PillGroup>
      {node.fields.tags.map((tag) => (
        <Pill key={tag} onClick={() => toggle(tag)} selected={tags[tag]}>
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
