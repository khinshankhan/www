import React from "react";
import { PageSkeletonLayout as Layout } from "components/layouts";
import { Box } from "components/primitives";
import type { HeadingInfo } from "components/sidebars";
import { Toc } from "components/sidebars";

const H3 = (props) => <h3 {...props} />;
const H4 = (props) => <h4 {...props} />;

export default function Design() {
  return (
    <Layout
      title="Design"
      subtitle="The not so secret sauce"
      sidebar={<Toc headings={[] as HeadingInfo[]} />}
      direction="right"
    >
      <Box className="list-style">
        <p id="excerpt">
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

        <H3 id="lists">Lists</H3>
        <p>Ordered with nesting</p>
        <ol>
          <li>one</li>
          <li>
            two
            <ol>
              <li>one</li>
              <li>two</li>
            </ol>
          </li>
          <li>
            three
            <ol>
              <li>
                Deep
                <ol>
                  <li>one</li>
                  <li>two</li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>

        <p>Unordered with nesting</p>
        <ul>
          <li>one</li>
          <li>
            two
            <ul>
              <li>one</li>
              <li>two</li>
            </ul>
          </li>
          <li>
            three
            <ul>
              <li>
                Deep
                <ul>
                  <li>one</li>
                  <li>two</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>

        <p>Mixed with nesting</p>
        <ol>
          <li>one</li>
          <li>
            two
            <ol>
              <li>one</li>
              <li>two</li>
            </ol>
          </li>
          <li>
            three
            <ul>
              <li>
                Deep
                <ul>
                  <li>one</li>
                  <li>two</li>
                </ul>
              </li>
            </ul>
          </li>
        </ol>
      </Box>
    </Layout>
  );
}
