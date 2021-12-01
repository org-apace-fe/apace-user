import type { NextPage } from "next";
import React, { ReactNode } from "react";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import Button from "../../../components/button";
import { background, ColorButton } from "../../../utils/background";
import { PurchaseAction } from "../../../components/dashboard/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  fetchAllPurchases,
  fetchAllPurchaseStatistics,
  fetchPurchaseCharts,
} from "../../../store/actions/purchase.action";
import PaginationTable from "../../../components/dashboard/table/pagination-table";
import withAuth from "../../../route/with-auth";
import { numberWithCommas } from "../../../utils/formatNumber";

const Payments: NextPage = () => {
  const dispatch = useDispatch();

  const purchase = useSelector((state: any) => state.purchase);

  const allPurchases = purchase?.allPurchases?.data;

  const page = allPurchases?.page;

  const stats = purchase?.allPurchaseStatistics?.data;
  const chart = purchase?.allPurchaseCharts?.data;

  type DataPurchase = {
    s_n: number;
    date_created: string;
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
      allPurchases?.items.map((a: any, index: any) => {
        return {
          s_n: index + 1,
          date_created: `${moment(a?.date_created).format("ll")}`,
          total_amount: <p> &#8358; {numberWithCommas(a?.total_amount)} </p>,
          store: (
            <div className="flex items-center">
              <img
                className="w-10 h-10 mr-2 object-cover"
                src={a?.store_logo}
              />
              {a?.store}
            </div>
          ),
          category: `${a?.category}`,
          deal: `up to ${a?.deal || 0}% off`,
          order_status: (
            <Button className={ColorButton(a?.order_status)}>
              {" "}
              {a?.order_status}{" "}
            </Button>
          ),
          actions: <PurchaseAction id={a?.id} />,
        };
      }),
    [allPurchases]
  );

  const columnsPurchase = [
    {
      Header: "S/N",
      accessor: "s_n",
    },
    {
      Header: "Date",
      accessor: "date_created",
    },
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
  }, []);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <div className="flex lg:flex-row flex-col ">
              <div className="lg:w-full w-full">
                <div className="flex lg:flex-row flex-col flex-wrap">
                  <div className=" lg:w-1/3 w-full mb-6 pr-4  ">
                    <div className="h-32  ">
                      <div
                        className="relative  h-full rounded-lg p-4"
                        style={{ background: background.apacegray6 }}
                      >
                        <div className="flex">
                          <img src="/icons/lending-limit.svg" />
                          <div className="ml-2">
                            <p className="text-sm">Total amount on purchases</p>
                            <p className="text-lg">
                              &#8358;{" "}
                              {numberWithCommas(stats?.total_all_time_spent)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" lg:w-1/3 w-full mb-6  pr-4">
                    <div className="h-32  ">
                      <div
                        className="relative  h-full rounded-lg p-4"
                        style={{ background: background.apacegray6 }}
                      >
                        <div className="flex">
                          <img src="/icons/lending-limit.svg" />
                          <div className="ml-2">
                            <p className="text-sm">
                              Total stores purchased from
                            </p>
                            <p className="text-lg">
                              {stats?.total_store_purchase_from}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" lg:w-1/3 w-full mb-6 ">
                    <div className="h-32 ">
                      <div
                        className="relative  h-full rounded-lg p-4"
                        style={{ background: background.apacegray6 }}
                      >
                        <div className="flex">
                          <img src="/icons/lending-limit.svg" />
                          <div className="ml-2">
                            <p className="text-sm">Total purchases</p>
                            <p className="text-lg"> {stats.total_purchases} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-lg">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl">Purchase history</div>
                </div>
                <PaginationTable
                  data={dataPurchase ? dataPurchase : []}
                  columns={columnsPurchase ? columnsPurchase : []}
                  tablePage={page && page}
                />
              </div>
            </div>
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default withAuth(Payments);
