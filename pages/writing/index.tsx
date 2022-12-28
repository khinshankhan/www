import React from "react";
import { PageLayout } from "components/layout";

export default function Writing() {
  return (
    <PageLayout>
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
    </PageLayout>
  );
}
