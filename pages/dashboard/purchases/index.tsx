import type { NextPage } from "next";
import React, { ReactNode } from "react";

import Link from "next/link";

import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import Button from "../../../components/button";
import { background } from "../../../utils/background";
import { Menu, Transition } from "@headlessui/react";

import Table from "../../../components/dashboard/table";
import { Action } from "../../../components/dashboard/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllLoans,
  fetchAllLoansDue,
  fetchAllLoansStatistics,
} from "../../../store/actions/payment.action";
import { Column } from "react-table";
import moment from "moment";
import {
  fetchAllPurchases,
  fetchAllPurchaseStatistics,
  fetchPurchaseCharts,
} from "../../../store/actions/purchase.action";

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
  const dispatch = useDispatch();

  const purchase = useSelector((state: any) => state.purchase);

  const allPurchases = purchase?.allPurchases?.data;

  const stats = purchase?.allPurchaseStatistics?.data;
  const chart = purchase?.allPurchaseCharts?.data;

  type DataPurchase = {
    total_amount: number;
    store: ReactNode;
    store_logo: string;
    category: string;
    deal: string;
    order_status: string;
    actions: ReactNode;
  };

  const dataPurchase = React.useMemo<DataPurchase[]>(
    () =>
      allPurchases?.items.splice(0, 5).map((a: any) => {
        return {
          total_amount: `N ${a?.total_amount} `,
          store: (
            <div className="flex items-center">
              <img
                className="w-10 h-10 mr-2 object-cover"
                src={a?.store_logo}
              />{" "}
              {a?.store}
            </div>
          ),
          category: `${a?.category}`,
          deal: `up to ${a?.deal || 0}% off`,
          order_status: <Button> {a?.order_status} </Button>,
          actions: <Action id={a?.id} type="payments" />,
        };
      }),
    []
  );

  const columnsPurchase = React.useMemo<Column<DataPurchase>[]>(
    () => [
      {
        Header: "Amount",
        accessor: "total_amount",
      },

      {
        Header: "Store",
        accessor: "store",
      },
      {
        Header: "Category",
        accessor: "category",
      },

      {
        Header: "Deal",
        accessor: "deal",
      },
      {
        Header: "Payment status",
        accessor: "order_status",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchAllPurchases());
    dispatch(fetchPurchaseCharts());
    dispatch(fetchAllPurchaseStatistics());
  }, []);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <div className="flex lg:flex-row flex-col ">
              <div className="lg:w-5/12 w-full mr-4">
                {/* Payments */}
                <div className="flex lg:flex-row flex-col flex-wrap">
                  <div className="relative lg:w-full w-full lg:h-48 h-auto mb-6 pr-3">
                    <div
                      className="relative  h-full rounded-lg p-4 "
                      style={{ background: background.apacegray6 }}
                    >
                      <div className="absolute top-4 right-4">
                        <Action type="payments" />
                      </div>

                      <div className="flex  pb-8">
                        <img src="/icons/payout.svg" />
                        <div className="ml-4  ">
                          <p className="text-sm">Total all-time spend</p>
                          <p className="text-lg text-apace-orange-light">
                            N 5000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative lg:w-full w-full lg:h-48 h-auto mb-6 pr-3">
                    <div
                      className="relative  h-full rounded-lg p-4 "
                      style={{ background: background.apacegray6 }}
                    >
                      <div className="flex  pb-8">
                        <img src="/icons/payout.svg" />
                        <div className="ml-4  ">
                          <p className="text-sm">Current lending limit</p>
                          <p className="text-lg text-apace-orange-light">
                            N 5000
                          </p>
                        </div>
                      </div>

                      <div className="absolute botton-2 left-4">
                        <Button>Update limit</Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Payments */}
              </div>
              <div className="lg:w-7/12 w-full">
                <div className="flex lg:flex-row flex-col flex-wrap">
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

            <div className="mt-8 text-lg">
              <div>
                <div className="flex justify-between items-center">
                  <div className="text-xl">Purchase history</div>{" "}
                  <Button>View all</Button>
                </div>
                <Table data={dataPurchase} columns={columnsPurchase} />
              </div>
            </div>
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Payments;
