import type { NextPage } from "next";
import Layout from "../components/layout";
import Banner from "../components/banner";
import FavouriteStores from "../components/favourite-stores";
import Invite from "../components/invite";
import ApaceApp from "../components/apace-app";
import withoutAuth from "../route/without-auth";

const Home: NextPage = () => {
  return (
      <Layout>
        <Banner />
        <FavouriteStores />
        <Invite />
        <ApaceApp />
      </Layout>
  );
};

export default withoutAuth(Home);
