import React, { useState } from "react";
import SearchInfoContext from "./SearchInfoContext";

type ISearchInfoProvider = {
  children: React.ReactNode;
};

const SearchInfoProvider = ({ children }: ISearchInfoProvider) => {
  const [store, setStore] = useState([] as string[]);

  const addToStore = (tag: string) => {
    if (!store.includes(tag)) {
      const newStore = [...store, tag];
      newStore.sort();
      setStore(newStore);
    }
  };
  const removeFromStore = (tag: string) => {
    setStore(store.filter((t) => t !== tag));
  };

  return (
    <SearchInfoContext.Provider value={{ store, addToStore, removeFromStore }}>
      {children}
    </SearchInfoContext.Provider>
  );
};

export default SearchInfoProvider;
