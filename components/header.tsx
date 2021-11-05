import { Disclosure } from "@headlessui/react";
import { SearchIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Button from "./button";
import { ApaceLogoIcon } from "./icons/logo";
import { useRouter } from "next/router";
import Link from "next/link";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const router = useRouter();

  const navigation = [
    { name: "For Shoppers", href: "#", current: false },
    { name: "For Business", href: "#", current: false },
    { name: "How to APace", href: "#", current: false },
  ];

  const authNavigation = [
    { name: "Sign In", href: "/auth/sign-in", current: false },
    { name: "Sign Up", href: "/auth/signup-options", current: true },
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
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
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

                      {authNavigation.map((item) => (
                        <span key={item.name}>
                          <Button
                            onClick={() => router.push(item.href)}
                            className={classNames(
                              item.current
                                ? "bg-apace-orange-light border-apace-orange-light text-black"
                                : "text-gray-300 border-none",
                              "px-6 ml-3 py-2 rounded-full text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </Button>
                        </span>
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
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
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
                    {authNavigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                          {item.name}
                        </a>
                      </Link>
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
