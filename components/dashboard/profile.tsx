import { background } from "../../utils/background";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const profile = useSelector((state: any) => state.auth);

  const personalInfo = profile?.user?.data?.peronal_info;

  console.log("vv", personalInfo);

  return (
    <div
      className=" rounded-lg overflow-hidden"
      style={{ background: background.apacegray3 }}
    >
      <div className="flex p-4">
        <div className="w-14 h-14 mr-4 rounded-full overflow-hidden">
          <img
            src={personalInfo.avatar}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-sm">
          <p className="font-black">
            {" "}
            {personalInfo.first_name} {personalInfo.last_name}{" "}
          </p>
          <p> {personalInfo.mobile_number} </p>
          <p> {personalInfo.email_address} </p>
        </div>
      </div>

      <div className="flex items-center border-b border-gray-400 p-4">
        <div className="w-6 h-6 mr-4 ">
          <img src="/icons/verified.svg" className="w-full" />
        </div>
        <div className="text-sm">
          <p className="font-black">Tier 1 : N20,000.00</p>
          <p className="text-apace-orange-light">Increased limit</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex my-2 ">
          <img src="/icons/settings.svg" /> <p className="ml-4">Settings</p>
        </div>
        <div className="flex my-2 ">
          <img src="/icons/faq.svg" /> <p className="ml-4">FAQs</p>
        </div>
        <div className="flex my-2 ">
          <img src="/icons/legal.svg" /> <p className="ml-4">Legal</p>
        </div>
        <div className="flex my-2 ">
          <img src="/icons/logout.svg" /> <p className="ml-4">Sign out</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
