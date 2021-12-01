import type { NextPage } from "next";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import FavouriteStores from "../../components/favourite-stores";
import Invite from "../../components/invite";
import ApaceApp from "../../components/apace-app";

import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";
import ApaceStoreTabs from "../../components/store-tabs";
import OverviewPayment from "../../components/dashboard/overview/payment";
import OverviewPurchase from "../../components/dashboard/overview/purchase";
import OverviewReferrals from "../../components/dashboard/overview/referrals";
import withAuth from "../../route/with-auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMiscelaneousStatistics } from "../../store/actions/user.action";

const Overview: NextPage = () => {
  const dispatch = useDispatch();

  const miscellaneousStats = useSelector((state: any) => state.auth);

  const miscellaneous = miscellaneousStats?.miscellaneousStatistics?.data;

  useEffect(() => {
    dispatch(fetchMiscelaneousStatistics());
  }, []);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <OverviewPayment miscellaneous={miscellaneous} />
            <OverviewPurchase miscellaneous={miscellaneous} />
            <OverviewReferrals miscellaneous={miscellaneous} />
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

// export default withAuth(Overview);

export default Overview;
