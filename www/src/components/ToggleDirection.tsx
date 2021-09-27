import React from "react";
import { IconButton } from "@chakra-ui/react";
import { MdFormatTextdirectionLToR as Direction } from "react-icons/md";
import useLocalStorage from "src/hooks/useLocalStorage";

interface IToggleDirectionProps {
  fontSize?: string;
}

const ToggleDirection = ({ fontSize = `1.563rem` }: IToggleDirectionProps) => {
  const [direction, setDirection] = useLocalStorage(`direction`, 0);

  // TODO
  const updateDirection = () => {
    const successful = setDirection((direction + 1) % 4);
    // eslint-disable-next-line no-console
    console.log({ successful });
  };

  // eslint-disable-next-line no-console
  console.log({ direction });

  return (
    <IconButton
      aria-label={`Change header position`}
      variant="ghost"
      onClick={updateDirection}
      icon={<Direction fontSize={fontSize} transform={`scale(1,1)`} />}
    />
  );
};

export default ToggleDirection;
