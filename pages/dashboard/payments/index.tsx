import type { NextPage } from "next";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import Button from "../../../components/button";
import { background, ColorButton } from "../../../utils/background";
import Table from "../../../components/dashboard/table";
import { PaymentAction } from "../../../components/dashboard/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import router from "next/router";
import Loader from "../../../components/loader";
import withAuth from "../../../route/with-auth";
import { numberWithCommas } from "../../../utils/formatNumber";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";
import isEmpty from "is-empty";

const Payments: NextPage = () => {
  const dispatch = useDispatch();

  const [loans, setLoans] = useState<any>();
  const [loansDue, setLoansDue] = useState<any>();
  const [loansStatistics, setLoansStatistics] = useState<any>();
  const [miscellaneousStatistics, setMiscellaneousStatistics] = useState<any>();
  const [tableRow, setTableRow] = useState<any[]>();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const loader = useSelector((state: any) => state.loader);
  const loaderOpened = loader.LoaderOpened;

  type DataPayment = {
    amount: ReactNode;
    date_created: string;
    date_completed: string;
    status: ReactNode;
    actions: ReactNode;
  };

  const dataPayment = () => {
    const tempArr: DataPayment[] = [];
    loans?.items.slice(0, 5).forEach((a: any) => {
      tempArr.push({
        amount: <p> &#8358; {numberWithCommas(a?.amount)} </p>,
        date_created: `${moment(a?.date_created).format("ll")}`,
        date_completed: `${
          a?.date_completed ? moment(a?.date_completed).format("ll") : "-"
        }`,
        status: (
          <Button className={ColorButton(a?.status)}> {a?.status} </Button>
        ),
        actions: <PaymentAction id={a?.id} amount={a?.amount} />,
      });
    });
    return tempArr;
  };

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

  const fetchAllLoans = () => {
    dispatch(LoadingStart());
    axios
      .get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/loan/all`,
        { headers: headersRequest }
      )
      .then((res) => {
        setLoans(res?.data?.data);
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

  const fetchAllLoansDue = async () => {
    try {
      dispatch(LoadingStart());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/loan/due`,
        { headers: headersRequest }
      );
      setLoansDue(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  const fetchAllLoansStatistics = async () => {
    try {
      dispatch(LoadingStart());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/loan/statistics`,
        { headers: headersRequest }
      );
      setLoansStatistics(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  useEffect(() => {
    fetchAllLoans();
    fetchMiscellaneousStatistics();
    fetchAllLoansDue();
    fetchAllLoansStatistics();
  }, []);

  useEffect(() => {
    setTableRow(dataPayment());
  }, [loans]);

  console.log(!isEmpty(loans?.items), loans?.items);

  return (
    <>
      <div>
        <DashboardLayout>
          {loansStatistics && miscellaneousStatistics && loans ? (
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
                        {loansDue?.items?.map((loan: any) => (
                          <div className="relative lg:w-1/2 w-full lg:h-64 h-auto mb-6 lg:pr-3 pr-0">
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
                        <div className=" lg:w-1/2 w-full h-32 mb-6 lg:pr-2 pr-0">
                          <div
                            className="relative  h-full rounded-lg p-4 "
                            style={{ background: background.apacegray6 }}
                          >
                            <div className="flex">
                              <img src="/icons/revenue.svg" />
                              <div className="ml-4">
                                <p className="text-sm">Total due</p>
                                <p className="text-lg text-apace-orange-light">
                                  &#8358;{" "}
                                  {numberWithCommas(
                                    miscellaneousStatistics?.total_loans_due
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" lg:w-1/2 w-full h-32 mb-6 lg:pl-4 pl-0">
                          <div
                            className="relative  h-full rounded-lg p-4"
                            style={{ background: background.apacegray6 }}
                          >
                            <div className="flex">
                              <img src="/icons/crash.svg" />
                              <div className="ml-2">
                                <p className="text-sm">
                                  Total current loan amount
                                </p>
                                <p className="text-lg">
                                  {" "}
                                  &#8358;{" "}
                                  {numberWithCommas(
                                    miscellaneousStatistics?.total_current_loan
                                  )}{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" lg:w-1/2 w-full h-32 mb-6 lg:pr-2 pr-0">
                          <div
                            className="relative  h-full rounded-lg p-4 "
                            style={{ background: background.apacegray6 }}
                          >
                            <div className="flex">
                              <img src="/icons/crash.svg" />
                              <div className="ml-4">
                                <p className="text-sm">Total all time loans</p>
                                <p className="text-lg text-apace-orange-light">
                                  &#8358;{" "}
                                  {numberWithCommas(
                                    loansStatistics?.total_all_time_loan
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" lg:w-1/2 w-full h-32 mb-6 lg:pl-4 pl-0">
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
                                    miscellaneousStatistics?.total_payment_made
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
                                    miscellaneousStatistics?.current_credit_limit
                                  )}{" "}
                                </p>
                              </div>
                            </div>
                            <Link href="/dashboard/settings/credit-limit">
                              <div className="absolute bottom-4 cursor-pointer right-4 flex">
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

                    {!isEmpty(loans?.items) ? (
                      <Table
                        data={tableRow ? tableRow : []}
                        columns={columnsPayment ? columnsPayment : []}
                      />
                    ) : (
                      <div
                        className="flex justify-center h-56 rounded-lg items-center "
                        style={{ background: background.apacegray3 }}
                      >
                        No payment history yet !
                      </div>
                    )}
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

export default Payments;
