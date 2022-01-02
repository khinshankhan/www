import React, { ReactNode, useState, createContext, useContext, useMemo, useCallback } from "react";

type ISearchInfoState = {
  selectedTags: Set<string>;
  updateSelectedTags: (tag: string) => void;
};

const initalState: ISearchInfoState = {
  selectedTags: new Set(),
  updateSelectedTags: () => {},
};

const SearchInfoContext = createContext(initalState);
export const useSearchInfo = () => useContext(SearchInfoContext);

type ISearchInfoProvider = {
  children: ReactNode;
};

export const SearchInfoProvider = ({ children }: ISearchInfoProvider) => {
  const [selectedTags, setSelectedTags] = useState(new Set() as Set<string>);

  // NOTE: not really confident about memoization here
  // using linting to create this, but it'll need to be revisited later
  const memoizedUpdateSelectedTags = useCallback(
    (tag: string) => {
      const newSelectedTags = new Set(selectedTags);
      if (selectedTags.has(tag)) {
        newSelectedTags.delete(tag);
      } else {
        newSelectedTags.add(tag);
      }

      setSelectedTags(newSelectedTags);
    },
    [selectedTags, setSelectedTags]
  );

  const value = useMemo(
    () => ({ selectedTags, updateSelectedTags: memoizedUpdateSelectedTags }),
    [selectedTags, memoizedUpdateSelectedTags]
  );

  return <SearchInfoContext.Provider value={value}>{children}</SearchInfoContext.Provider>;
};
