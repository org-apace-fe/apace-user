import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  SearchIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import { ApaceLogoIcon } from "./icons/logo";
import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const router = useRouter();

  const noDropDownnavigation = [
    { name: "For Business", href: "/business", current: false },
  ];

  const dropDownNavigation = [
    {
      name: "For Shoppers",
      href: "#",
      current: false,
      subNav: [
        { name: "All Stores", href: "/stores", current: false },
        { name: "Shop online", href: "/stores", current: false },
        { name: "Shop in-store", href: "/stores", current: false },
        { name: "Top deals", href: "/stores", current: false },
        { name: "Featured stores", href: "/stores", current: false },
        { name: "Categories", href: "/stores", current: false },
      ],
    },
    {
      name: "How to Apace",
      href: "#",
      current: false,
      subNav: [
        { name: "Why Apace", href: "/why", current: false },
        { name: "How it works", href: "/how", current: false },
        { name: "Refer a friend", href: "/refer", current: false },
        { name: "Get the app", href: "/get-app", current: false },
        { name: "About us", href: "/about", current: false },
        { name: "Blog", href: "/blog", current: false },
      ],
    },
  ];

  const authNavigation = [
    {
      name: "Sign In",
      href: "#",
      current: false,
      subNav: [
        { name: "As shopper", href: "/auth/shopper/sign-in", current: false },
        {
          name: "As business",
          href: `${process.env.NEXT_PUBLIC_ENV_STORE_ADMIN_URL}`,
          current: false,
        },
      ],
    },
    {
      name: "Sign Up",
      href: "#",
      current: true,
      subNav: [
        { name: "As shopper", href: "/auth/shopper/sign-up", current: false },
        { name: "As business", href: "/auth/signup-options", current: false },
      ],
    },
  ];

  const hamburgerNavigation = [
    {
      name: "hamburger",
      href: "#",
      current: false,
      subNav: [
        { name: "Help", href: "/help", current: false },
        { name: "FAQ's", href: "/faq", current: false },
        { name: "For developers", href: "/auth/sign-in", current: false },
        { name: "For partners", href: "/auth/sign-in", current: false },
        { name: "Privacy policy", href: "/auth/sign-in", current: false },
        { name: "Terms of use", href: "/auth/sign-in", current: false },
        {
          name: "Notices & disclosures",
          href: "/auth/sign-in",
          current: false,
        },
      ],
    },
  ];

  return (
    <>
      <div className="min-h-full ">
        <Disclosure
          as="nav"
          className="bg-apace-black border-b  border-gray-800 "
        >
          {({ open }) => (
            <>
              <div className="mx-auto px-8 sm:px-6  lg:px-24">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0  ">
                      <Link href="/">
                        <a>
                          <ApaceLogoIcon />
                        </a>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {dropDownNavigation.map((nav) => (
                          <Menu
                            key={nav.name}
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-apace-orange-light  ">
                                {nav.name}
                                <ChevronDownIcon
                                  className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                style={{ zIndex: 100 }}
                                className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-700 text-white rounded-md shadow-lg  "
                              >
                                {nav.subNav.map((a) => (
                                  <div className="px-1 py-1 " key={a.name}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link href={a.href}>
                                          <a
                                            className={`${
                                              active
                                                ? "bg-violet-500  "
                                                : "text-white"
                                            } group text-white flex rounded-md items-center w-full px-2 py-2 text-sm   `}
                                          >
                                            {a.name}
                                          </a>
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  </div>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        ))}

                        {noDropDownnavigation.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <a
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300  hover:text-apace-orange-light",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <SearchIcon className="h-6 w-6 " aria-hidden="true" />
                      </button>

                      {authNavigation.map((nav) => (
                        <Menu
                          key={nav.name}
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <Menu.Button className="bg-apace-orange-light border-apace-orange-light text-black px-6 ml-3 py-2 rounded-full text-sm font-medium ">
                              {nav.name}
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              style={{ zIndex: 100 }}
                              className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-700 text-white rounded-md shadow-lg "
                            >
                              {nav.subNav.map((a) => (
                                <div className="px-1 py-1 " key={a.name}>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link href={a.href}>
                                        <a
                                          className={`${
                                            active
                                              ? "bg-violet-500  "
                                              : "text-white"
                                          } group text-white flex rounded-md items-center w-full px-2 py-2 text-sm  `}
                                        >
                                          {a.name}
                                        </a>
                                      </Link>
                                    )}
                                  </Menu.Item>
                                </div>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ))}

                      {/* hamburger */}
                      {hamburgerNavigation.map((nav) => (
                        <Menu
                          key={nav.name}
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <Menu.Button className=" text-white px-6 ml-3 py-2  ">
                              <MenuIcon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              style={{ zIndex: 100 }}
                              className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-700 text-white rounded-md shadow-lg "
                            >
                              {nav.subNav.map((a) => (
                                <div className="px-1 py-1 " key={a.name}>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link href={a.href}>
                                        <a
                                          className={`${
                                            active
                                              ? "bg-violet-500  "
                                              : "text-white"
                                          } group text-white flex rounded-md items-center w-full px-2 py-2 text-sm  `}
                                        >
                                          {a.name}
                                        </a>
                                      </Link>
                                    )}
                                  </Menu.Item>
                                </div>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ))}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {dropDownNavigation.map((nav) => (
                    <Disclosure key={nav.name}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex justify-between w-full px-3 py-2  text-left text-gray-200 font-bold focus:outline-none">
                            <span> {nav.name} </span>
                            <ChevronUpIcon
                              className={`${
                                open ? "transform rotate-180" : ""
                              } w-5 h-5 `}
                            />
                          </Disclosure.Button>
                          {nav.subNav.map((a) => (
                            <Disclosure.Panel
                              key={a.name}
                              className="px-4 pt-2 pb-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white rounded-md "
                            >
                              <Link href={a.href}>
                                <a> {a.name} </a>
                              </Link>
                            </Disclosure.Panel>
                          ))}
                        </>
                      )}
                    </Disclosure>
                  ))}

                  {noDropDownnavigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <button
                      type="button"
                      className=" bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <SearchIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {authNavigation.map((nav) => (
                      <Disclosure key={nav.name}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full px-3 py-2  text-left text-gray-200 font-bold focus:outline-none">
                              <span> {nav.name} </span>
                              <ChevronUpIcon
                                className={`${
                                  open ? "transform rotate-180" : ""
                                } w-5 h-5 `}
                              />
                            </Disclosure.Button>
                            {nav.subNav.map((a) => (
                              <Disclosure.Panel
                                key={a.name}
                                className="px-4 pt-2 pb-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white rounded-md "
                              >
                                <Link href={a.href}>
                                  <a> {a.name} </a>
                                </Link>
                              </Disclosure.Panel>
                            ))}
                          </>
                        )}
                      </Disclosure>
                    ))}
                    {hamburgerNavigation.map((nav) => (
                      <Disclosure key={nav.name}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full px-3 py-2  text-left text-gray-200 font-bold focus:outline-none">
                              <MenuIcon
                                className="block text-white h-6 w-6"
                                aria-hidden="true"
                              />
                              <ChevronUpIcon
                                className={`${
                                  open ? "transform rotate-180" : ""
                                } w-5 h-5 `}
                              />
                            </Disclosure.Button>
                            {nav.subNav.map((a) => (
                              <Disclosure.Panel
                                key={a.name}
                                className="px-4 pt-2 pb-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white rounded-md "
                              >
                                <Link href={a.href}>
                                  <a> {a.name} </a>
                                </Link>
                              </Disclosure.Panel>
                            ))}
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Header;
