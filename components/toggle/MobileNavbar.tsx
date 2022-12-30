import React from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

interface IToggleNavbarMenuProps {
  isOpen?: boolean;
  onClick?: React.MouseEventHandler<SVGElement>;
}
export const ToggleNavbarMenu = ({ isOpen, onClick = () => {} }: IToggleNavbarMenuProps) => {
  const MenuIcon = isOpen ? Cross1Icon : HamburgerMenuIcon;
  const action = isOpen ? "Close" : "Open";

  return <MenuIcon aria-label={`${action} navigation menu`} onClick={onClick} />;
};

export default ToggleNavbarMenu;
