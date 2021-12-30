import { NextPage } from "next";
import DashboardLayout from "../../../components/dashboard/layout";
import withAuth from "../../../route/with-auth";
import { useDispatch, useSelector } from "react-redux";
import SettingsLayout from "../../../components/dashboard/settings/layout";
import Link from "next/link";
import { useEffect } from "react";
import { fetchUserProfile } from "../../../store/actions/user.action";
import { numberWithCommas } from "../../../utils/formatNumber";

const SettingsCreditLimit: NextPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.auth);

  const onBoardingStep = profile?.user?.data?.on_boarding_step;

  const personalInfo = profile?.user?.data?.peronal_info;
  const loanLimit = profile?.user?.data?.loan_limit;

  const customerTiers = profile?.user?.data?.customer_tiers;

  const activeTiers = customerTiers?.find((tier: any) => {
    return tier.is_active === true;
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

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
                You’re on Apace {activeTiers?.tier_name} verification which pegs
                your credit limit at &#8358;{" "}
                {numberWithCommas(loanLimit?.limit)}{" "}
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
