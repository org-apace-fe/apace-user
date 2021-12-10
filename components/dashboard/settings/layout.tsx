import router from "next/router";
import CreditLimitComponent from "./credit-limit";
import SettingsNavigation from "./navigation";

const SettingsLayout = ({ children }: any) => {
  const path = router.pathname;
  return (
    <div>
      <div className="pb-6 relative w-full px-24 border-b border-gray-800 text-sm ">
        <p className="text-xl"> Settings </p>
      </div>

      <div className="ml-20 relative flex pt-12">
        <SettingsNavigation />
        <div className="flex w-full">
          <div className="w-9/12">{children}</div>
          {path !== "/dashboard/settings/notifications" ? (
            <div className="w-3/12">
              {" "}
              <CreditLimitComponent />{" "}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
