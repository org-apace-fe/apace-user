import type { NextPage } from "next";

import HashTagUseApace from "../components/hashtagUseApace";

import Layout from "../components/layout";
import Banner from "../components/banner";
import FavouriteStores from "../components/favourite-stores";
import Invite from "../components/invite";

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
        <Banner />
        <FavouriteStores />
        <Invite/>
        <HashTagUseApace />
      </Layout>
    </div>
  );
};

export default Home;
