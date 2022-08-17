import { listAnatomy as parts } from "@chakra-ui/anatomy";
import type { PartsStyleObject, SystemStyleObject } from "@chakra-ui/styled-system";
import Text from "./text";

const baseStyleIcon: SystemStyleObject = {
  marginEnd: `0.5rem`,
  display: `inline`,
  verticalAlign: `text-bottom`,
};

const baseStyle: PartsStyleObject<typeof parts> = {
  container: {},
  item: {
    ...Text.baseStyle,
  },
  icon: baseStyleIcon,
};

const List = {
  parts: parts.keys,
  baseStyle,
};

export default List;
