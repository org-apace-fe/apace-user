import type { NextPage } from "next";

import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";
import ApaceStoreTabs from "../../components/store-tabs";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../store/actions/user.action";
import { useEffect } from "react";
import { fetchAllNotifications } from "../../store/actions/notification.action";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

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
