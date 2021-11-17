import type { NextPage } from "next";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import FavouriteStores from "../../components/favourite-stores";
import Invite from "../../components/invite";
import ApaceApp from "../../components/apace-app";
import DashboardTabs from "../../components/dashboard/dashboard-tab";
import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";

const Home: NextPage = () => {
  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <DashboardTabs />
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Home;
