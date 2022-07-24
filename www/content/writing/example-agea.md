---
title: Agea Example
spoiler: This is a md component test from

planted: "2022-07-02"
tended: "2022-07-03"

categories: ["test"]
tags: ["agea"]
---

This test is from https://agea.github.io/tutorial.md

<h2 as="h3">Notes:</h2>

- images need a component
  - should I use https://www.joshwcomeau.com/css/full-bleed/
- pre/ codeblocks + code need styling

And the actual test:

## Introduction

Markdown is a markup language designed to be simple enough to let anyone write structured documents without the need of a visual editor

I **strongly** encourage you to change the source of the various parts to see what happens (the output will change as you type)

## Basic styles

With this markup you can obtain _simple emhpasis_ (usually rendered in italic text), **strong emphasis** (usually rendered in bold text), `source code` text (usually rendered in monospaced text), or ~~strikethrough~~ text (usually rendered with a line through text).

You may use also _this_ or **this** notation to emphatize text, and you can use all them _**`together`**_ (and you can mix `*` and `_` )

If you look at the source code you may note that
even
if
you
break
the
lines,
the text is kept together
in a single paragraph

Paragraphs are delimited by blank lines, leading and trailing spaces are removed

You may force a line break with two spaces
or with a `\`\
at the end of the line

## Links

- You can insert links in text like [this](/tutorial.md)

- You may add a [title](https://agea.github.io/tutorial.md "Markdown Tutorial") to your link (can you see the tooltip?)

- If your link contains spaces you have to write the [link](<http://example.com/a space>) between `<>`

- You can use spaces and markup inside the [link **text**](https://agea.github.io/tutorial.md)

- Long links may decrease source readability, so it's posible to define all links somewhere in the document (the end is a good place) and just reference the [link][tutorial.md], you may also collapse the reference if it matches the link text (example: [tutorial.md][])

- You may also write directly the link: <https://agea.github.io/tutorial.md>

- It will work also for email addresses: <email@example.com> (you may write vaild email links also using [mailto](mailto:email@example.com) as protocol)

[tutorial.md]: https://agea.github.io/tutorial.md

## Images

Syntax for images is like the syntax for links, but with a `!` before:

![alt text](https://agea.github.io/tutorial.md/img/1.png "image title")

![](https://agea.github.io/tutorial.md/img/2.png)

![ref]

[ref]: https://agea.github.io/tutorial.md/img/3.png

## Lists

To define a list of items, just put a `*`, a `-`, or a `+` at the start of the line of each item of the list followed by at least a space, to end the list, leave a blank line

- red
- green
- blue

* white
* grey
* black

- yellow
- pink
- orange

You can also define numbered list, putting a number followed by a `.` or a `)` and a space at the start of the line (you may use any number, the first one is taken to start counting, then it will increment by one):

3.
4. you may leave blank items

5. or start
6. again

You can insert any block inside a list, you have to respect the indentation of the text of the list item

- A _paragraph_ of text
  (spanning multiple lines),

  ```
  fenced code,
  ```

      indented code (4 spaces + 2 spaces for the list
      indentation, one blank line above, one below),

  > quotes,

  - another
    - list
      - (and so on...),
  - ### or headers

## Headers

There are two ways to define headers:

# The biggest possible header

# You can also use this markup

(I prefer the first one as it's more readable when looking directly at the source code)

## A sub heading

## This is the alternative format

### Then you can go smaller

#### And smaller

##### And even smaller

###### No, you can't go smaller than this

The good thing is that many tools that convert Markdown in HTML or PDF are able to generate the index of your document, or links to the headers automatically (like Github does on the [source](http://git.io/vfz98) of Markdown files)

## Horizontal rules

You can use horizontal rules to separate paragraphs: you may use three or more `*`

---

or three or more `_` (you may insert spaces before, after or between the characters, no other charachters are allowed)

---

or three (or more) `-`

---

but you have to be careful as it is similar to the header syntax, so if you write `---` immediatly after a single line of text you get an header, either you have to leave a blank line before the `---`, or you put it after multiple lines of text

## Source code

If you have to insert code in your document you have three choices:

1.  inline code like this: `*Hello* **world!**"`
2.  fenced code blocks (you may use ` ``` ` or `~~~`
    as delimiters):

```markdown
_Hello_ **world!**
```

3.  indented code blocks

    _Hello_

    **world!**

You need to leave a blank linke after a paragraph and 2 blank lines after a list to start an indented code block (if you want the code to be out of the list), and you may insert the name of the language immediatly after the opening code fence (so some renderers may be able to highlight the syntax of the language)

---

This is `an inline` test here.

These are some codeblock tests

```javascript
const add = (...args) => args.reduce((sum, addend) => (sum += addend), 0);
```

```js{3,4}
const add = (...args) => args.reduce((sum, addend) => (sum += addend), 0);

console.log(add(2, 3))
console.log(add(4, 5))
```

```diff-javascript
+const add = (...args) => args.reduce((sum, addend) => (sum += addend), 0);
-console.log(add(2, 3))
-console.log(add(4, 5))
```
