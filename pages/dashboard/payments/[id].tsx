import type { NextPage } from "next";
import Container from "../../../components/container";
import DashboardLayout from "../../../components/dashboard/layout";
import { useDispatch } from "react-redux";
import React, { ReactNode, useEffect, useState } from "react";
import router from "next/router";
import { background } from "../../../utils/background";
import moment from "moment";
import Button from "../../../components/button";
import Table from "../../../components/dashboard/table";
import withAuth from "../../../route/with-auth";
import { numberWithCommas } from "../../../utils/formatNumber";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";
import Link from "next/link";
import { openModalAndSetContent } from "../../../store/actions/modal/modalActions";
import Liquidate from "../../../components/dashboard/modal/liquidate";

const PaymentDetail: NextPage = () => {
  const dispatch = useDispatch();
  const loanId = router.query.id;

  const [oneLoan, setOneLoan] = useState<any>();
  const [tableRowRepaymentSchedule, setTableRowRepaymentSchedule] =
    useState<any>();
  const loanDetail = oneLoan?.loan_detail;
  const order = oneLoan?.order;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const fetchOneLoan = async (loanId: any) => {
    try {
      dispatch(LoadingStart());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/loan/${loanId}/detail`,
        { headers: headersRequest }
      );
      setOneLoan(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  type DataPayment = {
    amount: ReactNode;
    interest: string;
    due_date: string;
    date_completed: string;
    status: ReactNode;
  };

  const dataPayment = () => {
    const tempArr: DataPayment[] = [];
    oneLoan?.loan_repayments?.forEach((a: any) => {
      tempArr.push({
        amount: <p> &#8358; {numberWithCommas(a?.amount)} </p>,
        interest: `${a?.interest} %`,
        due_date: `${a?.due_date ? moment(a?.due_date).format("ll") : "-"}`,
        date_completed: `${
          a?.date_completed ? moment(a?.date_completed).format("ll") : "-"
        }`,
        status: <Button> {a?.status} </Button>,
      });
    });
    return tempArr;
  };

  const columnsPayment = [
    {
      Header: "Amount",
      accessor: "amount",
    },

    {
      Header: "Interest",
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

  useEffect(() => {
    fetchOneLoan(loanId);
  }, []);

  useEffect(() => {
    setTableRowRepaymentSchedule(dataPayment());
  }, [oneLoan?.loan_repayments]);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <div className=" overflow-x-auto">
            <div className="min-w-lg lg:min-w-max max-h-screen border-b border-gray-600 pb-6 mb-6 flex items-center lg:justify-between lg:px-28 px-10 ">
              <div className="mr-4">
                Loan #{loanDetail?.loan_reference} - &#8358;
                {numberWithCommas(loanDetail?.wallet_balance || 0)}
              </div>
              <div className="flex">
                <div
                  className="flex mr-4 cursor-pointer"
                  onClick={() =>
                    dispatch(
                      openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <Liquidate
                              id={loanDetail?.id}
                              amount={loanDetail?.amount}
                            />
                          </>
                        ),
                      })
                    )
                  }
                >
                  <img src="/icons/payout.svg" />
                  <p className="ml-2">Crash loan</p>
                </div>
                <Link href="/dashboard/purchases">
                  <a className="flex mr-4">
                    <img src="/icons/payout.svg" />
                    <p className="ml-2">Go to purchase</p>
                  </a>
                </Link>
                <Link href="/dashboard">
                  <a className="flex">
                    <img src="/icons/payout.svg" />
                    <p className="ml-2">Visit store</p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <Container>
            <div className="flex lg:flex-row  flex-col flex-wrap">
              <div className=" lg:w-1/4 w-full h-32 mb-6 lg:pl-4 pl-0">
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
              <div className=" lg:w-1/4 w-full h-32 mb-6 lg:pl-4 pl-0">
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
              <div className=" lg:w-1/4 w-full h-32 mb-6 lg:pl-4 pl-0">
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
              <div className=" lg:w-1/4 w-full h-32 mb-6 lg:pl-4 pl-0">
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

            {/* <div>
              <p className="text-lg my-4"> Purchase </p>
              {tableRowRepaymentSchedule ? (
                <Table
                  data={
                    tableRowRepaymentSchedule ? tableRowRepaymentSchedule : []
                  }
                  columns={columnsPayment ? columnsPayment : []}
                />
              ) : null}
            </div> */}

            <div>
              <p className="text-lg my-4"> Repayment schedule </p>
              {tableRowRepaymentSchedule ? (
                <Table
                  data={
                    tableRowRepaymentSchedule ? tableRowRepaymentSchedule : []
                  }
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
