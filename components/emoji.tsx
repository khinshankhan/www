import { styled } from "lib/theme";
import type { Props } from "react-emoji-render";
import EmojioneV4 from "react-emoji-render";

export const EmojiStyled = styled(EmojioneV4, {
  img: {
    display: "inline-block",
  },
});

interface IEmojiProps extends Props {}
export const Emoji = (props: IEmojiProps) => (
  <EmojiStyled
    options={{
      protocol: "https",
      baseUrl: "//cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/",
      ext: "png",
      size: "",
    }}
    {...props}
  />
);

export default Emoji;
