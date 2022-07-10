import React, { FC } from "react";
import { WritingCardNode } from "src/types/queries";

interface IWritingCardProps {
  node: WritingCardNode;
}

export const WritingCard: FC<IWritingCardProps> = ({
  node: {
    fields: { slug },
    frontmatter: { title, spoiler },
  },
}) => {
  const subtitle = spoiler ?? `A little surprise reading 😊`;

  return (
    <div>
      <p>{title}</p>
      <p style={{ marginLeft: 10 }}>{slug}</p>
      <p style={{ marginLeft: 10 }}>{subtitle}</p>
    </div>
  );
};

export default WritingCard;
