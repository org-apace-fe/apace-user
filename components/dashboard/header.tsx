import { ApaceLogoIcon } from "../icons/logo";
import Link from "next/link";
import { Disclosure, Menu } from "@headlessui/react";
import {
  SearchIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import Notification from "./notification";
import Referral from "./referral";
import Profile from "./profile";
import { background } from "../../utils/background";
import Pills from "./pills";

const DashboardHeader = () => {
  return (
    <div className="min-h-full ">
      <Disclosure
        as="nav"
        className=" "
        style={{ background: background.apacegray5 }}
      >
        {({ open }) => (
          <>
            <div className="pt-5 pb-0  px-8 sm:px-6 lg:px-24 border-b border-gray-700 ">
              <div className="relative flex justify-between items-center w-full ">
                <Link href="/dashboard">
                  <a>
                    <ApaceLogoIcon />
                  </a>
                </Link>
                <div className="hidden md:block w-3/6">
                  <form className="w-full">
                    <div className="flex flex-row-reverse relative ">
                      <input
                        style={{ background: background.apacegray2 }}
                        className="py-2 pl-10 pr-4 w-full text-white rounded-full  outline-none "
                        placeholder="Search your favourite stores"
                      />
                      <div
                        className="absolute "
                        style={{ top: "0.5rem", left: "0.6rem" }}
                      >
                        <SearchIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="flex items-center justify-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-apace-orange-light  ">
                      <div>
                        <img src="/icons/notification.svg" />
                      </div>
                    </Menu.Button>

                    <Menu.Items
                      style={{ zIndex: 100, width: "30rem" }}
                      className="absolute md:block hidden right-0  mt-2 origin-top-right bg-gray-700 text-white rounded-md shadow-lg  "
                    >
                      <Notification />
                    </Menu.Items>
                  </Menu>
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-apace-orange-light  ">
                      <div>
                        <img src="/icons/referral.svg" />
                      </div>
                    </Menu.Button>
                    <Menu.Items
                      style={{ zIndex: 100 }}
                      className="absolute md:block hidden right-0 w-96 mt-2 origin-top-right bg-gray-700 text-white rounded-md shadow-lg  "
                    >
                      <Referral />
                    </Menu.Items>
                  </Menu>
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-apace-orange-light  ">
                      <div>
                        <img src="/icons/user-image.png" />
                      </div>
                    </Menu.Button>
                    <Menu.Items
                      style={{ zIndex: 100 }}
                      className="absolute md:block hidden right-0 w-80 mt-2 origin-top-right bg-gray-700 text-white rounded-md shadow-lg  "
                    >
                      <Profile />
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
              {/* tab */}
              <div>
                <div className="flex items-center  text-base   lg:flex mt-4 ">
                  <Pills href="/dashboard"> Stores </Pills>
                  <Pills href="/dashboard/overview"> Overview </Pills>
                  <Pills href="/dashboard/payments"> Payments </Pills>
                  <Pills href="/dashboard/purchase"> Purchase </Pills>
                  <Pills href="/dashboard/referrals"> Referrals </Pills>
                  <Pills href="/dashboard/settings"> Settings </Pills>
                </div>
              </div>
              {/* tab */}
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default DashboardHeader;
