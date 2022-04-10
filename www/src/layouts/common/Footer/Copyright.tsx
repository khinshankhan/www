import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

// TODO: source via site meta
const name = `Khinshan Khan`;
const startYear = 2017;

// TODO: add link to copyright page
const Copyright = (props: TextProps) => (
  <Text {...props}>
    &copy; {startYear}+, {name}. All rights reserved.
  </Text>
);

export default Copyright;
