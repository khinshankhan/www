import React, { ReactNode, useState, createContext, useContext } from "react";

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

  const updateSelectedTags = (tag: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (selectedTags.has(tag)) {
      newSelectedTags.delete(tag);
    } else {
      newSelectedTags.add(tag);
    }

    setSelectedTags(newSelectedTags);
  };

  return (
    <SearchInfoContext.Provider value={{ selectedTags, updateSelectedTags }}>
      {children}
    </SearchInfoContext.Provider>
  );
};
