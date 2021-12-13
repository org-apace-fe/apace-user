import Link from "next/link";
import router from "next/router";

import { CheckCircleRounded } from "@mui/icons-material";

const SettingsVerificationNavigation = () => {
  const path = router;
  const pn = path.pathname;
  return (
    <>
      <nav className=" overflow-x-auto ">
        <div className="min-w-lg lg:min-w-max flex lg:flex-col flex-row">
          <Link href="/dashboard/settings/verification">
            <a className="flex">
              <CheckCircleRounded
                width="25px"
                height="25px"
                color={`${
                  pn !== "/dashboard/settings/verification"
                    ? "inherit"
                    : "success"
                }`}
              />
              <p className="ml-2"> Personal </p>
            </a>
          </Link>
          <span className="lg:border-l border-none border-gray-800 ml-3 h-12 lg:w-0 w-6  "></span>
          <Link href="/dashboard/settings/verification/plus">
            <a className="flex">
              <CheckCircleRounded
                width="25px"
                height="25px"
                color={`${
                  pn !== "/dashboard/settings/verification/plus"
                    ? "inherit"
                    : "success"
                }`}
              />
              <p className="ml-2"> Plus </p>
            </a>
          </Link>
          <span className="lg:border-l border-none border-gray-800 ml-3 h-12 lg:w-0 w-6  "></span>
          <Link href="/dashboard/settings/verification/pro">
            <a className="flex">
              <CheckCircleRounded
                width="25px"
                height="25px"
                color={`${
                  pn !== "/dashboard/settings/verification/pro"
                    ? "inherit"
                    : "success"
                }`}
              />
              <p className="ml-2"> Pro </p>
            </a>
          </Link>
          <span className="lg:border-l border-none border-gray-800 ml-3 h-12 lg:w-0 w-6  "></span>
          <Link href="/dashboard/settings/verification/premium">
            <a className="flex">
              <CheckCircleRounded
                width="25px"
                height="25px"
                color={`${
                  pn !== "/dashboard/settings/verification/premium"
                    ? "inherit"
                    : "success"
                }`}
              />
              <p className="ml-2"> Premium </p>
            </a>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default SettingsVerificationNavigation;
