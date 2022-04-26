import React from "react";
import useMobile from "src/hooks/useMobile";
import DesktopHeader from "./Desktop";
import MobileHeader from "./Mobile";

// TODO: replace this with a call to gatsby to get config based values
const MENU_ITEMS = [
  {
    title: `About`,
    href: `/about`,
  },
  {
    title: `Writing`,
    href: `/writing`,
  },
  {
    title: `Portfolio`,
    href: `/portfolio`,
  },
  {
    title: `Contact`,
    href: `/contact`,
  },
];

export const Header = () => {
  const isMobile = useMobile();
  // TODO: make this a semantic token

  if (isMobile) return <MobileHeader items={MENU_ITEMS} />;
  return <DesktopHeader items={MENU_ITEMS} />;
};

export default Header;
