import { NextPage } from "next";
import DashboardLayout from "../../../components/dashboard/layout";
import withAuth from "../../../route/with-auth";
import { useDispatch } from "react-redux";
import SettingsLayout from "../../../components/dashboard/settings/layout";
import Link from "next/link";

const SettingsCreditLimit: NextPage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden text-sm ">
          <SettingsLayout>
            <>
              <div className="flex">
                <p className="mr-1"> Credit Limit </p>{" "}
                <img src="/icons/settings/info-outlined.svg" />
              </div>

              <p className="mt-4">
                You’re on Apace Personal verification which pegs your credit
                limit at N 20,000.00
              </p>

              <p className="my-6">
                To increase your credit limit,{" "}
                <Link href="/dashboard/settings/verification/plus">
                  <a className="text-apace-orange-light underline">
                    complete Apace Plus verification
                  </a>
                </Link>
              </p>
            </>
          </SettingsLayout>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default withAuth(SettingsCreditLimit);
