import React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import useMobile from "src/hooks/useMobile";
import DesktopNavbar from "./Desktop";
import MobileNavbar from "./Mobile";

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

export const Navbar = () => {
  const isMobile = useMobile();
  // TODO: make this a semantic token
  const dividerColor = useColorModeValue(`gray.200`, `white`);

  if (isMobile) return <MobileNavbar items={MENU_ITEMS} dividerColor={dividerColor} />;
  return <DesktopNavbar items={MENU_ITEMS} dividerColor={dividerColor} />;
};

export default Navbar;
