import React from "react";
import { IconButton } from "@chakra-ui/react";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { GiHamburgerMenu as Hamburger } from "react-icons/gi";

interface IToggleNavbarMenuProps {
  fontSize: string;
  isOpen: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export const ToggleNavbarMenu = ({
  fontSize,
  isOpen,
  onClick = undefined,
}: IToggleNavbarMenuProps) => {
  const MenuIcon = isOpen ? CloseIcon : Hamburger;

  return (
    <IconButton
      aria-label={`Toggle Navigation`}
      onClick={onClick}
      variant="ghost"
      icon={<MenuIcon fontSize={fontSize} />}
    />
  );
};

export default ToggleNavbarMenu;
