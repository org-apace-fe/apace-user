import type { NextPage } from "next";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import { useDispatch } from "react-redux";
import React, { ReactNode, useEffect, useState } from "react";
import router from "next/router";
import { background } from "../../../utils/background";
import moment from "moment";
import Table from "../../../components/dashboard/table";
import withAuth from "../../../route/with-auth";
import { numberWithCommas } from "../../../utils/formatNumber";
import isEmpty from "is-empty";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";
import { openModalAndSetContent } from "../../../store/actions/modal/modalActions";
import AskRefund from "../../../components/dashboard/modal/ask-a-refund";
import MakeComplaint from "../../../components/dashboard/modal/make-a-complaint";
import ReportPurchase from "../../../components/dashboard/modal/report-purchase";

const PurchaseDetail: NextPage = () => {
  const dispatch = useDispatch();
  const orderId = router?.query?.id;

  const [oneOrder, setOneOrder] = useState<any>();
  const [tableRowComplaints, setTableRowComplaints] = useState<any[]>();
  const [tableRowRequestRefund, setTableRowRequestRefund] = useState<any[]>();
  const orderDetail = oneOrder?.order;
  const orderComplaints = oneOrder?.complaints;
  const orderRefundRequest = oneOrder?.refund_requests;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const fetchOneOrder = async (orderId: any) => {
    try {
      dispatch(LoadingStart());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/purchase/${orderId}/detail`,
        { headers: headersRequest }
      );
      setOneOrder(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  type Data = {
    date: string;
    message: string;
    status: ReactNode;
  };

  const dataComplaints = () => {
    const tempArr: any[] = [];
    orderComplaints?.forEach((a: any) => {
      tempArr.push({
        date: `${a?.date} `,
        message: `${a?.interest}`,
        status: (
          <div>
            <span className="bg-red-400 h-1 w-1 rounded-full"> </span>
            {a?.status}
          </div>
        ),
      });
    });
    return tempArr;
  };

  const columnsComplaints = [
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Message",
      accessor: "message",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  const dataRequestRefund = () => {
    const tempArr: any[] = [];
    orderRefundRequest?.forEach((a: any) => {
      tempArr.push({
        date: `${a?.date} `,
        message: `${a?.interest}`,

        status: (
          <div>
            <span className="bg-red-400 h-1 w-1 rounded-full"> </span>
            {a?.status}
          </div>
        ),
      });
    });
    return tempArr;
  };

  const columnsRequestRefund = [
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Message",
      accessor: "message",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  useEffect(() => {
    fetchOneOrder(orderId);
  }, []);

  useEffect(() => {
    setTableRowComplaints(dataComplaints());
    setTableRowRequestRefund(dataRequestRefund());
  }, [oneOrder]);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <div className=" overflow-x-auto">
            <div className="min-w-lg lg:min-w-max max-h-screen border-b border-gray-600 pb-6 mb-6 flex items-center lg:justify-between lg:px-28 px-10">
              <div className="mr-4">
                {moment(orderDetail?.date_created).format("ll")} - &#8358;
                {numberWithCommas(orderDetail?.total_amount || 0)}
                <span className="rounded-full bg-apace-orange-dark py-1 px-2 text-black text-xs ml-3">
                  {orderDetail?.order_status}
                </span>
              </div>
              <div className="flex cursor-pointer ">
                <div
                  onClick={() =>
                    dispatch(
                      openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <AskRefund />
                          </>
                        ),
                      })
                    )
                  }
                  className="flex mr-4 "
                >
                  <img src="/icons/payout.svg" />
                  <p className="ml-2">Ask for a refund</p>
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
                            <MakeComplaint />
                          </>
                        ),
                      })
                    )
                  }
                  className="flex mr-4"
                >
                  <img src="/icons/payout.svg" />
                  <p className="ml-2">Make a complaint</p>
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
                            <ReportPurchase />
                          </>
                        ),
                      })
                    )
                  }
                  className="flex"
                >
                  <img src="/icons/payout.svg" />
                  <p className="ml-2">Report a purchase</p>
                </div>
              </div>
            </div>
          </div>
          <Container>
            <div className="flex lg:flex-row  flex-col flex-wrap">
              <div className=" lg:w-1/4 w-full h-32 mb-6 lg:pl-4 pl-0">
                <div className="h-full rounded-lg relative overflow-hidden bg-apace-black opacity-95 p-4">
                  <div className="absolute top-0 left-0 w-full h-full  ">
                    <img
                      src={orderDetail?.store_logo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p
                    className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                    style={{ zIndex: 100 }}
                  >
                    {orderDetail?.store}
                  </p>
                </div>
              </div>
              <div className=" lg:w-1/4 w-full h-32 mb-6 lg:pl-4 pl-0">
                <div
                  className="relative  h-full rounded-lg p-4"
                  style={{ background: background.apacegray6 }}
                >
                  <div className="flex">
                    <img src="/icons/payout.svg" />
                    <div className="ml-2">
                      <p className="text-sm">Deal </p>
                      <p className="text-lg">
                        Up to {orderDetail?.deal || 0} % off
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" lg:w-1/4 w-full h-32 mb-6 lg:pl-4 pl-0">
                <div
                  className="relative  h-full rounded-lg p-4"
                  style={{ background: background.apacegray6 }}
                >
                  <div className="flex">
                    <img src="/icons/payout.svg" />
                    <div className="ml-2">
                      <p className="text-sm">Referral points used</p>
                      <p className="text-lg">0</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" lg:w-1/4 w-full h-32 mb-6 lg:pl-4 pl-0">
                <div
                  className="relative  h-full rounded-lg p-4"
                  style={{ background: background.apacegray6 }}
                >
                  <div className="flex">
                    <img src="/icons/payout.svg" />
                    <div className="ml-2">
                      <p className="text-sm">Category</p>
                      <p className="text-lg">{orderDetail?.category || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xl mb-4">Complaints </p>
              {!isEmpty(dataComplaints) ? (
                <Table
                  data={tableRowComplaints ? tableRowComplaints : []}
                  columns={columnsComplaints ? columnsComplaints : []}
                />
              ) : (
                <div
                  className="flex justify-center h-56 rounded-lg items-center "
                  style={{ background: background.apacegray3 }}
                >
                  No complaints have been issued
                </div>
              )}
            </div>

            <div>
              <p className="text-xl mb-4">Refund request </p>
              {!isEmpty(dataRequestRefund) ? (
                <Table
                  data={tableRowRequestRefund ? tableRowRequestRefund : []}
                  columns={columnsRequestRefund ? columnsRequestRefund : []}
                />
              ) : (
                <div
                  className="flex justify-center h-56 rounded-lg items-center "
                  style={{ background: background.apacegray3 }}
                >
                  No refund requests have been placed
                </div>
              )}
            </div>
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default withAuth(PurchaseDetail);
