import { createContext } from "react";

type ISearchInfoState = {
  store: string[];
  addToStore: (tag: string) => void;
  removeFromStore: (tag: string) => void;
};

const initalState: ISearchInfoState = {
  store: [],
  addToStore: () => {},
  removeFromStore: () => {},
};

const SearchInfoContext = createContext(initalState);

export default SearchInfoContext;
