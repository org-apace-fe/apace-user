import type { NextPage } from "next";
import React, { ReactNode, useState } from "react";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import Button from "../../../components/button";
import { background, ColorButton } from "../../../utils/background";
import { PurchaseAction } from "../../../components/dashboard/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import PaginationTable from "../../../components/dashboard/table/pagination-table";
import withAuth from "../../../route/with-auth";
import { numberWithCommas } from "../../../utils/formatNumber";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";
import Loader from "../../../components/loader";

const PurchaseAll: NextPage = () => {
  const dispatch = useDispatch();

  const [purchases, setPurchases] = useState<any>();
  const [purchaseStatistics, setPurchaseStatistics] = useState<any>();
  const [tableRow, setTableRow] = useState<any[]>();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  type DataPurchase = {
    s_n: number;
    date_created: string;
    total_amount: ReactNode;
    store: ReactNode;
    category: string;
    deal: string;
    order_status: ReactNode;
    actions: ReactNode;
  };

  const dataPurchase = () => {
    const tempArr: DataPurchase[] = [];
    purchases?.items.forEach((a: any, index: any) => {
      tempArr.push({
        s_n: index + 1,
        date_created: `${moment(a?.date_created).format("ll")}`,
        total_amount: <p> &#8358; {numberWithCommas(a?.total_amount)} </p>,
        store: (
          <div className="flex items-center">
            <img className="w-10 h-10 mr-2 object-cover" src={a?.store_logo} />
            {a?.store}
          </div>
        ),
        category: `${a?.category}`,
        deal: `up to ${a?.deal || 0}% off`,
        order_status: (
          <Button className={ColorButton(a?.order_status)}>
            {a?.order_status}
          </Button>
        ),
        actions: <PurchaseAction id={a?.id} reference={a?.order_reference} />,
      });
    });
    return tempArr;
  };

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

  const fetchAllPurchases = () => {
    dispatch(LoadingStart());
    axios
      .get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/purchase/all`,
        { headers: headersRequest }
      )
      .then((res) => {
        setPurchases(res?.data?.data);
        dispatch(LoadingStop());
      })
      .catch((err) => {
        dispatch(LoadingStop());
      });
  };

  const fetchAllPurchaseStatistics = async () => {
    try {
      dispatch(LoadingStart());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/purchase/statistics`,
        { headers: headersRequest }
      );
      setPurchaseStatistics(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  useEffect(() => {
    fetchAllPurchases();
    fetchAllPurchaseStatistics();
  }, []);

  useEffect(() => {
    setTableRow(dataPurchase());
  }, [purchases]);

  return (
    <div>
      <DashboardLayout>
        {purchaseStatistics && purchases ? (
          <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
            <Container>
              <div className="flex lg:flex-row flex-col ">
                <div className="lg:w-full w-full">
                  <div className="flex lg:flex-row flex-col flex-wrap">
                    <div className=" lg:w-1/3 w-full mb-6 lg:pr-4 pr-0  ">
                      <div className="h-32  ">
                        <div
                          className="relative  h-full rounded-lg p-4"
                          style={{ background: background.apacegray6 }}
                        >
                          <div className="flex">
                            <img src="/icons/lending-limit.svg" />
                            <div className="ml-2">
                              <p className="text-sm">
                                Total amount on purchases
                              </p>
                              <p className="text-lg">
                                &#8358;
                                {numberWithCommas(
                                  purchaseStatistics?.total_all_time_spent
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" lg:w-1/3 w-full mb-6  lg:pr-4 pr-0">
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
                                {purchaseStatistics?.total_store_purchase_from}
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
                              <p className="text-lg">
                                {purchaseStatistics?.total_purchases}
                              </p>
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
                    data={tableRow ? tableRow : []}
                    columns={columnsPurchase ? columnsPurchase : []}
                    tablePage={purchases?.page && purchases?.page}
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

export default withAuth(PurchaseAll);
