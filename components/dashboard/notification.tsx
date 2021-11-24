import Link from "next/link";
import { background } from "../../utils/background";

const Notification = () => {
  return (
    <div
      className=" rounded-lg overflow-hidden"
      style={{
        background:
          background.apacegray3,
      }}
    >
      <div
        className="flex justify-between py-4 px-4"
        style={{
          background:
            background.apacegray2,
        }}
      >
        <span>Notifications</span>
        <div className="text-apace-orange-light">Mark as read</div>
      </div>
      <div className="flex flex-col justify-center items-center py-4">
        <img src="/icons/success.svg" />
        <div> You are all good</div>
      </div>
      <div className="p-4 ">
        <div className="relative ">
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex">
                <img src="/icons/unread.svg" />
                <p className="text-sm ml-2">Purchase success</p>
              </div>
              <p className="text-xs">
                A customer bought an item from ‘Gadget Haven’ worth NGN 57,000.
              </p>
            </div>
            <p className="text-sm">22hrs</p>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex">
                <img src="/icons/unread.svg" />
                <p className="text-sm ml-2">Purchase success</p>
              </div>
              <p className="text-xs">
                A customer bought an item from ‘Gadget Haven’ worth NGN 57,000.
              </p>
            </div>
            <p className="text-sm">22hrs</p>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex">
                <img src="/icons/read.svg" />
                <p className="text-sm ml-2">Purchase success</p>
              </div>
              <p className="text-xs">
                A customer bought an item from ‘Gadget Haven’ worth NGN 57,000.
              </p>
            </div>
            <p className="text-sm">22hrs</p>
          </div>
        </div>
      </div>
      <div
        className=" flex flex-col justify-center items-center py-4"
        style={{
          background:
            background.apacegray2,
        }}
      >
        <Link href="/dashboard">
          <a> See all</a>
        </Link>
      </div>
    </div>
  );
};

export default Notification;
