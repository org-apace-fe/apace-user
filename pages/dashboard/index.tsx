import type { NextPage } from "next";
import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";
import ApaceStoreTabs from "../../components/store-tabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/actions/user.action";
import { useEffect } from "react";
import withAuth from "../../route/with-auth";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state: any) => state.auth);
  const personalInfo = profile?.user?.data?.peronal_info;

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <ApaceStoreTabs personalInfo={personalInfo} />
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default withAuth(Home);
