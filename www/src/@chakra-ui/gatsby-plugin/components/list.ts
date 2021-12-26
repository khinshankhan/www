import { fontSizes } from "constants/fonts";
import { listAnatomy as parts } from "@chakra-ui/anatomy";
import type { PartsStyleObject } from "@chakra-ui/theme-tools";

export interface IList {
  parts: typeof parts.keys;
  baseStyle: PartsStyleObject<typeof parts>;
}

const List: IList = {
  parts: parts.keys,
  baseStyle: {
    container: {
      listStylePosition: `inside`,
    },
    item: {
      fontSize: fontSizes,
    },
    icon: {
      marginEnd: `0.5rem`,
      display: `inline`,
      verticalAlign: `text-bottom`,
    },
  },
};

export default List;
