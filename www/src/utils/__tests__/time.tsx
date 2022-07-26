import { isDateClose } from "../time";

describe(`time`, () => {
  describe(`isDateClose`, () => {
    const benchmarkDate = new Date(`2022-01-05`);

    describe(`much greater`, () =>
      [`2022-01-10`].forEach((day) =>
        it(day, () => expect(isDateClose(new Date(day), benchmarkDate, 72)).toBe(false))
      ));

    describe(`much less`, () =>
      [`2022-01-01`].forEach((day) =>
        it(day, () => expect(isDateClose(new Date(day), benchmarkDate, 72)).toBe(false))
      ));

    describe(`close`, () =>
      [`2022-01-04`, `2022-01-05`, `2022-01-06`].forEach((day) =>
        it(day, () => expect(isDateClose(new Date(day), benchmarkDate, 72)).toBe(true))
      ));
  });
});
