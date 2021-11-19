import type { NextPage } from "next";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import FavouriteStores from "../../components/favourite-stores";
import Invite from "../../components/invite";
import ApaceApp from "../../components/apace-app";

import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";
import ApaceStoreTabs from "../../components/store-tabs";

const Home: NextPage = () => {
  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
          <ApaceStoreTabs />
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Home;
