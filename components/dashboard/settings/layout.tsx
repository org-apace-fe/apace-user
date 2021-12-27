import router from "next/router";
import CreditLimitComponent from "./credit-limit";
import SettingsNavigation from "./navigation";

const SettingsLayout = ({ children }: any) => {
  const path = router.pathname;
  return (
    <div className="lg:mx-0 mx-8">
      <div className="pb-6 relative w-full lg:px-24 px-2 border-b border-gray-800 text-sm ">
        <p className="text-xl"> Settings </p>
      </div>
      <div className="relative flex lg:flex-row flex-col lg:ml-20 ml-0 lg:pt-12 pt-4">
        <SettingsNavigation />
        <div className="flex w-full">
          <div className="lg:w-9/12 w-full">{children}</div>
          {path !== "/dashboard/settings/notifications" ? (
            <div className="lg:w-3/12 w-full lg:block hidden ">
              <CreditLimitComponent />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
