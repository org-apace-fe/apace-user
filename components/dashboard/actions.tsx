import { Menu, Transition } from "@headlessui/react";
import { background } from "../../utils/background";
import Link from "next/link";

type PaymentActionProps = {
  id: number;
};

export const PaymentAction = ({ id }: Partial<PaymentActionProps>) => {
  const More = [
    {
      name: "View detail",
      href: `/dashboard/payments/${id}`,
    },
    {
      name: "Go to purchase",
      href: "/dashboard",
    },
    {
      name: "Crash loan",
      href: "/dashboard",
    },
    {
      name: "Visit store",
      href: "/dashboard",
    },
  ];
  return (
    <Menu as="div">
      <div>
        <Menu.Button>
          <img src="/icons/more.svg" />
        </Menu.Button>
      </div>

      <Menu.Items
        style={{ background: background.apacegray4 }}
        className="absolute p-2 right-0 w-56 mt-2 origin-top-right  divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="px-1 py-1 ">
          <Menu.Item>
            {({ active }) => (
              <div className="flex flex-col">
                {More.map((more) => (
                  <Link href={more.href}>
                    <div className="flex my-1 rounded-lg w-full cursor-pointer hover:bg-gray-800 p-2 ">
                      <img src="/icons/payout.svg" />
                      <a className="ml-3">{more.name}</a>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

type PurchaseActionProps = {
  id: number;
};

export const PurchaseAction = ({ id }: Partial<PurchaseActionProps>) => {
  const PurchaseMore = [
    {
      name: "View detail",
      href: `/dashboard/purchases/${id}`,
    },
    {
      name: "Ask for a refund",
      href: "/dashboard",
    },
    {
      name: "Make a complaint",
      href: "/dashboard",
    },
    {
      name: "Report Purchase",
      href: "/dashboard",
    },
  ];
  return (
    <Menu as="div" className="">
      <div>
        <Menu.Button className="">
          <img src="/icons/more.svg" />
        </Menu.Button>
      </div>

      <Menu.Items
        style={{ background: background.apacegray4 }}
        className="absolute p-2 right-0 w-56 mt-2 origin-top-right  divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="px-1 py-1 ">
          <Menu.Item>
            {({ active }) => (
              <div className="flex flex-col">
                {PurchaseMore.map((more) => (
                  <Link href={more.href}>
                    <div className="flex my-1 rounded-lg w-full cursor-pointer hover:bg-gray-800 p-2 ">
                      <img src="/icons/payout.svg" />
                      <a className="ml-3">{more.name}</a>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};
