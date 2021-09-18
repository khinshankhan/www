import React from "react";
import { IconButton } from "@chakra-ui/react";
import { MdFormatTextdirectionLToR as Direction } from "react-icons/md";
import useLocalStorage from "src/hooks/useLocalStorage";

const ToggleDirection = () => {
  const [direction, setDirection] = useLocalStorage(`direction`, 0);

  const updateDirection = () => {
    const successful = setDirection((direction + 1) % 4);
    console.log({ successful });
  };

  console.log({ direction });

  return (
    <IconButton
      aria-label={`Change header position`}
      variant="ghost"
      onClick={updateDirection}
      icon={<Direction fontSize="1.25rem" transform={`scale(1,1)`} />}
    />
  );
};

export default ToggleDirection;
