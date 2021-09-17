import React from "react";
import useMobile from "src/hooks/useMobile";
import Desktop from "./Desktop";

const Header = (): JSX.Element => {
  const mobilep = useMobile();

  if (mobilep) return <>mobile</>;
  return <Desktop />;
};

export default Header;
