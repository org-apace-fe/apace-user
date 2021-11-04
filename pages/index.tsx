import type { NextPage } from "next";

import HashTagUseApace from "../components/hashtagUseApace";

import Layout from "../components/layout";
import Banner from "../components/banner";
import FavouriteStores from "../components/favourite-stores";
import Invite from "../components/invite";
import ApaceApp from "../components/apace-app";
import ManipulatingComponentOutSideSwiper from "../components/swiper-id";

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
        <Banner />
        <FavouriteStores />
        <Invite/>
        <ApaceApp/>
        {/* <ManipulatingComponentOutSideSwiper/> */}
        <HashTagUseApace />
      </Layout>
    </div>
  );
};

export default Home;
