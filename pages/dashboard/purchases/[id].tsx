import type { NextPage } from "next";

import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";

import { useDispatch, useSelector } from "react-redux";

import React, { ReactNode, useEffect } from "react";
import { fetchSingleLoan } from "../../../store/actions/payment.action";
import router from "next/router";
import { background } from "../../../utils/background";
import moment from "moment";
import Button from "../../../components/button";
import { Column } from "react-table";
import Table from "../../../components/dashboard/table";
import { fetchSingleOrder } from "../../../store/actions/purchase.action";

const PurchaseDetail: NextPage = () => {
  const dispatch = useDispatch();
  const orderId = router.query.id;

  const order = useSelector((state: any) => state.purchase);

  const orderDetail = order?.oneOrder?.data?.order;
  const orderComplaints = order?.oneOrder?.data?.complaints;
  const orderRefundRequest = order?.oneOrder?.data?.refund_requests;

  console.log(orderDetail);

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));
  }, []);

  type Data = {
    date: string;
    message: string;
    status: ReactNode;
  };

  const dataComplaints = React.useMemo<Data[]>(
    () =>
      orderComplaints?.splice(0, 5).map((a: any) => {
        return {
          date: `${a?.date} `,
          message: `${a?.interest}`,

          status: (
            <div>
              <span className="bg-red-400 h-1 w-1 rounded-full"> </span>
              {a?.status}
            </div>
          ),
        };
      }),
    []
  );

  const columnsComplaints = React.useMemo<Column<Data>[]>(
    () => [
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
    ],
    []
  );

  const dataRequestRefund = React.useMemo<Data[]>(
    () =>
      orderRefundRequest?.splice(0, 5).map((a: any) => {
        return {
          date: `${a?.date} `,
          message: `${a?.interest}`,

          status: (
            <div>
              <span className="bg-red-400 h-1 w-1 rounded-full"> </span>
              {a?.status}
            </div>
          ),
        };
      }),
    []
  );

  const columnsRequestRefund = React.useMemo<Column<Data>[]>(
    () => [
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
    ],
    []
  );

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <div className="border-b border-gray-600 pb-6 mb-6 flex items-center justify-between px-28">
            <div>
              {moment(orderDetail?.date_created).format("ll")} - N
              {orderDetail?.total_amount}
              <span className="rounded-full bg-apace-orange-dark py-1 px-2 text-black text-xs ml-3">
                {orderDetail?.order_status}
              </span>
            </div>
            <div className="flex">
              <div className="flex mr-4 ">
                <img src="/icons/payout.svg" />
                <p className="ml-2">Ask for a refund</p>
              </div>
              <div className="flex mr-4">
                <img src="/icons/payout.svg" />
                <p className="ml-2">Make a complaint</p>
              </div>
              <div className="flex">
                <img src="/icons/payout.svg" />
                <p className="ml-2">Report a purchase</p>
              </div>
            </div>
          </div>
          <Container>
            <div className="flex lg:flex-row  flex-col flex-wrap">
              <div className=" lg:w-1/4 w-full h-32 mb-6 pl-4">
                <div
                  className="relative  h-full rounded-lg p-4"
                  style={{ background: background.apacegray6 }}
                >
                  <div className="flex">
                    <img src="/icons/payout.svg" />
                    <div className="ml-2">
                      <p className="text-sm">Loan amount</p>
                      <p className="text-lg">
                        {orderDetail?.amount || 0} Points
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" lg:w-1/4 w-full h-32 mb-6 pl-4">
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
              <div className=" lg:w-1/4 w-full h-32 mb-6 pl-4">
                <div
                  className="relative  h-full rounded-lg p-4"
                  style={{ background: background.apacegray6 }}
                >
                  <div className="flex">
                    <img src="/icons/payout.svg" />
                    <div className="ml-2">
                      <p className="text-sm">Referral points used</p>
                      <p className="text-lg">
                        {moment(orderDetail?.due_date).format("ll") || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" lg:w-1/4 w-full h-32 mb-6 pl-4">
                <div
                  className="relative  h-full rounded-lg p-4"
                  style={{ background: background.apacegray6 }}
                >
                  <div className="flex">
                    <img src="/icons/payout.svg" />
                    <div className="ml-2">
                      <p className="text-sm">Category</p>
                      <p className="text-lg">
                        {orderDetail?.amount || 0} Points
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xl mb-4">Complaints </p>
              <Table
                data={dataComplaints ? dataComplaints : []}
                columns={columnsComplaints ? columnsComplaints : []}
              />
            </div>

            <div>
              <p className="text-xl mb-4">Refund request </p>
              <Table
                data={dataRequestRefund ? dataRequestRefund : []}
                columns={columnsRequestRefund ? columnsRequestRefund : []}
              />
            </div>
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default PurchaseDetail;
