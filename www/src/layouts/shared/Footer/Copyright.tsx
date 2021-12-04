import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

// TODO: source via site meta
const name = `Khinshan Khan`;
const startYear = 2017;
const currentYear = new Date().getFullYear();

const Copyright = (props: TextProps) => (
  <Text {...props}>
    &copy; {name} {startYear} {startYear !== currentYear && ` - ${currentYear}`}
  </Text>
);

export default Copyright;
