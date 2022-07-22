---
title: Agea Example
spoiler: This is a md component test from

planted: "2022-07-02"
tended: "2022-07-03"

categories: ["test"]
tags: ["agea"]
---

This test is from https://agea.github.io/tutorial.md

---

<h2 as="h3">Notes:</h2>

- First paragraph's fancy lettering break the next paragraph if sufficient space isn't given.
  - a thematic break seems to work for sizes sm+
- links are okay, icons are a bit off
  - mailtos shouldnt have an icon
  - wonder if md can be excepted -> could specify explicitly
- images need a component
  - should I use https://www.joshwcomeau.com/css/full-bleed/

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

1) or start
1) again

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
