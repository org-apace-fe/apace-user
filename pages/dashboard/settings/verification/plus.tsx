import { NextPage } from "next";
import DashboardLayout from "../../../../components/dashboard/layout";
import withAuth from "../../../../route/with-auth";
import { useDispatch } from "react-redux";
import SettingsLayout from "../../../../components/dashboard/settings/layout";
import SettingsVerificationNavigation from "../../../../components/dashboard/settings/verification-navigation";
import Button from "../../../../components/button";

const Settings: NextPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden text-sm ">
          <SettingsLayout>
            <div className="flex items-baseline justify-between ">
              <div className="w-4/12">
                <SettingsVerificationNavigation />
              </div>
              <div className=" w-8/12 mr-8">
                <h1 className="text-xl mb-6  "> Bank Statement </h1>
                <p>
                  To complete Apace Plus verification, we need to access and
                  validate your bank statement. We use a reliable and secure
                  third-party service to do this. Do you grant us permission to
                  proceed?
                </p>

                <label className="flex items-center my-4">
                  <input
                    type="checkbox"
                    className="form-checkbox bg-black mr-2 "
                  />
                  <span className="ml-2 mr-6"> I grant permission </span>
                </label>

                <Button className="text-black bg-purple-600 border-purple-600 ">
                  Proceed
                </Button>
              </div>
            </div>
          </SettingsLayout>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Settings;
