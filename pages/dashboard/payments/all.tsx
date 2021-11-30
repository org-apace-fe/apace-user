import type { NextPage } from "next";
import React, { ReactNode } from "react";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import Button from "../../../components/button";
import { background } from "../../../utils/background";
import Table from "../../../components/dashboard/table";
import PaginationTable from "../../../components/dashboard/table/pagination-table";
import { PaymentAction } from "../../../components/dashboard/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllLoans,
  fetchAllLoansDue,
  fetchAllLoansStatistics,
} from "../../../store/actions/payment.action";
import { Column } from "react-table";
import moment from "moment";
import router from "next/router";

const Payments: NextPage = () => {
  const dispatch = useDispatch();

  const payment = useSelector((state: any) => state.payment);

  const allLoans = payment?.allLoans?.data;

  const page = allLoans?.page;

  console.log(page);

  const stats = payment?.allLoansStatistics?.data;

  type DataPayment = {
    amount: number;
    date_created: string;
    date_completed: string;
    status: ReactNode;
    actions: ReactNode;
  };

  const dataPayment = React.useMemo<DataPayment[]>(
    () =>
      allLoans?.items?.map((a: any) => {
        return {
          amount: `${a?.amount} `,
          date_created: `${moment(a?.date_created).format("ll")}`,
          date_completed: `${
            a?.date_completed ? moment(a?.date_completed).format("ll") : "-"
          }`,
          status: <Button> {a?.status} </Button>,
          actions: <PaymentAction id={a?.id} />,
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
        accessor: "date_created",
      },
      {
        Header: "Date completed",
        accessor: "date_completed",
      },

      {
        Header: "Payment status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchAllLoans());
    dispatch(fetchAllLoansDue());
    dispatch(fetchAllLoansStatistics());
  }, []);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <h1 className="text-lg mb-4">All payments due</h1>
            <div className="flex lg:flex-row flex-col ">
              <div className="lg:w-full w-full">
                <div className="flex lg:flex-row flex-col flex-wrap">
                  <div className=" lg:w-1/3 w-full h-32 mb-6 pr-2">
                    <div
                      className="relative  h-full rounded-lg p-4 "
                      style={{ background: background.apacegray6 }}
                    >
                      <div className="flex">
                        <img src="/icons/payout.svg" />
                        <div className="ml-4">
                          <p className="text-sm">Total due</p>
                          <p className="text-lg text-apace-orange-light">
                            N {stats?.total_loan_due}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" lg:w-1/3 w-full h-32 mb-6 pl-2">
                    <div
                      className="relative  h-full rounded-lg p-4 "
                      style={{ background: background.apacegray6 }}
                    >
                      <div className="flex">
                        <img src="/icons/receipt.svg" />
                        <div className="ml-4">
                          <p className="text-sm">Total all time loans</p>
                          <p className="text-lg text-apace-orange-light">
                            N {stats?.total_all_time_loan}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" lg:w-1/3 w-full h-32 mb-6 pl-4">
                    <div
                      className="relative  h-full rounded-lg p-4"
                      style={{ background: background.apacegray6 }}
                    >
                      <div className="flex">
                        <img src="/icons/lending-limit.svg" />
                        <div className="ml-2">
                          <p className="text-sm">Total payments made acr...</p>
                          <p className="text-lg">
                            {" "}
                            N {stats?.total_payment_made}{" "}
                          </p>
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
                  <div className="text-xl">Payment history</div>{" "}
                </div>
                {allLoans?.items ? (
                  <PaginationTable
                    data={dataPayment ? dataPayment : []}
                    columns={columnsPayment ? columnsPayment : []}
                    tablePage={page && page}
                  />
                ) : null}
              </div>
            </div>
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Payments;
