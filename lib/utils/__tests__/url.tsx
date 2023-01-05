import { hasExtension, getExtension, isUrlFile, onSameOrigin, matchLink } from "../url";

// TODO: account for false positive cases
describe("url", () => {
  describe("hasExtension", () => {
    describe("has extension", () =>
      ["url.tsx", "https://google.com"].forEach((test) =>
        it(test, () => expect(hasExtension(test)).toBe(true))
      ));

    describe("does not have extension", () =>
      ["url", "https://google.com/hello"].forEach((test) =>
        it(test, () => expect(hasExtension(test)).toBe(false))
      ));
  });

  describe("getExtension", () => {
    [
      ["url.tsx", "tsx"],
      ["https://google.com", "com"],
    ].forEach(([test, ext]) => it(`${ext} -- ${test}`, () => expect(getExtension(test)).toBe(ext)));
  });

  describe("isUrlFile", () => {
    describe("is file", () =>
      ["https://hello.com/test.pdf", "/relative/file.pdf"].forEach((file) =>
        it(file, () => expect(isUrlFile(file)).toBe(true))
      ));

    describe("not file", () =>
      [
        "/",
        "/relative",
        "https://hello.com",
        "https://hello.com/",
        "https://hello.com/test.html",
      ].forEach((file) => it(file, () => expect(isUrlFile(file)).toBe(false))));

    // TODO: account for false positive cases
  });

  describe("onSameOrigin", () => {
    // TODO: make more tests based off mdn docs
    // https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

    const originUrl = "http://store.company.com/dir/page.html";
    describe("is same origin", () => {
      [
        "http://store.company.com/dir2/other.html",
        "http://store.company.com/dir/inner/another.html",
      ].forEach((destinationUrl) =>
        it(destinationUrl, () => expect(onSameOrigin(originUrl, destinationUrl)).toBe(true))
      );
    });

    describe("not same origin", () => {
      [
        "https://store.company.com/page.html",
        "http://store.company.com:81/dir/page.html",
        "http://news.company.com/dir/page.html",
      ].forEach((destinationUrl) =>
        it(destinationUrl, () => expect(onSameOrigin(originUrl, destinationUrl)).toBe(false))
      );
    });
  });

  describe("matchLink", () => {
    describe("fullPath", () => {
      it("pass", () =>
        expect(
          matchLink({
            link1: "https://hello.com/portfolio",
            link2: "https://hello.com/portfolio",
            fullPath: true,
            excludeParams: true,
          })
        ).toBe(true));
      it("fail", () =>
        expect(
          matchLink({
            link1: "https://hello.com/portfolio",
            link2: "https://hello.com/portfolio/anchorage",
            fullPath: true,
            excludeParams: true,
          })
        ).toBe(false));

      describe("excludeParams", () => {
        it("pass matching", () =>
          expect(
            matchLink({
              link1: "https://hello.com/portfolio?a=b",
              link2: "https://hello.com/portfolio?a=b",
              fullPath: true,
              excludeParams: false,
            })
          ).toBe(true));
        it("pass not matching", () =>
          expect(
            matchLink({
              link1: "https://hello.com/portfolio?a=b",
              link2: "https://hello.com/portfolio?a=b&c=d",
              fullPath: true,
              excludeParams: true,
            })
          ).toBe(true));
        it("fail", () =>
          expect(
            matchLink({
              link1: "https://hello.com/portfolio?a=b",
              link2: "https://hello.com/portfolio?a=b&c=d",
              fullPath: true,
              excludeParams: false,
            })
          ).toBe(false));
      });
    });

    describe("partiallyActive", () => {
      it("pass full", () =>
        expect(
          matchLink({
            link1: "https://hello.com/portfolio",
            link2: "https://hello.com/portfolio",
            fullPath: false,
            excludeParams: true,
          })
        ).toBe(true));
      it("pass partial", () =>
        expect(
          matchLink({
            link1: "https://hello.com/portfolio",
            link2: "https://hello.com/portfolio/anchorage",
            fullPath: false,
            excludeParams: true,
          })
        ).toBe(true));

      describe("excludeParams", () => {
        it("pass matching", () =>
          expect(
            matchLink({
              link1: "https://hello.com/portfolio?a=b",
              link2: "https://hello.com/portfolio/anchorage?a=b",
              fullPath: false,
              excludeParams: false,
            })
          ).toBe(true));
        it("pass not matching", () =>
          expect(
            matchLink({
              link1: "https://hello.com/portfolio?a=b",
              link2: "https://hello.com/portfolio?a=b&c=d",
              fullPath: false,
              excludeParams: true,
            })
          ).toBe(true));
        it("fail", () =>
          expect(
            matchLink({
              link1: "https://hello.com/portfolio?a=b",
              link2: "https://hello.com/portfolio/anchorage?a=b&c=d",
              fullPath: false,
              excludeParams: false,
            })
          ).toBe(false));
      });
    });
  });
});
