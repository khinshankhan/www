import React from "react";
import { Text } from "@chakra-ui/react";
import { Heading, Link } from "src/components/common";
import Layout from "src/layouts/Page";

const Index = () => (
  <Layout>
    <Heading.h1Anchor href="/">Anchor Heading</Heading.h1Anchor>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a ipsum sed justo tempor
      pulvinar vel porttitor nisi. Cras ut ultrices leo, sit amet fringilla orci. Donec pellentesque
      nunc at magna placerat ornare. Quisque iaculis nunc erat, vitae fringilla leo dapibus id. Cras
      ut rhoncus leo, eget rhoncus eros. Aenean non finibus orci. Vivamus imperdiet nisl sit amet
      tellus pharetra, eu placerat justo fermentum. Cras hendrerit elementum lorem, eget sodales
      tellus egestas nec. Sed vel nulla augue. Vivamus nibh augue, accumsan id lobortis sit amet,
      molestie at nulla. Pellentesque consequat condimentum elit vel rutrum. Phasellus eleifend urna
      lacus, vel pellentesque ante semper sed.
    </Text>

    <Heading.h1>
      <Link href="/">Internal Link</Link>
    </Heading.h1>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a ipsum sed justo tempor
      pulvinar vel porttitor nisi. Cras ut ultrices leo, sit amet fringilla orci. Donec pellentesque
      nunc at magna placerat ornare.
    </Text>

    <Heading.h1>
      <Link href="https://google.com">External Link</Link>
    </Heading.h1>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a ipsum sed justo tempor
      pulvinar vel porttitor nisi. Cras ut ultrices leo, sit amet fringilla orci. Donec pellentesque
      nunc at magna placerat ornare.
    </Text>

    <Heading.h1>
      <Link href="https://google.com/hello.pdf">External File</Link>
    </Heading.h1>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a ipsum sed justo tempor
      pulvinar vel porttitor nisi. Cras ut ultrices leo, sit amet fringilla orci. Donec pellentesque
      nunc at magna placerat ornare.
    </Text>

    <Heading.h1>
      <Link href="/hello.pdf">Internal File</Link>
    </Heading.h1>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a ipsum sed justo tempor
      pulvinar vel porttitor nisi. Cras ut ultrices leo, sit amet fringilla orci. Donec pellentesque
      nunc at magna placerat ornare.
    </Text>
  </Layout>
);

export default Index;
