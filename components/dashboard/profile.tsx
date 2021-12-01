import { background } from "../../utils/background";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchUserProfile, logoutUser } from "../../store/actions/user.action";
import router from "next/router";
import Avatar from "react-avatar";
import { numberWithCommas } from "../../utils/formatNumber";
import { useEffect } from "react";

const Profile = () => {
  const profile = useSelector((state: any) => state.auth);

  const personalInfo = profile?.user?.data?.peronal_info;
  const loanLimit = profile?.user?.data?.loan_limit;

  const customerTiers = profile?.user?.data?.customer_tiers;

  const activeTiers = customerTiers?.find((tier: any) => {
    return tier.is_active === true;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  return (
    <div
      className=" rounded-lg overflow-hidden"
      style={{ background: background.apacegray3 }}
    >
      <div className="flex p-4">
        {!personalInfo?.avatar ? (
          <Avatar
            className="sb-avatar rounded-full mr-4"
            size="3.5rem"
            color="#ED6E24"
            name={`${personalInfo?.first_name} ${personalInfo?.last_name} `}
          />
        ) : (
          <div className="w-14 h-14 mr-4 rounded-full overflow-hidden">
            <img
              src={personalInfo?.avatar}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="text-sm">
          <p className="font-black">
            {" "}
            {personalInfo?.first_name} {personalInfo?.last_name}{" "}
          </p>
          <p> {personalInfo?.mobile_number} </p>
          <p> {personalInfo?.email_address} </p>
        </div>
      </div>

      <div className="flex items-center border-b border-gray-400 p-4">
        <div className="w-6 h-6 mr-4 ">
          <img src="/icons/verified.svg" className="w-full" />
        </div>
        <div className="text-sm">
          <p className="font-black">
            {" "}
            {activeTiers?.tier_name} : &#8358;{" "}
            {numberWithCommas(loanLimit?.limit)}{" "}
          </p>
          <p className="text-apace-orange-light">
            Increase limit (Coming soon){" "}
          </p>
        </div>
      </div>

      <div className="p-4 cursor-pointer">
        <Link href="/dashboard/settings">
          <a className="flex my-2 ">
            <img src="/icons/settings.svg" /> <p className="ml-4">Settings</p>
          </a>
        </Link>
        <Link href="/dashboard/faq">
          <a className="flex my-2 ">
            <img src="/icons/faq.svg" /> <p className="ml-4">FAQs</p>
          </a>
        </Link>
        <Link href="/dashboard/legal">
          <a className="flex my-2 ">
            <img src="/icons/legal.svg" /> <p className="ml-4">Legal</p>
          </a>
        </Link>
        <div
          className="flex my-2 "
          onClick={() => dispatch(logoutUser(router))}
        >
          <img src="/icons/logout.svg" /> <p className="ml-4">Sign out</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
