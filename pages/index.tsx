import type { NextPage } from "next";

import HashTagUseApace from "../components/hashtagUseApace";

import HowItWorks from "../components/how-it-works";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
        <HowItWorks />
        <HashTagUseApace />
      </Layout>
    </div>
  );
};

export default Home;
