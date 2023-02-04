import { braidArrays } from "lib/utils/array";
import { extractEmoji } from "lib/utils/regex";
import Emoji from "components/emoji";

// subtitles aren't too fancy, one liner + possible emoji
export const emojiFauxRehype = (subtitle: string, jsx = true) => {
  const matches = [...subtitle.matchAll(extractEmoji)];

  const emptied = [...matches].reverse().reduce(
    (stored, match) => {
      const i = stored[0].lastIndexOf(match[1]);
      const before = stored[0].slice(0, i);
      const after = stored[0].slice(i + match[1].length);
      return [before, after, ...stored.slice(1)];
    },
    [subtitle]
  );

  const texts = jsx
    ? emptied.map((text, index) => (
        <span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: text }} />
      ))
    : emptied;

  const replaceWith = matches.map((match, index) =>
    jsx ? <Emoji key={`emoji-${index}`} text={match[2]} /> : match[2]
  );

  const braided = braidArrays(texts, replaceWith);
  return jsx ? braided : braided.join("");
};
