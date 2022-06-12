import React, { FC } from "react";
import { Text, TextProps } from "@chakra-ui/react";

interface ICopyrightProps extends TextProps {
  name: string;
  year: number;
}

// TODO: add link to copyright page
const Copyright: FC<ICopyrightProps> = ({ name, year, ...props }) => (
  <Text align="center" {...props}>
    &copy; {year}+, {name}. All rights reserved.
  </Text>
);

export default Copyright;
