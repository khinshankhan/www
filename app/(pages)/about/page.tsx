import React from "react"
import { cn } from "@/lib/utils"

export default function About() {
  return (
    <main className="">
      {Array.from({ length: 2 }, (_, i) => i).map((e, i) => (
        <div key={e} className={cn(i !== 0 && "mt-4")}>
          {i} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus at erat at
          bibendum. Nunc sed molestie justo. Ut vestibulum, justo bibendum tristique blandit, magna
          metus laoreet mauris, in lacinia lectus lectus sed odio. Quisque a massa ut enim fringilla
          malesuada ac vitae ligula. Curabitur interdum turpis risus, sit amet scelerisque elit
          aliquet vitae. Aliquam sit amet elementum felis. Sed molestie, lectus in bibendum
          hendrerit, velit metus ultricies dolor, eu molestie nunc metus sit amet felis. Sed
          ultrices ac orci nec dictum. Duis ligula massa, vestibulum ut bibendum ac, commodo et sem.
          Aenean ut turpis sed ipsum viverra placerat. Maecenas congue sit amet tellus eget
          pellentesque. Maecenas aliquam enim quis magna consequat, et efficitur purus rhoncus.
          Donec consectetur tortor vitae lobortis eleifend.
        </div>
      ))}
    </main>
  )
}
