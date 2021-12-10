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
            <div className="flex items-baseline justify-between ">
              <div className="w-4/12">
                <SettingsVerificationNavigation />
              </div>
              <div className=" w-8/12 mr-8">
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

export default Settings;
