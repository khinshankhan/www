import React from "react";
import { IWritingNodeWrapper } from "src/queries/WritingNodes";
import ListItem from "./ListItem";

type IWritingListProps = {
  nodes: IWritingNodeWrapper[];
};

const WritingList = ({ nodes }: IWritingListProps) => (
  <>
    {nodes.map((node) => (
      <ListItem key={node.node.id} node={node.node} />
    ))}
  </>
);

export default WritingList;
