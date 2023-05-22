import React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"
import Emoji from "@/components/emoji"

export default function About() {
  return (
    <>
      <div id="excerpt">
        <span>Hello there friend, </span>
        <span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>hover over me. </span>
            </TooltipTrigger>
            <TooltipContent>
              <span>This is tooltip content!</span>
            </TooltipContent>
          </Tooltip>
        </span>
        <span>Magic.</span> <Emoji name=":magic_wand:" />
      </div>
      <div>
        <span>
          This should be <b>bold</b>, <u>underline</u>, <del>strikethrough</del>, <i>italics</i>.
        </span>
      </div>

      <p>Okay, let's try an unordered list. Here we go:</p>

      <ul>
        <li>uno</li>
        <li>dos</li>
        <li>
          <ul>
            <li>uno</li>
            <li>dos</li>
            <li>
              <ul>
                <li>uno</li>
                <li>dos</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <p>Okay, let's try an ordered list. Here we go:</p>

      <ol>
        <li>uno</li>
        <li>dos</li>
        <li>
          <ol>
            <li>uno</li>
            <li>dos</li>
            <li>
              <ol>
                <li>uno</li>
                <li>dos</li>
              </ol>
            </li>
          </ol>
        </li>
      </ol>

      {Array.from({ length: 2 }, (_, i) => i).map((e) => (
        <div key={e}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus at erat at bibendum.
          Nunc sed molestie justo. Ut vestibulum, justo bibendum tristique blandit, magna metus
          laoreet mauris, in lacinia lectus lectus sed odio. Quisque a massa ut enim fringilla
          malesuada ac vitae ligula. Curabitur interdum turpis risus, sit amet scelerisque elit
          aliquet vitae. Aliquam sit amet elementum felis. Sed molestie, lectus in bibendum
          hendrerit, velit metus ultricies dolor, eu molestie nunc metus sit amet felis. Sed
          ultrices ac orci nec dictum. Duis ligula massa, vestibulum ut bibendum ac, commodo et sem.
          Aenean ut turpis sed ipsum viverra placerat. Maecenas congue sit amet tellus eget
          pellentesque. Maecenas aliquam enim quis magna consequat, et efficitur purus rhoncus.
          Donec consectetur tortor vitae lobortis eleifend.
        </div>
      ))}

      <p>Things I like:</p>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li>unordered lists</li>
      </ul>
    </>
  )
}
