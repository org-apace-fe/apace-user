import { InstagramIcon, LinkednIcon, TwitterIcon } from "../icons/social-media";
import Link from "next/link";
import { background } from "../../utils/background";

const Referral = () => {
  return (
    <div
      className=" rounded-lg overflow-hidden bg-apace-gray-3"
      style={{
        background:
        background.apacegray3
      }}
    >
      <div className="flex flex-col items-center justify-center py-4">
        <img src="/icons/reward-illustration.png" />
      </div>
      <div className="text-sm text-center p-4">
        You’re doing awesome. Keep accumulating points by referring shoppers to
        Apace. Copy your code and get to spreading the love!
      </div>

      <div className="relative flex flex-col items-center justify-center p-4">
        <div className="flex bg-gray-600 px-2 py-1 rounded-full ">
          <p className="pr-2"> ADE23DRAX </p>
          <img src="/icons/copy.svg" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center m-4">
        <div className="flex  mt-4 lg:mt-0 mb-3 ">
          <div>
            <InstagramIcon />
          </div>
          <div className="ml-8">
            <LinkednIcon />
          </div>

          <div className="ml-8">
            <TwitterIcon />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center p-4">
        <div className="flex bg-gray-600 px-3 py-1 rounded-full ">
          <p className="text-xs pr-2">apace.com/referralcode/ade23drax </p>
          <img src="/icons/copy.svg" />
        </div>
      </div>

      <div className="text-center p-4">
        <Link href="dashboard">
          <a className="text-sm text-apace-orange-light">
            See how you’re doing
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Referral;
