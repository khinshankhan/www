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
- List items are tiny because they dont have p styling
  - some list items get wrapped in p
  - perhaps list item styling needs to be updated
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
