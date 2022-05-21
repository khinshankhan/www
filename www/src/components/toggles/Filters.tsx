import React, { FC } from "react";
import { IconButtonProps, Center, IconButton } from "@chakra-ui/react";
import { GoKebabHorizontal as Meatballs, GoKebabVertical as Kebab } from "react-icons/go";

interface IToggleFilterOptionsProps extends Omit<IconButtonProps, "aria-label"> {
  "aria-label"?: string;
  isOpen: boolean;
}

export const ToggleFilterOptions: FC<IToggleFilterOptionsProps> = ({
  isOpen,
  size = 24,
  "aria-label": ariaLabel = `Open filters`,
  ...props
}) => {
  const Icon = isOpen ? Kebab : Meatballs;

  return (
    <IconButton
      variant="ghost"
      icon={
        <Center>
          <Icon size={size} />
        </Center>
      }
      aria-label={ariaLabel}
      {...props}
    />
  );
};

export default ToggleFilterOptions;
