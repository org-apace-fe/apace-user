import Link from "next/link";
import router from "next/router";

const SettingsNavigation = () => {
  const path = router;
  const pn = path.pathname;

  return (
    <div className="w-96 text-sm">
      <div>
        <Link href="/dashboard/settings/verification">
          <div className="flex mt-1 mb-2 rounded-lg w-full cursor-pointer  p-2 ">
            <img src={`/icons/settings/account-verification.svg`} />
            <a
              className={`ml-3 ${
                pn !== "/dashboard/settings/verification"
                  ? "text-gray-300"
                  : "text-white"
              }`}
            >
              Verification
            </a>
          </div>
        </Link>
        <Link href="/dashboard/settings/profile">
          <div className="flex mt-1 mb-2 rounded-lg w-full cursor-pointer  p-2 ">
            <img src="/icons/settings/account.svg" />
            <a
              className={`ml-3 ${
                pn !== "/dashboard/settings/profile"
                  ? "text-gray-300"
                  : "text-white"
              }`}
            >
              {" "}
              Profile{" "}
            </a>
          </div>
        </Link>
        <Link href="/dashboard/settings/notifications">
          <div className="flex mt-1 mb-2 rounded-lg w-full cursor-pointer  p-2 ">
            <img src="/icons/settings/notifications.svg" />
            <a
              className={`ml-3 ${
                pn !== "/dashboard/settings/notifications"
                  ? "text-gray-300"
                  : "text-white"
              }`}
            >
              {" "}
              Notifications{" "}
            </a>
          </div>
        </Link>
        <Link href="/dashboard/settings/guarantee">
          <div className="flex mt-1 mb-2 rounded-lg w-full cursor-pointer  p-2 ">
            <img src="/icons/settings/guarantor.svg" />
            <a
              className={`ml-3 ${
                pn !== "/dashboard/settings/guarantee"
                  ? "text-gray-300"
                  : "text-white"
              }`}
            >
              {" "}
              Guaranteeing{" "}
            </a>
          </div>
        </Link>
        <Link href="/dashboard/settings/credit-limit">
          <div className="flex mt-1 mb-2 rounded-lg w-full cursor-pointer  p-2 ">
            <img src="/icons/settings/credit-limit.svg" />
            <a
              className={`ml-3 ${
                pn !== "/dashboard/settings/credit-limit"
                  ? "text-gray-300"
                  : "text-white"
              }`}
            >
              {" "}
              Credit limit{" "}
            </a>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SettingsNavigation;
