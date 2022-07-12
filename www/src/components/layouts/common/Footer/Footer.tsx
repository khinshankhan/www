import React from "react";
import { BoxProps, forwardRef, Box, Container, Stack } from "@chakra-ui/react";
import useFooterData from "src/data/useFooterData";
import Copyright from "./Copyright";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = forwardRef((props: BoxProps, ref = null) => {
  const { meta, ...data } = useFooterData();
  const { socials } = data.navs.footer;

  return (
    <Box ref={ref} bg="bgOpaque" zIndex="sticky" bottom={0} {...props}>
      <Container variant="page" as="footer" id="footer">
        <Stack
          direction={{ base: `column-reverse`, md: `row` }}
          justifyContent="space-between"
          alignItems="center"
          pt={4}
          pb={4}
          bg="bgAlpha"
        >
          <Copyright name={meta.fullname} year={meta.startYear} />
          <SocialMediaLinks socials={socials} />
        </Stack>
      </Container>
    </Box>
  );
});

export default Footer;
