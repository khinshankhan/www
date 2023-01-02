import { styled } from "lib/theme";
import type { Props } from "react-emoji-render";
import EmojioneV4 from "react-emoji-render";

export const EmojiStyled = styled(EmojioneV4, {});

interface IEmojiProps extends Props {}
const Emoji = (props: IEmojiProps) => (
  <EmojiStyled
    options={{
      protocol: "https",
      baseUrl: "//twemoji.maxcdn.com/2/",
      ext: "png",
      size: "72x72",
    }}
    {...props}
  />
);

export default Emoji;
