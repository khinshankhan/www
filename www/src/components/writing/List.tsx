import React from "react";
import { ICleanedWritingNode } from "src/queries/WritingNodes";
import ListItem from "./ListItem";

type IWritingListProps = {
  nodes: ICleanedWritingNode[];
};

const WritingList = ({ nodes }: IWritingListProps) => (
  <>
    {nodes.map((node) => (
      <ListItem key={node.id} node={node} />
    ))}
  </>
);

export default WritingList;
