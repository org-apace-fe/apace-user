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
import Table from "../../../components/dashboard/table";
import withAuth from "../../../route/with-auth";
import { numberWithCommas } from "../../../utils/formatNumber";

const PaymentDetail: NextPage = () => {
  const dispatch = useDispatch();
  const loanId = router.query.id;

  const loan = useSelector((state: any) => state.payment);

  const loanDetail = loan?.oneLoan?.data?.loan_detail;
  const order = loan?.oneLoan?.data?.order;
  const loanRepayments = loan?.oneLoan?.data?.loan_repayments;

  useEffect(() => {
    dispatch(fetchSingleLoan(loanId));
  }, []);

  type DataPayment = {
    amount: number;
    interest: string;
    due_date: string;
    date_completed: string;
    status: ReactNode;
  };

  const dataPayment = React.useMemo<DataPayment[]>(
    () =>
      loanRepayments?.splice(0, 5).map((a: any) => {
        return {
          amount: `N ${numberWithCommas(a?.amount)} `,
          interest: `${a?.interest}`,
          due_date: `${
            a?.date_completed ? moment(a?.date_completed).format("ll") : "-"
          }`,
          date_completed: `${
            a?.date_completed ? moment(a?.date_completed).format("ll") : "-"
          }`,
          status: <Button> {a?.status} </Button>,
        };
      }),
    [loanRepayments]
  );

  const columnsPayment = [
    {
      Header: "Loan amount",
      accessor: "amount",
    },

    {
      Header: "Loan started",
      accessor: "interest",
    },
    {
      Header: "Due date",
      accessor: "due_date",
    },
    {
      Header: "Date completed",
      accessor: "date_completed",
    },

    {
      Header: "Payment status",
      accessor: "status",
    },
  ];

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <div className="border-b border-gray-600 pb-6 mb-6 flex items-center justify-between px-28">
            <div>
              {" "}
              Loan #{loanDetail?.loan_reference} - &#8358;{" "}
              {numberWithCommas(loanDetail?.wallet_balance || 0)}{" "}
            </div>
            <div className="flex">
              <div className="flex mr-4 ">
                <img src="/icons/payout.svg" />
                <p className="ml-2">Crash loan</p>
              </div>
              <div className="flex mr-4">
                <img src="/icons/payout.svg" />
                <p className="ml-2">Go to purchase</p>
              </div>
              <div className="flex">
                <img src="/icons/payout.svg" />
                <p className="ml-2">Visit store</p>
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
                        &#8358; {numberWithCommas(loanDetail?.amount) || 0}
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
                      <p className="text-sm">Interest (%) </p>
                      <p className="text-lg">
                        {loanDetail?.interest || 0} %/ mo
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
                      <p className="text-sm">Due</p>
                      <p className="text-lg">
                        {moment(loanDetail?.due_date).format("ll") || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" lg:w-1/4 w-full h-32 mb-6 pl-4">
                <div className="h-full rounded-lg relative overflow-hidden bg-apace-black opacity-95 p-4">
                  <div className="absolute top-0 left-0 w-full h-full  ">
                    <img
                      src={order?.store_logo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p
                    className="absolute bottom-0 left-0 text-2xl font-medium m-3 "
                    style={{ zIndex: 100 }}
                  >
                    {order?.store}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg my-4"> Purchase </p>
              {loanRepayments ? (
                <Table
                  data={dataPayment ? dataPayment : []}
                  columns={columnsPayment ? columnsPayment : []}
                />
              ) : null}
            </div>

            <div>
              <p className="text-lg my-4"> Repayment schedule </p>
              {loanRepayments ? (
                <Table
                  data={dataPayment ? dataPayment : []}
                  columns={columnsPayment ? columnsPayment : []}
                />
              ) : null}
            </div>
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default withAuth(PaymentDetail);
