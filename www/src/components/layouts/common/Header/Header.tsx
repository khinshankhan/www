import React from "react";
import { useMobile } from "src/hooks";
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
  const { isMobile } = useMobile();

  const HeaderComponent = isMobile ? MobileHeader : DesktopHeader;
  return <HeaderComponent items={MENU_ITEMS} />;
};

export default Header;
