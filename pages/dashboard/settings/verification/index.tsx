import { NextPage } from "next";
import DashboardLayout from "../../../../components/dashboard/layout";
import withAuth from "../../../../route/with-auth";
import SettingsLayout from "../../../../components/dashboard/settings/layout";
import ProfileForm from "../../../../components/dashboard/settings/form/profile-form";
import SettingsVerificationNavigation from "../../../../components/dashboard/settings/verification-navigation";

const Settings: NextPage = () => {
  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <SettingsLayout>
            <div className="flex md:flex-row flex-col items-baseline justify-between ">
              <div className="lg:w-4/12 w-full lg:my-0 my-4 lg:ml-0 ml-1 ">
                <SettingsVerificationNavigation />
              </div>
              <div className="lg:w-8/12 w-full lg:mr-8">
                <h1 className="text-xl mb-6  "> Profile </h1>
                <ProfileForm />
              </div>
            </div>
          </SettingsLayout>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default withAuth(Settings);
