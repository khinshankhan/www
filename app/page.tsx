import React from "react"

export default async function Page() {
  return (
    <>
      <p className="">General Kenobi!</p>
      <p className="show-mobile hide-print">This is visible on mobile only.</p>
      <p className="hide-mobile">This is visible on desktop only.</p>

      <p>
        <strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames
        ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
        ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>{" "}
        Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
        Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi.
        Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus
        lacus enim ac dui. <a href="#here">Donec non enim</a> in turpis pulvinar facilisis. Ut
        felis.
      </p>

      <h2>Header Level 2</h2>

      <ol>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
      </ol>

      <blockquote className="orange bg-background">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at
          felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec
          eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit
          sit amet quam. Vivamus pretium ornare est.
        </p>
      </blockquote>

      <h3>Header Level 3</h3>

      <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
      </ul>
    </>
  )
}
