import { emojiFauxRehype } from "../emoji";

describe("emoji", () => {
  describe("emojiFauxRehype", () => {
    [
      [
        `Hello there <Emoji text=":smiley_face:" /> and <Emoji text=":waving_hand:" />fin`,
        `Hello there :smiley_face: and :waving_hand:fin`,
      ],
    ].forEach(([test, exp]) => it(`${test}`, () => expect(emojiFauxRehype(test, false)).toBe(exp)));
  });
});
