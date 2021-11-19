import type { NextPage } from "next";
import Layout from "../../components/layout";
import Banner from "../../components/banner";
import FavouriteStores from "../../components/favourite-stores";
import Invite from "../../components/invite";
import ApaceApp from "../../components/apace-app";
import Link from "next/link";

import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";
import Button from "../../components/button";
import { background } from "../../utils/background";
import { Menu, Transition } from "@headlessui/react";

import Table from "../../components/dashboard/table";
import { PaymentAction } from "../../components/dashboard/actions";

const Dummy = [{ id: 1 }, { id: 2 }, { id: 3 }];

const More = [
  {
    name: "View detail",
    href: "/dashboard",
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

const Payments: NextPage = () => {
  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <div
              className="relative p-5 rounded-xl"
              style={{ background: background.apacegray3 }}
            >
              <h1 className="text-lg mb-4">All payments due</h1>
              <div className="flex lg:flex-row flex-col ">
                <div className="lg:w-6/12 w-full mr-4">
                  {/* Payments */}
                  <div className="flex lg:flex-row flex-col flex-wrap">
                    {Dummy.map(() => (
                      <div className="relative lg:w-1/2 w-full lg:h-64 h-auto mb-6 pr-3">
                        <div
                          className="relative  h-full rounded-lg p-4 "
                          style={{ background: background.apacegray6 }}
                        >
                          <div className="absolute top-4 right-4">
                            <PaymentAction />
                          </div>

                          <div className="flex border-b border-gray-600 pb-8">
                            <img src="/icons/payout.svg" />
                            <div className="ml-4  ">
                              <p className="text-sm">Total loans due</p>
                              <p className="text-lg text-apace-orange-light">
                                N 160,840.00
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center mt-6">
                            <div className="lg:w-1/2 w-full mb-5">
                              <p className="text-sm">Loan amount</p>
                              <p>N 130,00.00</p>
                            </div>
                            <div className="lg:w-1/2 w-full mb-5">
                              <p className="text-sm">Interest (%)</p>
                              <p>4% / mo </p>
                            </div>
                            <div className="lg:w-1/2 w-full">
                              <p className="text-sm">Due</p>
                              <p>01 Nov 2021 </p>
                            </div>
                            <div className="lg:w-1/2 w-full">
                              <p className="text-sm">Store</p>
                              <p>Booking.com </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Payments */}
                </div>
                <div className="lg:w-6/12 w-full">
                  <div className="flex lg:flex-row flex-col flex-wrap">
                    <div className=" lg:w-1/2 w-full h-32 mb-6 pr-2">
                      <div
                        className="relative  h-full rounded-lg p-4 "
                        style={{ background: background.apacegray6 }}
                      >
                        <div className="flex">
                          <img src="/icons/payout.svg" />
                          <div className="ml-4">
                            <p className="text-sm">Total due</p>
                            <p className="text-lg text-apace-orange-light">
                              N 160,840.00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" lg:w-1/2 w-full h-32 mb-6 pl-4">
                      <div
                        className="relative  h-full rounded-lg p-4"
                        style={{ background: background.apacegray6 }}
                      >
                        <div className="flex">
                          <img src="/icons/payout.svg" />
                          <div className="ml-2">
                            <p className="text-sm">Total current loan amount</p>
                            <p className="text-lg"> N 160,840.00 </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" lg:w-1/2 w-full h-32 mb-6 pr-2">
                      <div
                        className="relative  h-full rounded-lg p-4 "
                        style={{ background: background.apacegray6 }}
                      >
                        <div className="flex">
                          <img src="/icons/receipt.svg" />
                          <div className="ml-4">
                            <p className="text-sm">Total all time loans</p>
                            <p className="text-lg text-apace-orange-light">
                              N 1,231,000
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" lg:w-1/2 w-full h-32 mb-6 pl-4">
                      <div
                        className="relative  h-full rounded-lg p-4"
                        style={{ background: background.apacegray6 }}
                      >
                        <div className="flex">
                          <img src="/icons/lending-limit.svg" />
                          <div className="ml-2">
                            <p className="text-sm">
                              Total payments made acr...
                            </p>
                            <p className="text-lg"> N 279,664 </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" lg:w-1/2 w-full h-32 mb-6 ">
                      <div
                        className="relative  h-full rounded-lg p-4"
                        style={{ background: background.apacegray6 }}
                      >
                        <div className="flex">
                          <img src="/icons/lending-limit.svg" />
                          <div className="ml-2">
                            <p className="text-sm">Current credit limit</p>
                            <p className="text-lg"> N 676,844.45</p>
                          </div>
                        </div>
                        <Link href="/">
                          <div className="absolute bottom-4 right-4 flex">
                            <img src="/icons/arrow-forward.svg" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-lg">
              <div>
                <div className="flex justify-between items-center">
                  <div className="text-xl">Payment history</div>{" "}
                  <Button>View all</Button>
                </div>
                <Table />
              </div>
            </div>
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Payments;
