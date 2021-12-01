import type { NextPage } from "next";
import React, { ReactNode } from "react";
import Link from "next/link";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import Button from "../../../components/button";
import { background, ColorButton } from "../../../utils/background";
import Table from "../../../components/dashboard/table";
import { PaymentAction } from "../../../components/dashboard/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllLoans,
  fetchAllLoansDue,
  fetchAllLoansStatistics,
} from "../../../store/actions/payment.action";
import moment from "moment";
import router from "next/router";
import Loader from "../../../components/loader";
import withAuth from "../../../route/with-auth";
import { numberWithCommas } from "../../../utils/formatNumber";
import { fetchMiscelaneousStatistics } from "../../../store/actions/user.action";

const Payments: NextPage = () => {
  const dispatch = useDispatch();

  const payment = useSelector((state: any) => state.payment);

  const allLoans = payment?.allLoans?.data;

  const allLoansDue = payment?.allLoansDue?.data;

  const stats = payment?.allLoansStatistics?.data;

  const miscellaneousStats = useSelector((state: any) => state.auth);

  const miscellaneous = miscellaneousStats?.miscellaneousStatistics?.data;

  const loader = useSelector((state: any) => state.loader);
  const loaderOpened = loader.LoaderOpened;

  type DataPayment = {
    amount: ReactNode;
    date_created: string;
    date_completed: string;
    status: ReactNode;
    actions: ReactNode;
  };

  const dataPayment = React.useMemo<DataPayment[]>(
    () =>
      allLoans?.items?.splice(0, 5).map((a: any) => {
        return {
          amount: <p> &#8358; {numberWithCommas(a?.amount)} </p>,
          date_created: `${moment(a?.date_created).format("ll")}`,
          date_completed: `${
            a?.date_completed ? moment(a?.date_completed).format("ll") : "-"
          }`,
          status: (
            <Button className={ColorButton(a?.status)}> {a?.status} </Button>
          ),
          actions: <PaymentAction id={a?.id} />,
        };
      }),
    [allLoans]
  );

  const columnsPayment = [
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
  ];

  useEffect(() => {
    dispatch(fetchAllLoans());
    dispatch(fetchAllLoansDue());
    dispatch(fetchAllLoansStatistics());
    dispatch(fetchMiscelaneousStatistics());
  }, []);

  return (
    <>
      <div>
        <DashboardLayout>
          {!loaderOpened && dataPayment ? (
            <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
              <Container>
                <div
                  className="relative p-5 rounded-xl"
                  style={{ background: background.apacegray3 }}
                >
                  <h1 className="text-lg mb-4">All payments due</h1>
                  <div className="flex lg:flex-row flex-col ">
                    <div className="lg:w-6/12 w-full mr-4">
                      {/* Payments */}
                      <div className="flex lg:flex-row flex-col flex-wrap">
                        {allLoansDue?.items?.map((loan: any) => (
                          <div className="relative lg:w-1/2 w-full lg:h-64 h-auto mb-6 pr-3">
                            <div
                              className="relative  h-full rounded-lg p-4 "
                              style={{ background: background.apacegray6 }}
                            >
                              <div className="absolute top-4 right-4">
                                <PaymentAction id={loan?.id} />
                              </div>

                              <div className="flex border-b border-gray-600 pb-8">
                                <img src="/icons/payout.svg" />
                                <div className="ml-4  ">
                                  <p className="text-sm">Amount due</p>
                                  <p className="text-lg text-apace-orange-light">
                                    N {numberWithCommas(loan?.principal_amount)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center mt-6">
                                <div className="lg:w-1/2 w-full mb-5">
                                  <p className="text-sm">Loan amount</p>
                                  <p>N {numberWithCommas(loan?.amount)}</p>
                                </div>
                                <div className="lg:w-1/2 w-full mb-5">
                                  <p className="text-sm">Interest (%)</p>
                                  <p> {loan?.interest} % / mo </p>
                                </div>
                                <div className="lg:w-1/2 w-full">
                                  <p className="text-sm">Due</p>
                                  <p> {moment(loan?.due_date).format("ll")} </p>
                                </div>
                                <div className="lg:w-1/2 w-full">
                                  <p className="text-sm">Store</p>
                                  <p> {loan?.store_name} </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Payments */}
                    </div>
                    <div className="lg:w-6/12 w-full">
                      <div className="flex lg:flex-row flex-col flex-wrap">
                        <div className=" lg:w-1/2 w-full h-32 mb-6 pr-2">
                          <div
                            className="relative  h-full rounded-lg p-4 "
                            style={{ background: background.apacegray6 }}
                          >
                            <div className="flex">
                              <img src="/icons/payout.svg" />
                              <div className="ml-4">
                                <p className="text-sm">Total due</p>
                                <p className="text-lg text-apace-orange-light">
                                  &#8358;{" "}
                                  {numberWithCommas(
                                    miscellaneous?.total_loans_due
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" lg:w-1/2 w-full h-32 mb-6 pl-4">
                          <div
                            className="relative  h-full rounded-lg p-4"
                            style={{ background: background.apacegray6 }}
                          >
                            <div className="flex">
                              <img src="/icons/payout.svg" />
                              <div className="ml-2">
                                <p className="text-sm">
                                  Total current loan amount
                                </p>
                                <p className="text-lg">
                                  {" "}
                                  &#8358;{" "}
                                  {numberWithCommas(
                                    miscellaneous?.total_current_loan
                                  )}{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" lg:w-1/2 w-full h-32 mb-6 pr-2">
                          <div
                            className="relative  h-full rounded-lg p-4 "
                            style={{ background: background.apacegray6 }}
                          >
                            <div className="flex">
                              <img src="/icons/receipt.svg" />
                              <div className="ml-4">
                                <p className="text-sm">Total all time loans</p>
                                <p className="text-lg text-apace-orange-light">
                                  &#8358;{" "}
                                  {numberWithCommas(stats?.total_all_time_loan)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" lg:w-1/2 w-full h-32 mb-6 pl-4">
                          <div
                            className="relative  h-full rounded-lg p-4"
                            style={{ background: background.apacegray6 }}
                          >
                            <div className="flex">
                              <img src="/icons/lending-limit.svg" />
                              <div className="ml-2">
                                <p className="text-sm">
                                  Total payments made acr...
                                </p>
                                <p className="text-lg">
                                  {" "}
                                  &#8358;{" "}
                                  {numberWithCommas(
                                    miscellaneous?.total_payment_made
                                  )}{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" lg:w-1/2 w-full h-32 mb-6 ">
                          <div
                            className="relative  h-full rounded-lg p-4"
                            style={{ background: background.apacegray6 }}
                          >
                            <div className="flex">
                              <img src="/icons/lending-limit.svg" />
                              <div className="ml-2">
                                <p className="text-sm">Current credit limit</p>
                                <p className="text-lg">
                                  {" "}
                                  &#8358;{" "}
                                  {numberWithCommas(
                                    miscellaneous?.current_credit_limit
                                  )}{" "}
                                </p>
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
                </div>

                <div className="mt-8 text-lg">
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="text-xl">Payment history</div>{" "}
                      <Button
                        onClick={() => router.push(`/dashboard/payments/all`)}
                      >
                        View all
                      </Button>
                    </div>
                    <Table
                      data={dataPayment ? dataPayment : []}
                      columns={columnsPayment ? columnsPayment : []}
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
    </>
  );
};

export default withAuth(Payments);
