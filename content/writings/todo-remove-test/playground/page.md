---
title: Playground
subtitle: Where Things are Perfectly Broken
dateCreated: 2017-05-01
datePublished: 2017-05-01
dateModified: 2024-05-01
description: This is some description that's far too long to fit in one line when listed on a page.
---

Hello there. This is where experiments sprout and blossom. Some even become features! Or they may become bugs that then
become features. Or they... well yea, stuff happens.

Ctr-f `TODO` to quickly find things I'm working on implementation. Likely in order of top to bottom.

### Images

<figure>
  <img alt="Pretty" src="https://wallpaperaccess.com/full/6788153.jpg" width="3840" height="2160" />

  <figcaption>Pretty but slow to load</figcaption>
</figure>

<figure>
  <img
    alt="Stuffs"
    src="https://media1.tenor.com/m/R3H7o7xRfUMAAAAC/it%27s-saturday.gif"
    width="260px"
    height="401px"
  />

  <figcaption>Stuffs</figcaption>
</figure>

<figure>
  <img
    alt="Saturday Vibes"
    src="https://media1.tenor.com/m/iGSIl1am6BMAAAAC/fat-albert-saturday.gif"
    width="498px"
    height="381px"
  />

  <figcaption>Saturday Vibes [(from Tenor)](https://tenor.com/view/fat-albert-saturday-gif-9828130470404483091)</figcaption>
</figure>

<figure>
  <img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg" height="660" width="480" alt="Elephant at sunset" />
  <figcaption>An elephant at sunset</figcaption>
</figure>

### Callouts

> [!NOTE] Note
>
> Highlights information that users should take into account, even when skimming.
>
> Second paragraph. With a [lorem ipsum](#) link.

> [!TIP] Tip
>
> Optional information to help a user be more successful.
>
> Second paragraph. With a [lorem ipsum](#) link.

> [!IMPORTANT] Important
>
> Crucial information necessary for users to succeed.
>
> Second paragraph. With a [lorem ipsum](#) link.

> [!WARNING] Warning
>
> Critical content demanding immediate user attention due to potential risks.
>
> Second paragraph. With a [lorem ipsum](#) link.

> [!CAUTION] Caution
>
> Negative potential consequences of an action.
>
> Second paragraph. With a [lorem ipsum](#) link.

And nesting callouts

> [!WARNING] Warning
>
> Critical content demanding immediate user attention due to potential risks.
>
> Second paragraph. With a [lorem ipsum](#) link.
>
> > [!CAUTION] Caution
> >
> > Negative potential consequences of an action.
> >
> > Second paragraph. With a [lorem ipsum](#) link.

> [!CAUTION] Caution
>
> Negative potential consequences of an action.
>
> Second paragraph. With a [lorem ipsum](#) link.
>
> > [!WARNING] Warning
> >
> > Critical content demanding immediate user attention due to potential risks.
> >
> > Second paragraph. With a [lorem ipsum](#) link.

and this continues the paragraph.

> [!QUOTE]
>
> This is another quote that is long enough to be on multiple lines. Let's see how it looks. And just to make sure it's long enough, I'll add some more text. Just a bit more.

but also without any variant

> This is another quote that is long enough to be on multiple lines. Let's see how it looks. And just to make sure it's long enough, I'll add some more text. Just a bit more.

and nested

> Level-one reply
>
> > Level-two reply
> >
> > > Level-three reply

and now a quote with a caption:

<figure>

> [!QUOTE]
>
> The truth may be puzzling. It may take some work to grapple with. It may be counterintuitive.
> It may contradict deeply held prejudices. It may not be consonant with what we desperately
> want to be true. But our preferences do not determine what's true. We have a method, and that
> method helps us to reach not absolute truth, only asymptotic approaches to the truth — never
> there, just closer and closer, always finding vast new oceans of undiscovered possibilities.
> Cleverly designed experiments are the key.

  <figcaption>
    Carl Sagan, in "<cite>Wonder and Skepticism</cite>", from the <cite>Skeptical Inquirer</cite>{" "}
    Volume 19, Issue 1 (January-February 1995)
  </figcaption>
</figure>

### Basic Text Formatting

_This text is italicized._

**This text is bold.**

~~This text is strikethrough.~~

_**This text is bold and italicized.**_

### Compound Formatting

**_This is bold and italicized text._**

~~**This is bold and strikethrough text.**~~

> **This is a quote with bold text.**

Here is a list with different formatting:

1. **Bold Item**
2. _Italicized Item_
3. ~~Strikethrough Item~~
4. **_Bold and Italicized Item_**

### TODO Extended Formatting

H_2_O

X^2

### Headers

#### Header 4

#### Header 4

This is a repeat heading, check to see id is different

##### Header 5

###### Header 6

### Lists

#### Unordered List

- Item 1
  - Sub-item 1
  - Sub-item 2
- Item 2
  - Sub-item 1
  - Sub-item 2
    - Sub-sub-item 1
    - Sub-sub-item 2
- Item 3

#### Ordered List

1. First item
   1. Sub-item 1
   2. Sub-item 2
2. Second item
   1. Sub-item 1
   2. Sub-item 2
      1. Sub-sub-item 1
      2. Sub-sub-item 2
3. Third item

### Links

This is an [internal link](/writings) example.

This is an [external link](https://google.com) example.

This is an [internal anchor link](#links) example.

This is an [internal link to file](/floating-cogs.svg) example.

This is an [external link to file](https://google.com/example.pdf) example.

### TODO Code

#### TODO Inline Code

Here is some inline code: `console.log('Hello, world!');`

#### TODO Code Block

```javascript
function greet() {
  console.log("Hello, world!")
}
greet()
```

### TODO Tables

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row 1    | Data 1   | Data 2   |
| Row 2    | Data 3   | Data 4   |
