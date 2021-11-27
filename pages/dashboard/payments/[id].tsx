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

const PaymentDetail: NextPage = () => {
  const dispatch = useDispatch();
  const loanId = router.query.id;

  const loan = useSelector((state: any) => state.payment);

  const loanDetail = loan?.oneLoan?.data?.loan_detail;
  const loanRepayments = loan?.oneLoan?.data?.loan_repayments;
  console.log(loanDetail);

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
          amount: `${a?.amount} `,
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
    []
  );

  const columnsPayment = React.useMemo<Column<DataPayment>[]>(
    () => [
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
    ],
    []
  );

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <div className="border-b border-gray-600 pb-6 mb-6 flex items-center justify-between px-28">
            <div>
              {" "}
              Loan #{loanDetail?.loan_reference} - N{" "}
              {loanDetail?.wallet_balance}{" "}
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
                        {loanDetail?.amount || 0} Points
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
                <div
                  className="relative  h-full rounded-lg p-4"
                  style={{ background: background.apacegray6 }}
                >
                  <div className="flex">
                    <img src="/icons/payout.svg" />
                    <div className="ml-2">
                      <p className="text-sm">Loan amount</p>
                      <p className="text-lg">
                        {loanDetail?.amount || 0} Points
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg my-4"> Purchase </p>
              {loanRepayments ? (
                <Table data={dataPayment} columns={columnsPayment} />
              ) : null}
            </div>

            <div>
              <p className="text-lg my-4"> Repayment schedule </p>
              {loanRepayments ? (
                <Table data={dataPayment} columns={columnsPayment} />
              ) : null}
            </div>
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default PaymentDetail;
