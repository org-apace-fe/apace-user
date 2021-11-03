import type { NextPage } from "next";

import HashTagUseApace from "../components/hashtagUseApace";

import Layout from "../components/layout";
import Banner from "../components/banner";

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
        <Banner />
        <HashTagUseApace />
      </Layout>
    </div>
  );
};

export default Home;
