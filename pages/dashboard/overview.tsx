import type { NextPage } from "next";
import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";
import OverviewPayment from "../../components/dashboard/overview/payment";
import OverviewPurchase from "../../components/dashboard/overview/purchase";
import OverviewReferrals from "../../components/dashboard/overview/referrals";
import withAuth from "../../route/with-auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  LoadingStart,
  LoadingStop,
} from "../../store/actions/loader/loaderActions";
import axios from "axios";
import Loader from "../../components/loader";

const Overview: NextPage = () => {
  const dispatch = useDispatch();

  const [miscellaneousStatistics, setMiscellaneousStatistics] = useState<any>();
  const loader = useSelector((state: any) => state.loader);
  const loaderOpened = loader.LoaderOpened;

  const fetchMiscellaneousStatistics = async () => {
    try {
      dispatch(LoadingStart());
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headersRequest = {
        Authorization: `Bearer ${token}`,
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/miscellaneous/statistics/general`,
        { headers: headersRequest }
      );
      setMiscellaneousStatistics(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  useEffect(() => {
    fetchMiscellaneousStatistics();
  }, []);

  return (
    <div>
      <DashboardLayout>
        {miscellaneousStatistics ? (
          <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
            <Container>
              <OverviewPayment miscellaneous={miscellaneousStatistics} />
              <OverviewPurchase miscellaneous={miscellaneousStatistics} />
              <OverviewReferrals miscellaneous={miscellaneousStatistics} />
            </Container>
          </div>
        ) : (
          <Loader />
        )}
      </DashboardLayout>
    </div>
  );
};

export default withAuth(Overview);
