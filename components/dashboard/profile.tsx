import { background } from "../../utils/background";

const Profile = () => {
  return (
    <div className=" rounded-lg overflow-hidden" style={{ background : background.apacegray3 }} >
      <div className="flex p-4">
        <div className="w-14 h-14 mr-4">
          <img src="/icons/user-image.png" className="w-full" />
        </div>
        <div className="text-sm">
          <p className="font-black">Sarah Ajene</p>
          <p>+0899766545646</p>
          <p>sarah@ajene@user.com</p>
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
