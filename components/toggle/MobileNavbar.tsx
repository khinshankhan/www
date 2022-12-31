import React from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

interface IToggleNavbarMenuProps {
  className?: string;
  isOpen?: boolean;
  onClick?: React.MouseEventHandler<SVGElement>;
}
export const ToggleNavbarMenu = ({
  className = "",
  isOpen,
  onClick = () => {},
}: IToggleNavbarMenuProps) => {
  const MenuIcon = isOpen ? Cross1Icon : HamburgerMenuIcon;
  const action = isOpen ? "Close" : "Open";

  return (
    <MenuIcon className={className} aria-label={`${action} navigation menu`} onClick={onClick} />
  );
};

export default ToggleNavbarMenu;
