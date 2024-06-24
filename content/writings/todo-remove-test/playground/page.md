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

### Spoilers

Don't you just hate <Spoiler>spoilers</Spoiler>?

Also, <Spoiler>this is some spoiler that's far too long to fit in one line when listed on a page.</Spoiler>

How about with... markup? <Spoiler>this is _italics_ and **bold** and _underline_ and **_something_**</Spoiler>.

TODO: absolutely failing --

...how about a formatting spoiler? <Spoiler>a [link home](/) and [external link to Google](https://google.com)</Spoiler>

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

### Code

#### Inline Code

Here is some inline code: `console.log('Hello, world!');` But also, here is some inline code: `console.log('Hello, world!');`

#### Code Block

```javascript
function greet() {
  console.log("Hello, world!")
}
greet()
```

#### GitHub

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

#### Radix Tooltip

```jsx
import React from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import * as Tooltip from "@radix-ui/react-tooltip"

const TooltipDemo = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="text-violet11 shadow-blackA4 hover:bg-violet3 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
            <PlusIcon />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
            sideOffset={5}
          >
            Add to library
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default TooltipDemo
```

### TODO Tables

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row 1    | Data 1   | Data 2   |
| Row 2    | Data 3   | Data 4   |

### Ein

Donec auctor feugiat ligula at facilisis. Integer ligula risus, gravida eget euismod ultrices, dictum non nisl. Etiam aliquam lobortis mattis. Vivamus eu viverra justo, eget aliquet turpis. Aenean hendrerit est nec facilisis consectetur. Vestibulum eros augue, venenatis at placerat vel, euismod sit amet urna. Maecenas et scelerisque eros. Pellentesque odio magna, sodales vitae nibh vel, blandit rutrum tellus. Maecenas quis arcu blandit, aliquet ipsum a, cursus mi. Aenean viverra, libero id aliquet scelerisque, felis justo eleifend diam, ac tincidunt lectus ante eu nisl. Vivamus facilisis scelerisque ex dictum accumsan.

Donec pellentesque dui vulputate nibh fringilla varius et a enim. Nulla a lorem eget nunc tincidunt auctor ac a augue. Vivamus pretium velit non erat vestibulum ornare. Nulla imperdiet vel nisi non porttitor. Aenean tempor egestas nisl, sed convallis velit pretium rutrum. Suspendisse vitae mi ac diam faucibus blandit quis sed sapien. Donec ut convallis arcu. Nullam ante erat, porttitor in dolor ultrices, venenatis laoreet sem. Morbi dignissim, orci eu feugiat pulvinar, ligula lorem euismod sem, nec mollis dolor ligula finibus lacus. Cras vitae erat tincidunt, faucibus lacus ac, vehicula dui. Aliquam viverra in purus non mollis. Curabitur nec odio lacinia, efficitur risus dignissim, vestibulum felis. Suspendisse potenti. Nunc iaculis ligula sit amet nisl rutrum, eget ultrices risus euismod. In faucibus massa et facilisis feugiat.

#### Drei

Proin posuere neque rutrum tincidunt finibus. Sed volutpat nulla vitae turpis bibendum eleifend. Vestibulum posuere elementum turpis. Nunc interdum odio sit amet nunc varius, in cursus turpis gravida. Duis volutpat egestas orci, a sagittis purus accumsan eu. Sed at lorem vitae metus convallis varius vel nec leo. Ut ut vestibulum metus. Maecenas luctus, massa sit amet vulputate fringilla, massa nunc tristique purus, at suscipit libero diam a dolor. Cras congue tellus eu enim porta dignissim. In hac habitasse platea dictumst. Sed neque nulla, tempor non lacus convallis, fermentum venenatis est. Suspendisse nisl turpis, porta eu eros at, facilisis pellentesque risus. Nunc gravida, justo et rutrum cursus, neque ex efficitur risus, id suscipit odio est sed neque.

Sed nisl libero, interdum vel bibendum eu, tincidunt et tortor. Nullam quis tempor lectus, id accumsan enim. Proin iaculis condimentum vestibulum. Integer ac enim diam. Sed sagittis augue ut nibh rhoncus consectetur. Mauris suscipit libero quis nunc rutrum interdum. Pellentesque venenatis risus et risus viverra condimentum. Nulla molestie at sem in lobortis. In faucibus, mauris ut posuere dignissim, nisl erat fermentum ipsum, at feugiat leo nisl et ante. Integer in ante neque. Etiam tincidunt ex ut tellus bibendum, sed volutpat ligula pulvinar. Donec ultricies sed libero vitae malesuada. Proin viverra arcu vel dolor imperdiet viverra. Donec cursus cursus ipsum sed fermentum. Phasellus ullamcorper semper nisi quis tempor. Ut in velit tristique quam ullamcorper aliquam quis id ligula.

##### Zwei

Nunc a justo eget lacus laoreet tincidunt id eu leo. Mauris fringilla ultrices lectus, pharetra pulvinar lectus consectetur quis. Sed sagittis, ipsum et malesuada tincidunt, ligula leo molestie ipsum, eu commodo ante turpis ut quam. In ultricies turpis tellus, nec euismod urna varius accumsan. Sed finibus, nisl quis condimentum viverra, enim neque ornare quam, et accumsan velit tellus non nulla. Aliquam metus leo, tempus ac nibh vitae, auctor fringilla quam. Mauris venenatis dolor eget magna congue, sed suscipit tortor efficitur. Sed nec malesuada felis, nec pharetra orci. Sed a nisl sagittis, fermentum nisi eget, blandit nibh. In eu luctus felis, vitae congue odio. Morbi id facilisis orci, sed rhoncus nisi. Nullam eget diam quis risus pellentesque malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus quis erat imperdiet, porta tortor quis, feugiat neque.
