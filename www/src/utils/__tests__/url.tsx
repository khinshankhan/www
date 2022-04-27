import { isUrlFile, onSameOrigin } from "../url";

describe(`url`, () => {
  describe(`isUrlFile`, () => {
    describe(`is file`, () =>
      [`https://hello.com/test.pdf`].forEach((file) =>
        it(file, () => expect(isUrlFile(file)).toBe(true))
      ));

    describe(`not file`, () =>
      [`/`, `https://hello.com`, `https://hello.com/`, `https://hello.com/test.html`].forEach(
        (file) => it(file, () => expect(isUrlFile(file)).toBe(false))
      ));

    // TODO: account for false positive cases
  });

  describe(`onSameOrigin`, () => {
    // TODO: make more tests based off mdn docs
    // https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

    const originUrl = `http://store.company.com/dir/page.html`;
    describe(`is same origin`, () => {
      [
        `http://store.company.com/dir2/other.html`,
        `http://store.company.com/dir/inner/another.html`,
      ].forEach((destinationUrl) =>
        it(destinationUrl, () => expect(onSameOrigin(originUrl, destinationUrl)).toBe(true))
      );
    });

    describe(`not same origin`, () => {
      [
        `https://store.company.com/page.html`,
        `http://store.company.com:81/dir/page.html`,
        `http://news.company.com/dir/page.html`,
      ].forEach((destinationUrl) =>
        it(destinationUrl, () => expect(onSameOrigin(originUrl, destinationUrl)).toBe(false))
      );
    });
  });
});
