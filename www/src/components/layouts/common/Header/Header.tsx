import React from "react";
import { useMobile } from "src/hooks";
import DesktopHeader from "./Desktop";
import MobileHeader from "./Mobile";

// TODO: replace soon hrefs as features get built out
// TODO: replace this with a call to gatsby to get config based values
const MENU_ITEMS = [
  {
    title: `About`,
    href: `/soon`,
  },
  {
    title: `Writing`,
    href: `/writing`,
  },
  {
    title: `Portfolio`,
    href: `/soon`,
  },
  {
    title: `Contact`,
    href: `/soon`,
  },
];

export const Header = () => {
  const { isMobile } = useMobile();

  const HeaderComponent = isMobile ? MobileHeader : DesktopHeader;
  return (
    <HeaderComponent
      items={MENU_ITEMS}
      pos="sticky"
      backdropFilter="blur(8px)"
      top={0}
      zIndex="sticky"
      bg="bgAlpha"
    />
  );
};

export default Header;
