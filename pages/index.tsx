import type { NextPage } from "next";
import { LogoButton } from "components/icons";
import { metaConfig } from "contentlayer/generated";

const Home: NextPage = () => (
  <div>
    <LogoButton size={55} />
    <h1>Hello there.</h1>
    <p>
      &copy; {metaConfig.startYear}+, {metaConfig.fullname}. All rights reserved.
    </p>
  </div>
);

export default Home;
