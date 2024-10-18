import React from "react"

function Sample({ className, title = "Default" }: { className: string; title?: string }) {
  return (
    <div className={className}>
      <div class="bg-accent-6/60 p-4">
        <p class="font-bold">{`Alert! ${title} Theme`}</p>
        <p class="">
          <span>This is a placeholder alert message.</span> Please update the text accordingly. And
          this is a{" "}
          <a href="https://google.com" className="text-accent-link">
            lorem ipsum
          </a>{" "}
          link .
        </p>
      </div>
    </div>
  )
}

export default async function Page() {
  return (
    <>
      <p>Hello there.</p>
      <p>General Kenobi!</p>
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
      <blockquote>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at
          felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec
          eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit
          sit amet quam. Vivamus pretium ornare est.
        </p>
      </blockquote>

      <br />

      <Sample className="default-theme" title="Default" />
      <br />
      <Sample className="info-theme" title="Info" />
      <br />
      <Sample className="success-theme" title="Success" />
      <br />
      <Sample className="critical-theme" title="Critical" />
      <br />
      <Sample className="warning-theme" title="Warning" />
      <br />
      <Sample className="danger-theme" title="Danger" />
      <br />

      <h3 className="">Header Level 3</h3>
      <h3 className="bg-accent-5">Header Level 3</h3>
      <h3 className="default-theme bg-accent-5">Header Level 3</h3>
      <h3 className="info-theme bg-accent-5">Header Level 3</h3>
      <h3 className="success-theme bg-accent-5">Header Level 3</h3>
      <h3 className="critical-theme bg-accent-5">Header Level 3</h3>
      <h3 className="warning-theme bg-accent-5">Header Level 3</h3>
      <h3 className="danger-theme bg-accent-5">Header Level 3</h3>
      <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
      </ul>
    </>
  )
}
