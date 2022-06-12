import React from "react";
import { Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { Heading, InternalLink, ExternalLink } from "src/components/common";
import { PageLayout as Layout } from "src/components/layouts";

const Index = () => (
  <Layout title="About" taglines={[`Me, myself, & I`]}>
    <Text>
      Nice to meet you! I'm Khinshan, but feel free to call me Shan. I've put on many different hats
      and poked around a few different fields, but in the end I'm a software engineer professionally
      and for fun. I'm passionate about just having a good time, and if that helps someone else,
      it'd be pretty neat. Feel free to take a gander at some of my{` `}
      <InternalLink href="/portfolio">work</InternalLink>.
    </Text>

    <Text>
      I do want to make it clear that although at times my thoughts may be the same as my
      colleagues, unless stated explicitly, my writing and opinions <i>should not</i> be considered
      {` `}
      <i>wholly nor partially representative</i> of my employer. In that vein, unless stated
      explicitly... employer’s opinions are not mine.
    </Text>

    <Text>Some things I like that you may like:</Text>
    <UnorderedList>
      <ListItem>
        <Text>cooking</Text>
      </ListItem>
      <ListItem>
        <Text>linguistics</Text>
      </ListItem>
      <ListItem>
        <Text>puzzles & fallacies</Text>
      </ListItem>
      <ListItem>
        <Text>(video | board | *)games</Text>
      </ListItem>
      <ListItem>
        <Text>interactivity</Text>
      </ListItem>
      <ListItem>
        <Text>unordered lists</Text>
      </ListItem>
    </UnorderedList>

    <Heading.h2Anchor>This Site</Heading.h2Anchor>

    <Text>
      To start with, the source code for this website is available on GitHub{` `}
      <ExternalLink href="https://github.com/khinshankhan/anchorage">here</ExternalLink>. You're
      free to use the code in accordance to the MIT licensing I have on it. The content however is
      not under MIT licensing (tldr: cite me if you use my words, would be cool if you mentioned me
      somewhere when you use my code too 😛).
    </Text>

    <Text>
      I’ve been discontent with my website, I must’ve changed it 10+ times now. After experimenting
      from vanilla to <ExternalLink href="https://github.com/sintaxi/harp">Harp</ExternalLink> to
      {` `}
      <ExternalLink href="https://github.com/Frozen-Flask/Frozen-Flask">Frozen Flask</ExternalLink>
      {` `}
      to <ExternalLink href="https://github.com/jekyll/jekyll">Jekyll</ExternalLink> etcetera
      etcetera, I've realized what I should use is what I feel most comfortable with and similar to
      what I use for work. Hopefully using modern technologies will make this full on rewrite the
      last rewrite for years on end. I've named it anchorage to keep me anchored… hopefully 😳.
    </Text>

    <Text>
      I don't intend on making this a reusable template easy for anyone to use at the moment, but I
      {` `}
      <i>am</i> trying decouple personal information from the components. It's a long process and
      gets harder as tech debt piles up, but maybe one day this anchorage will be easy to fork and
      wind up.
    </Text>

    <Text>
      The stack is <ExternalLink href="https://pnpm.io/">pnpm</ExternalLink> to manage dependencies,
      {` `}
      <ExternalLink href="https://www.gatsbyjs.com/">Gatsby</ExternalLink> for the static site
      generation framework, <ExternalLink href="https://chakra-ui.com/">Chakra UI</ExternalLink> for
      the styling, and <ExternalLink href="https://www.netlify.com/">Netlify</ExternalLink> to host.
    </Text>

    <Heading.h2Anchor>Navigation</Heading.h2Anchor>

    <Text>Come back later, this section is currently WIP!</Text>
  </Layout>
);

export default Index;
