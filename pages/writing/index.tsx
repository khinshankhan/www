import React from "react";
import { PageLayout } from "components/layout";
import Emoji from "components/Emoji";

export default function Writing() {
  return (
    <PageLayout title="Writing" subtitle="My thoughts and ideas">
      Hello there <Emoji text=":smile:" />
    </PageLayout>
  );
}
