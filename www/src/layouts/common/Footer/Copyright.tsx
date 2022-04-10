import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

// TODO: source via site meta
const name = `Khinshan Khan`;
const startYear = 2017;
const currentYear = new Date().getFullYear();

// TODO: add link to copyright page
const Copyright = (props: TextProps) => (
  <Text {...props}>
    &copy; {startYear} {startYear !== currentYear && ` - ${currentYear}`} {name}. All rights
    reserved.
  </Text>
);

export default Copyright;
