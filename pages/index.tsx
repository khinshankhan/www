import type { NextPage } from "next";
import { HomeToggle, ToggleColorMode } from "components/toggles";
import { metaConfig } from "contentlayer/generated";

const Home: NextPage = () => (
  <div>
    <HomeToggle size={55} />
    <h1>Hello there.</h1>
    <ToggleColorMode />
    <p>
      &copy; {metaConfig.startYear}+, {metaConfig.fullname}. All rights reserved.
    </p>
  </div>
);

export default Home;
