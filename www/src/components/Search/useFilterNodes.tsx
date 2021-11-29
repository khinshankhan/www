import { useEffect, Dispatch, SetStateAction } from "react";
import { useSearchInfo } from "src/contexts/SearchInfo";
import { IWritingNodeWrapper } from "src/queries/WritingNodes";

interface IUseFilterNodes {
  nodes: IWritingNodeWrapper[];
  setNodes: Dispatch<SetStateAction<IWritingNodeWrapper[]>>;
}

const useFilterNodes = ({ nodes, setNodes }: IUseFilterNodes) => {
  const { selectedTags } = useSearchInfo();

  useEffect(() => {
    let newNodes = nodes;

    if (selectedTags.size !== 0) {
      const tags = [...selectedTags];
      newNodes = nodes.filter((node) =>
        tags.every((tag) => node.node.fields.tags.includes(tag))
      );
    }

    setNodes(newNodes);
  }, [nodes, setNodes, selectedTags]);
};

export default useFilterNodes;
