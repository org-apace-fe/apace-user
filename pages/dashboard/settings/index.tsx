import { NextPage } from "next";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import withAuth from "../../../route/with-auth";

const Settings: NextPage = () => {
  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>Settings</Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default withAuth(Settings);
