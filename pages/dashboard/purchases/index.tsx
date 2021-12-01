import type { NextPage } from "next";
import React, { ReactNode } from "react";

import Link from "next/link";

import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import Button from "../../../components/button";
import { background } from "../../../utils/background";
import { Menu, Transition } from "@headlessui/react";

import Table from "../../../components/dashboard/table";
import { PurchaseAction } from "../../../components/dashboard/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Column } from "react-table";
import moment from "moment";
import {
  fetchAllPurchases,
  fetchAllPurchaseStatistics,
  fetchPurchaseCharts,
} from "../../../store/actions/purchase.action";
import router from "next/router";
import Loader from "../../../components/loader";
import withAuth from "../../../route/with-auth";
import { numberWithCommas } from "../../../utils/formatNumber";
import { fetchMiscelaneousStatistics } from "../../../store/actions/user.action";

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

  const miscellaneousStats = useSelector((state: any) => state.auth);

  const miscellaneous = miscellaneousStats?.miscellaneousStatistics?.data;

  const loader = useSelector((state: any) => state.loader);
  const loaderOpened = loader.LoaderOpened;

  type DataPurchase = {
    total_amount: ReactNode;
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
          total_amount: <p>&#8358; {numberWithCommas(a?.total_amount)} </p>,
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
          actions: <PurchaseAction id={a?.id} />,
        };
      }),
    [allPurchases]
  );

  const columnsPurchase = [
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
  ];

  useEffect(() => {
    dispatch(fetchAllPurchases());
    dispatch(fetchPurchaseCharts());
    dispatch(fetchAllPurchaseStatistics());
    dispatch(fetchMiscelaneousStatistics());
  }, []);

  return (
    <div>
      <DashboardLayout>
        {!loaderOpened && dataPurchase ? (
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
                          <PurchaseAction />
                        </div>

                        <div className="flex  pb-8">
                          <img src="/icons/payout.svg" />
                          <div className="ml-4  ">
                            <p className="text-sm">Total all-time spend</p>
                            <p className="text-lg text-apace-orange-light">
                              &#8358;{" "}
                              {numberWithCommas(
                                miscellaneous?.total_amount_spent
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative lg:w-full w-full lg:h-48 h-52 mb-6 pr-3">
                      <div
                        className="relative  h-full rounded-lg p-4 "
                        style={{ background: background.apacegray6 }}
                      >
                        <div className="flex  pb-8">
                          <img src="/icons/payout.svg" />
                          <div className="ml-4  ">
                            <p className="text-sm">Current lending limit</p>
                            <p className="text-lg text-apace-orange-light">
                              &#8358;{" "}
                              {numberWithCommas(
                                miscellaneous?.current_credit_limit
                              )}
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
                <div className="lg:w-7/12 w-full">Chart</div>
              </div>

              <div className="mt-8 text-lg">
                <div>
                  <div className="flex justify-between items-center">
                    <div className="text-xl">Purchase history</div>{" "}
                    <Button
                      onClick={() => router.push("/dashboard/purchases/all")}
                    >
                      View all
                    </Button>
                  </div>

                  <Table
                    data={dataPurchase ? dataPurchase : []}
                    columns={columnsPurchase ? columnsPurchase : []}
                  />
                </div>
              </div>
            </Container>
          </div>
        ) : (
          <Loader />
        )}
      </DashboardLayout>
    </div>
  );
};

export default withAuth(Payments);
