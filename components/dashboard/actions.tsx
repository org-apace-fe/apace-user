import { Menu, Transition } from "@headlessui/react";
import { background } from "../../utils/background";
import Link from "next/link";
import MyModal from "./modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModalAndSetContent } from "../../store/actions/modal/modalActions";
import Button from "../../components/button";
import Liquidate from "./modal/liquidate";
import AskRefund from "./modal/ask-a-refund";
import MakeComplaint from "./modal/make-a-complaint";
import ReportPurchase from "./modal/report-purchase";

type PaymentActionProps = {
  id: number;
  amount: string;
};

export const PaymentAction = ({ id, amount }: Partial<PaymentActionProps>) => {
  const dispatch = useDispatch();

  const More = [
    {
      name: "View detail",
      href: `/dashboard/payments/${id}`,
    },
    {
      name: "Go to purchase",
      href: "/dashboard/purchases",
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
          <div
            className="flex flex-col"
            onClick={() =>
              dispatch(
                openModalAndSetContent({
                  modalStyles: {
                    padding: 0,
                  },
                  modalContent: (
                    <>
                      <Liquidate id={id} amount={amount} />
                    </>
                  ),
                })
              )
            }
          >
            <div className="flex my-1 rounded-lg w-full cursor-pointer hover:bg-gray-800 p-2 ">
              <img src="/icons/payout.svg" />
              <a className="ml-3">Crash Loan</a>
            </div>
          </div>

          <MyModal />
        </div>
      </Menu.Items>
    </Menu>
  );
};

type PurchaseActionProps = {
  id: number;
  reference: string;
};

export const PurchaseAction = ({
  id,
  reference,
}: Partial<PurchaseActionProps>) => {
  const dispatch = useDispatch();

  const PurchaseMore = [
    {
      name: "View detail",
      href: `/dashboard/purchases/${id}`,
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
          <div
            onClick={() =>
              dispatch(
                openModalAndSetContent({
                  modalStyles: {
                    padding: 0,
                  },
                  modalContent: (
                    <>
                      <AskRefund id={id} reference={reference} />
                    </>
                  ),
                })
              )
            }
            className="flex flex-col"
          >
            <div className="flex my-1 rounded-lg w-full cursor-pointer hover:bg-gray-800 p-2 ">
              <img src="/icons/payout.svg" />
              <a className="ml-3">Ask for refund</a>
            </div>
          </div>
          <div
            onClick={() =>
              dispatch(
                openModalAndSetContent({
                  modalStyles: {
                    padding: 0,
                  },
                  modalContent: (
                    <>
                      <MakeComplaint id={id} reference={reference} />
                    </>
                  ),
                })
              )
            }
            className="flex flex-col "
          >
            <div className="flex my-1 rounded-lg w-full cursor-pointer hover:bg-gray-800 p-2 ">
              <img src="/icons/payout.svg" />
              <a className="ml-3">Make a complaint</a>
            </div>
          </div>
          <div
            onClick={() =>
              dispatch(
                openModalAndSetContent({
                  modalStyles: {
                    padding: 0,
                  },
                  modalContent: (
                    <>
                      <ReportPurchase id={id} reference={reference} />
                    </>
                  ),
                })
              )
            }
            className="flex flex-col"
          >
            <div className="flex my-1 rounded-lg w-full cursor-pointer hover:bg-gray-800 p-2 ">
              <img src="/icons/payout.svg" />
              <a className="ml-3">Report Purchase</a>
            </div>
          </div>
        </div>
      </Menu.Items>
    </Menu>
  );
};
