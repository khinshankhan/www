import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FaCookie as Cookie } from "react-icons/fa";

export const TogglePolicyMenu = () => (
  <IconButton aria-label={`View storage policy`} variant="ghost" icon={<Cookie />} />
);

export default TogglePolicyMenu;
