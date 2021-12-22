import type { NextPage } from "next";
import React, { ReactNode, useState } from "react";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import Button from "../../../components/button";
import { background, ColorButton } from "../../../utils/background";
import PaginationTable from "../../../components/dashboard/table/pagination-table";
import { PaymentAction } from "../../../components/dashboard/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import withAuth from "../../../route/with-auth";
import { numberWithCommas } from "../../../utils/formatNumber";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";

const PaymentsAll: NextPage = () => {
  const dispatch = useDispatch();

  const [loans, setLoans] = useState<any>();
  const [loansStatistics, setLoansStatistics] = useState<any>();
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
    loans?.items.forEach((a: any) => {
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
    fetchAllLoansStatistics();
  }, []);

  useEffect(() => {
    setTableRow(dataPayment());
  }, [loans]);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <h1 className="text-lg mb-4">All payments due</h1>
            <div className="flex lg:flex-row flex-col ">
              <div className="lg:w-full w-full">
                <div className="flex lg:flex-row flex-col flex-wrap">
                  <div className=" lg:w-1/3 w-full h-32 mb-6 lg:pr-2 pr-0">
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
                            {numberWithCommas(loansStatistics?.total_loan_due)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" lg:w-1/3 w-full h-32 mb-6 lg:pl-2 pl-0">
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
                            {numberWithCommas(
                              loansStatistics?.total_all_time_loan
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" lg:w-1/3 w-full h-32 mb-6 lg:pl-4 pl-0">
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
                            &#8358;{" "}
                            {numberWithCommas(
                              loansStatistics?.total_payment_made
                            )}{" "}
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
                {loans?.items ? (
                  <PaginationTable
                    data={tableRow ? tableRow : []}
                    columns={columnsPayment ? columnsPayment : []}
                    tablePage={loans?.page && loans?.page}
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

export default withAuth(PaymentsAll);
