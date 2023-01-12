import React from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { IconButton } from "components/primitives";

interface IToggleNavbarMenuProps {
  className?: string;
  isOpen?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export const ToggleNavbarMenu = ({
  className = "",
  isOpen,
  onClick = () => {},
}: IToggleNavbarMenuProps) => {
  const MenuIcon = isOpen ? Cross1Icon : HamburgerMenuIcon;
  const action = isOpen ? "Close" : "Open";

  return (
    <IconButton className={className} aria-label={`${action} navigation menu`} onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
};

export default ToggleNavbarMenu;
