import { useEffect, Dispatch, SetStateAction } from "react";
import { useSearchInfo } from "src/contexts/SearchInfo";
import { ICleanedWritingNode } from "src/queries/WritingNodes";

interface IUseFilterNodes {
  nodes: ICleanedWritingNode[];
  setNodes: Dispatch<SetStateAction<ICleanedWritingNode[]>>;
}

const useFilterNodes = ({ nodes, setNodes }: IUseFilterNodes) => {
  const { selectedTags } = useSearchInfo();

  useEffect(() => {
    let newNodes = nodes;

    if (selectedTags.size !== 0) {
      const tags = [...selectedTags];
      newNodes = nodes.filter((node) =>
        tags.every((tag) => node.custom.tagsLookup.has(tag))
      );
    }

    setNodes(newNodes);
  }, [nodes, setNodes, selectedTags]);
};

export default useFilterNodes;
