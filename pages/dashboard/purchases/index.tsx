import type { NextPage } from "next";
import React, { ReactNode, useState } from "react";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import Button from "../../../components/button";
import { background, ColorButton } from "../../../utils/background";
import Table from "../../../components/dashboard/table";
import { PurchaseAction } from "../../../components/dashboard/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import Loader from "../../../components/loader";
import withAuth from "../../../route/with-auth";
import { numberWithCommas } from "../../../utils/formatNumber";
import axios from "axios";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";

const Purchase: NextPage = () => {
  const dispatch = useDispatch();

  const [purchases, setPurchases] = useState<any>();
  const [miscellaneousStatistics, setMiscellaneousStatistics] = useState<any>();
  const [purchaseChart, setPurchaseChart] = useState<any>();
  const [tableRow, setTableRow] = useState<any[]>();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const loader = useSelector((state: any) => state.loader);
  const loaderOpened = loader.LoaderOpened;

  type DataPurchase = {
    total_amount: ReactNode;
    store: ReactNode;
    store_logo: string;
    category: string;
    deal: string;
    order_status: ReactNode;
    actions: ReactNode;
  };

  const dataPurchase = () => {
    const tempArr: any[] = [];
    purchases?.items.slice(0, 5).forEach((a: any) => {
      tempArr.push({
        total_amount: <p>&#8358; {numberWithCommas(a?.total_amount)} </p>,
        store: (
          <div className="flex items-center">
            <img className="w-10 h-10 mr-2 object-cover" src={a?.store_logo} />{" "}
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
      });
    });
    return tempArr;
  };

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

  const fetchMiscellaneousStatistics = async () => {
    try {
      dispatch(LoadingStart());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/miscellaneous/statistics/general`,
        { headers: headersRequest }
      );
      setMiscellaneousStatistics(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  const fetchPurchaseChart = async () => {
    try {
      dispatch(LoadingStart());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/purchase/charts`,
        { headers: headersRequest }
      );
      setPurchaseChart(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  useEffect(() => {
    fetchAllPurchases();
    fetchMiscellaneousStatistics();
    fetchPurchaseChart();
  }, []);

  useEffect(() => {
    setTableRow(dataPurchase());
  }, [purchases]);

  return (
    <div>
      <DashboardLayout>
        {tableRow ? (
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
                                miscellaneousStatistics?.total_amount_spent
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
                                miscellaneousStatistics?.current_credit_limit
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
                    data={tableRow ? tableRow : []}
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

export default withAuth(Purchase);
