import React from "react";
import { Text } from "@chakra-ui/react";
import { InternalLink } from "src/components/common";
import { PageLayout as Layout } from "src/components/layouts";

const NotFound = () => (
  <Layout title="404" taglines={[`Uh oh`, `Coupled with a few sobs and heartbreaks`]}>
    <Text>
      <i>Sorry</i>, it seems you have stumbled into a page that doesn't exist (yet?). It's possible
      this page may come into existence later in the future... but for now, the way out is easy –
      you can try going back to the previous page or easily navigate over to the {` `}
      <InternalLink href="/">home page</InternalLink>. If you really feel like something is missing
      that should be here, {` `}
      <InternalLink href="/contact">contact me</InternalLink> and I'll assist to the best of my
      capacity 😊
    </Text>
  </Layout>
);

export default NotFound;
