import React from "react";
import { styled } from "lib/theme";
import Article from "templates/Article";

const L = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  "@isMobile": {
    flexDirection: "column",
    justifyContent: "center",
  },
  marginBottom: "20px",
});
const T = styled("ul", {
  listStyle: "none",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "15px",
  maxWidth: "80%",
  "@isMobile": {
    maxWidth: "100%",
    justifyContent: "center",
    marginBottom: "10px",
  },
});

const D = styled("div", {
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  "@isMobile": {
    justifyContent: "center",
    small: {
      margin: "auto",
    },
  },
});

export default function Post() {
  return (
    <Article>
      <L>
        <T>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((e) => (
            <li key={e}>
              <a href="#">Tag {e}</a>
            </li>
          ))}
        </T>
        <D>
          <small>Planted over 1 year ago</small>
          <small>Last tended about 1 month ago</small>
        </D>
      </L>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta odio nulla, ac{" "}
        <a href="#">Hello there?</a> lacinia est pharetra et. Maecenas risus nunc, aliquam eget
        accumsan at, finibus eu massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam porta odio nulla, ac <a href="#">Hello there?</a> lacinia est pharetra et. Maecenas
        risus nunc, aliquam eget accumsan at, finibus eu massa. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nullam porta odio nulla, ac <a href="#">Hello there?</a>{" "}
        lacinia est pharetra et. Maecenas risus nunc, aliquam eget accumsan at, finibus eu massa.
      </p>
      <p>
        Cupcake ipsum dolor sit amet croissant. I love sugar plum caramels I love wafer. Sweet
        halvah tootsie roll danish cake toffee wafer. I love cheesecake carrot cake lemon drops ice
        cream croissant I love. Icing powder jelly-o halvah marshmallow liquorice toffee lollipop.
        Powder cheesecake tootsie roll chocolate sugar plum shortbread liquorice. Sesame snaps
        marshmallow dragée chupa chups muffin sesame snaps cake chocolate bar shortbread. Apple pie
        tootsie roll candy canes I love marshmallow dragée. Cake gingerbread pastry cake dragée
        lemon drops sesame snaps I love. Icing jujubes chupa chups muffin I love I love. Sweet I
        love apple pie carrot cake tart. Chupa chups I love caramels I love jelly. Jujubes pastry
        lollipop muffin chupa chups shortbread donut. Jelly beans jelly chocolate bar sweet
        chocolate cake lollipop tootsie roll soufflé.
      </p>
      {Array.from({ length: 50 }, (_, i) => i + 1).map((e) => (
        <p key={e}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta odio nulla, ac
          lacinia est pharetra et. Maecenas risus nunc, aliquam eget accumsan at, finibus eu massa.
          Donec vel ex tortor. Curabitur venenatis viverra diam non egestas. Proin at dui posuere,
          sagittis turpis vitae, dapibus dui. Morbi eget dolor tristique, fringilla velit tincidunt,
          laoreet metus. Quisque lacinia, sapien a tristique tristique, tellus arcu bibendum libero,
          ac convallis risus mi sed diam. Sed mollis lectus sed turpis lacinia tincidunt.
        </p>
      ))}
    </Article>
  );
}
