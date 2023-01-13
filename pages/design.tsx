import type { FCC } from "types/react";
import React from "react";
import { default as Layout } from "templates/Article";
import type { IAnchorHeadingProps } from "components/mdx";
import { AnchorHeading } from "components/mdx";

const H3: FCC<IAnchorHeadingProps> = (props) => <AnchorHeading as="h3" {...props} />;
const H4: FCC<IAnchorHeadingProps> = (props) => <AnchorHeading as="h3" {...props} />;

export default function Design() {
  return (
    <Layout>
      <p>
        Hello there. This is a list of components, styles, and other design fun that I created and
        use across this website. It probably is not nicely formatted or anything, but should be
        interesting in one page. Feel free to take a gander.
      </p>

      <H3 id="typography">Typography</H3>
      <H4 id="headings">Headings</H4>
      <h1>Heading h1</h1>
      <h2>Heading h2</h2>
      <h3>Heading h3</h3>
      <h4>Heading h4</h4>
      <h5>Heading h5</h5>
      <h6>Heading h6</h6>
      <H4 id="other-typography">Other Typography</H4>
      <p>
        This is <span className="main-nav">main nav</span>.
      </p>
      <p>
        This is <span className="sup">sup</span>.
      </p>
      <p>
        This is <span className="sub">sub</span>.
      </p>
      <p>
        This is <span className="small-bottom">small bottom</span>.
      </p>
    </Layout>
  );
}
