---
title: First
spoiler: This is a small spoiler to replace excerpt.
cover:
  src:
  alt: testing no src

planted: "2022-07-01"
tended: "2022-07-23"

categories: ["1cat"]
tags: ["1tag"]
---

This page intentionally left [blank](https://google.com).

This shows a bug of weird spacing with links.

This is _`inline code`_ here.

I can highlight `css±.some-class { background-color: red }` with CSS syntax.

And this is a block --

```jsx:h=1
function add(...args) {
  return args.reduce((sum, addend) => (sum+= addend), 0)
}
```

```diff-js
-function add(...args) {
+const add = (...args) =>
  args.reduce((sum, addend) => (sum+= addend), 0)
-}
```

```diff-js:h=1
-function add(...args) {
+  const add = (...args) =>
  args.reduce((sum, addend) => (sum+= addend), 0)
-}
```
