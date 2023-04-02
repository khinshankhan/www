import { getExtension, hasExtension, isUrlFile } from "../url"

// TODO: account for false positive cases
describe("url", () => {
  describe("hasExtension", () => {
    describe("has extension", () =>
      ["url.tsx", "https://google.com"].forEach((test) =>
        it(test, () => expect(hasExtension(test)).toBe(true))
      ))

    describe("does not have extension", () =>
      ["url", "https://google.com/hello"].forEach((test) =>
        it(test, () => expect(hasExtension(test)).toBe(false))
      ))
  })

  describe("getExtension", () =>
    (
      [
        ["url.tsx", "tsx"],
        ["https://google.com", "com"],
      ] satisfies [string, string][]
    ).forEach(([test, ext]) => it(`${ext} -- ${test}`, () => expect(getExtension(test)).toBe(ext))))

  describe("isUrlFile", () => {
    describe("is file", () =>
      ["https://hello.com/test.pdf", "/relative/file.pdf"].forEach((file) =>
        it(file, () => expect(isUrlFile(file)).toBe(true))
      ))

    describe("not file", () =>
      [
        "/",
        "/relative",
        "https://hello.com",
        "https://hello.com/",
        "https://hello.com/test.html",
      ].forEach((file) => it(file, () => expect(isUrlFile(file)).toBe(false))))
  })
})
