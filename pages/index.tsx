import type { NextPage } from "next";
import { metaConfig } from "contentlayer/generated";

const Home: NextPage = () => (
  <div>
    <h1>Hello there.</h1>
    <p>
      &copy; {metaConfig.startYear}+, {metaConfig.fullname}. All rights reserved.
    </p>
  </div>
);

export default Home;
