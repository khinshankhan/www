import React from "react";
import Layout from "src/layouts/Single";
import { Heading, Text } from "@chakra-ui/react";

const About = () => (
  <Layout>
    <>
      <Heading as="h1">About</Heading>
      <br />
      <Text variant="body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eros enim,
        molestie at lacinia suscipit, feugiat in felis. Aenean aliquam nibh sit
        amet nibh laoreet, ut semper enim gravida. Integer varius volutpat diam
        quis congue. Pellentesque metus felis, fringilla vel pulvinar non,
        dignissim nec elit. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas. Maecenas eu tincidunt sem.
        Fusce nec finibus turpis. Mauris aliquam sed sem non luctus. Donec
        bibendum, leo a sagittis ornare, velit ligula sollicitudin nulla, vel
        laoreet eros nunc ut orci. In euismod ante vel feugiat aliquam. Etiam
        posuere leo massa, ac sodales ligula lacinia in. Curabitur gravida
        libero sit amet velit pellentesque volutpat. Morbi aliquet orci a augue
        varius viverra vitae id mauris. Integer efficitur placerat hendrerit.
        Mauris hendrerit eleifend massa sit amet dapibus. Aliquam sed ante ut
        est luctus egestas. Vestibulum quis ornare diam, a vehicula sem. Fusce
        diam nibh, volutpat semper auctor vitae, varius eget justo.
      </Text>
    </>
  </Layout>
);

export default About;
