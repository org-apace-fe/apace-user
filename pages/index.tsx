import type { NextPage } from "next";

import HashTagUseApace from "../components/hashtagUseApace";

import Layout from "../components/layout";
import Banner from "../components/banner";
import FavouriteStores from "../components/favourite-stores";

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
        <Banner />
        <FavouriteStores />
        <HashTagUseApace />
      </Layout>
    </div>
  );
};

export default Home;
