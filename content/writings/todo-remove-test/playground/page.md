---
title: Playground v2
subtitle: Where Things are Perfectly Broken
dateCreated: 2017-11-01
datePublished: 2017-11-06
dateModified: 2024-11-06
---

Hello there. This is where experiments sprout and blossom. Some even become features! Or they may become bugs that then
become features. Or they... well yea, stuff happens.

`Ctr-f TODO` to quickly find things I'm working on implementation. Likely in order of top to bottom.

## Images

<figure>
  <img alt="Pretty" src="https://wallpaperaccess.com/full/6788153.jpg" width="3840" height="2160" />

  <figcaption>Pretty but slow to load</figcaption>
</figure>

<figure>
  <img
    alt="Stuffs"
    src="https://media1.tenor.com/m/R3H7o7xRfUMAAAAC/it%27s-saturday.gif"
    width="260"
    height="401"
  />

  <figcaption>Stuffs</figcaption>
</figure>

<figure>
  <img
    alt="Saturday Vibes"
    src="https://media1.tenor.com/m/iGSIl1am6BMAAAAC/fat-albert-saturday.gif"
    width="498"
    height="381"
  />

  <figcaption>Saturday Vibes [(from Tenor)](https://tenor.com/view/fat-albert-saturday-gif-9828130470404483091)</figcaption>
</figure>

<figure>
  <img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg" height="660" width="480" alt="Elephant at sunset" />
  <figcaption>An elephant at sunset</figcaption>
</figure>

## Video

<figure>
   <video
      controls
      src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
      poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
      width="620">
      Sorry, your browser doesn't support embedded videos, but don't worry, you can
      <a href="https://archive.org/details/BigBuckBunny_124">download it</a>
      and watch it with your favorite video player!
   </video>

   <figcaption>
      Example 1 from [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#examples)
   </figcaption>
</figure>

<figure>
   <video
      width="620"
      controls
      poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg">
      <source
         src="https://archive.org/download/ElephantsDream/ed_hd.avi"
         type="video/avi" />
      <source
         src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
         type="video/mp4" />
      Sorry, your browser doesn't support embedded videos, but don't worry, you can
      <a
         href="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
         download="ed_1024_512kb.mp4">
      download the MP4
      </a>
      and watch it with your favorite video player!
   </video>

   <figcaption>
      Example 2 from [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#examples)
   </figcaption>
</figure>

## Callouts

> [!NOTE] Note <Sun className="inline" />
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

## Basic Text Formatting

_This text is italicized._

**This text is bold.**

~This text is _not_ strikethrough.~

~~This text is strikethrough.~~

_**This text is bold and italicized.**_

## Compound Formatting

**_This is bold and italicized text._**

~~**This is bold and strikethrough text.**~~

> **This is a blockquote with bold text.**

Here is a list with different formatting:

1. **Bold Item**
2. _Italicized Item_
3. ~~Strikethrough Item~~
4. **_Bold and Italicized Item_**

## TODO Extended Formatting

H_2_O

X^2

## Spoilers

Don't you just hate <Spoiler>spoilers</Spoiler>?

Also, <Spoiler>this is some spoiler that's far too long to fit in one line when listed on a page.</Spoiler>

How about with... markup? <Spoiler>this is _italics_ and **bold** and _underline_ and **_something_**</Spoiler>.

TODO: absolutely failing --

...how about a formatting spoiler? <Spoiler>a [link home](/) and [external link to Google](https://google.com)</Spoiler>

## Links

This is an [internal link](/writings) example.

This is an [external link](https://google.com) example.

This is an [internal anchor link](#links) example.

This is an [internal link to file](/floating-cogs.svg) example.

This is an [external link to file](https://google.com/example.pdf) example.

## Lists

### Unordered List

- Item 1
  - Sub-item 1
  - Sub-item 2
- Item 2
  - Sub-item 1
  - Sub-item 2
    - Sub-sub-item 1
    - Sub-sub-item 2
- Item 3

### Ordered List

1. First item
   1. Sub-item 1
   2. Sub-item 2
2. Second item
   1. Sub-item 1
   2. Sub-item 2
      1. Sub-sub-item 1
      2. Sub-sub-item 2
3. Third item

## Headers

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim arcu sit amet ullamcorper malesuada. Phasellus quis posuere sem, nec euismod nisi. Quisque a risus fermentum, venenatis elit ac, mattis magna. Nulla facilisi. Donec mauris leo, viverra et erat at, sollicitudin interdum mi. Phasellus cursus orci vel eleifend viverra. Curabitur eleifend tristique ipsum eu sagittis. Quisque vitae augue cursus, luctus nisi vitae, mattis neque. Aenean euismod erat sed eros consequat, sed elementum justo luctus. Cras faucibus id ex in ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

### Header 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim arcu sit amet ullamcorper malesuada. Phasellus quis posuere sem, nec euismod nisi. Quisque a risus fermentum, venenatis elit ac, mattis magna. Nulla facilisi. Donec mauris leo, viverra et erat at, sollicitudin interdum mi. Phasellus cursus orci vel eleifend viverra. Curabitur eleifend tristique ipsum eu sagittis. Quisque vitae augue cursus, luctus nisi vitae, mattis neque. Aenean euismod erat sed eros consequat, sed elementum justo luctus. Cras faucibus id ex in ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

#### Header 4

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim arcu sit amet ullamcorper malesuada. Phasellus quis posuere sem, nec euismod nisi. Quisque a risus fermentum, venenatis elit ac, mattis magna. Nulla facilisi. Donec mauris leo, viverra et erat at, sollicitudin interdum mi. Phasellus cursus orci vel eleifend viverra. Curabitur eleifend tristique ipsum eu sagittis. Quisque vitae augue cursus, luctus nisi vitae, mattis neque. Aenean euismod erat sed eros consequat, sed elementum justo luctus. Cras faucibus id ex in ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

#### Excerpt

This should have an id of `excerpt-1` if mark excerpt plugin is active.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim arcu sit amet ullamcorper malesuada. Phasellus quis posuere sem, nec euismod nisi. Quisque a risus fermentum, venenatis elit ac, mattis magna. Nulla facilisi. Donec mauris leo, viverra et erat at, sollicitudin interdum mi. Phasellus cursus orci vel eleifend viverra. Curabitur eleifend tristique ipsum eu sagittis. Quisque vitae augue cursus, luctus nisi vitae, mattis neque. Aenean euismod erat sed eros consequat, sed elementum justo luctus. Cras faucibus id ex in ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

#### Header 4

This is a repeat heading from right above, check to see id is different and toc works.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim arcu sit amet ullamcorper malesuada. Phasellus quis posuere sem, nec euismod nisi. Quisque a risus fermentum, venenatis elit ac, mattis magna. Nulla facilisi. Donec mauris leo, viverra et erat at, sollicitudin interdum mi. Phasellus cursus orci vel eleifend viverra. Curabitur eleifend tristique ipsum eu sagittis. Quisque vitae augue cursus, luctus nisi vitae, mattis neque. Aenean euismod erat sed eros consequat, sed elementum justo luctus. Cras faucibus id ex in ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

##### Header 5

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim arcu sit amet ullamcorper malesuada. Phasellus quis posuere sem, nec euismod nisi. Quisque a risus fermentum, venenatis elit ac, mattis magna. Nulla facilisi. Donec mauris leo, viverra et erat at, sollicitudin interdum mi. Phasellus cursus orci vel eleifend viverra. Curabitur eleifend tristique ipsum eu sagittis. Quisque vitae augue cursus, luctus nisi vitae, mattis neque. Aenean euismod erat sed eros consequat, sed elementum justo luctus. Cras faucibus id ex in ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

###### Header 6

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim arcu sit amet ullamcorper malesuada. Phasellus quis posuere sem, nec euismod nisi. Quisque a risus fermentum, venenatis elit ac, mattis magna. Nulla facilisi. Donec mauris leo, viverra et erat at, sollicitudin interdum mi. Phasellus cursus orci vel eleifend viverra. Curabitur eleifend tristique ipsum eu sagittis. Quisque vitae augue cursus, luctus nisi vitae, mattis neque. Aenean euismod erat sed eros consequat, sed elementum justo luctus. Cras faucibus id ex in ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

## This is a really long one ugh

Mauris ac convallis ligula. Phasellus nec ultricies libero, vel bibendum nunc. Ut id nibh leo. Pellentesque cursus nunc non facilisis ultrices. Praesent vel fermentum nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam quis vulputate sapien, vitae vehicula odio. Nunc eget ante vitae nibh aliquet euismod. Vestibulum sagittis lacinia urna, nec dapibus purus sollicitudin in. Proin accumsan arcu leo, id egestas tellus tristique vel. Mauris ultricies luctus maximus. Nullam blandit lacinia felis, sed placerat sem sagittis varius. Sed ut arcu nec massa molestie fermentum vitae quis sem. Etiam id urna quis ipsum volutpat tempus et vel felis.

Vivamus vel bibendum eros. Nulla varius faucibus ex, nec congue urna ornare sit amet. Pellentesque in elit aliquam est vehicula scelerisque ac vel risus. Nulla facilisis nec mauris ac fringilla. Cras dignissim ultricies vulputate. Nam a odio lorem. Integer sit amet velit libero. Sed convallis ex sit amet nibh blandit, id facilisis velit luctus. Aliquam erat volutpat. Mauris tincidunt lacinia erat, quis pellentesque nisl.

Proin dapibus mollis libero id viverra. Proin efficitur id nunc vitae semper. Aenean feugiat pulvinar eros vitae dictum. Donec tincidunt facilisis fringilla. Sed semper suscipit dictum. Etiam sed quam at sem egestas convallis at quis eros. Mauris et laoreet odio. Ut orci dui, malesuada pretium iaculis id, pretium eget magna. Etiam tellus est, imperdiet in posuere sed, venenatis venenatis eros. Mauris risus est, suscipit eu luctus a, pellentesque nec tellus. Sed quis urna fringilla, vestibulum urna id, dictum arcu. Mauris lectus odio, faucibus eget est at, maximus sodales ipsum.

## Codeblocks

### Inline Code

Because `code` should exist within words too. Awkward if the next line also had a `codeblock` and the blocks touched :pensive:

### With Pre

Not pre workout but still hype.

```js
// say hello
function greet() {
  console.log("Hello, world!", 5 + 17)
}

greet()
```

```js
console.log(
  "text-violet11 shadow-blackA4 hover:bg-violet3 bg-white focus:shadow-black inline-flex h-[35px] w-[35px] items-center justify-center rounded-full shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px]"
)
```

```jsx
import React from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import * as Tooltip from "@radix-ui/react-tooltip"

const TooltipDemo = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="text-violet11 shadow-blackA4 hover:bg-violet3 bg-white focus:shadow-black inline-flex h-[35px] w-[35px] items-center justify-center rounded-full shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px]">
            <PlusIcon />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 bg-white rounded-[4px] py-[10px] px-[15px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] select-none"
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

```js
// say hello
function greet() {
  console.log("Hello, world!", 5 + 17)
}

greet()

// say hello
function greet() {
  console.log("Hello, world!", 5 + 17)
}

greet()

// say hello
function greet() {
  console.log("Hello, world!", 5 + 17)
}

greet()
```

#### What about... tabs?

<Tabbify labels={["One", "Two"]}>

```js
// say hello
function greet1() {
  console.log("Hello, world!", 5 + 17)
}

greet1()
```

```js
// say hello
function greet2() {
  console.log("Hello, world!", 5 + 17)
}

greet2()
```

</Tabbify>

<Tabbify labels={["Tooltip", "Nonsense Hello"]}>

```jsx
import React from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import * as Tooltip from "@radix-ui/react-tooltip"

const TooltipDemo = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="text-violet11 shadow-blackA4 hover:bg-violet3 bg-white focus:shadow-black inline-flex h-[35px] w-[35px] items-center justify-center rounded-full shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px]">
            <PlusIcon />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 bg-white rounded-[4px] py-[10px] px-[15px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] select-none"
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

```js
// say hello
function greet() {
  console.log("Hello, world!", 5 + 17)
}

greet()

// say hello
function greet() {
  console.log("Hello, world!", 5 + 17)
}

greet()

// say hello
function greet() {
  console.log("Hello, world!", 5 + 17)
}

greet()
```

</Tabbify>
