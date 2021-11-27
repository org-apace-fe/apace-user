import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopDealsStores } from "../../../store/actions/apaceStore.action";
import { background } from "../../../utils/background";
import Button from "../../button";
import { DashboardTopDealstore } from "../dashboard-top-deals";
import Link from "next/link";
import router from "next/router";
import {
  fetchAllLoansDue,
  fetchAllLoansStatistics,
} from "../../../store/actions/payment.action";

const OverviewPayment = () => {
  const dispatch = useDispatch();

  const stores = useSelector((state: any) => state.stores);
  const loading = useSelector((state: any) => state.loading);

  const allTopDealsStores = stores.topDealsStores?.items;

  const loanStatistics = useSelector((state: any) => state.payment);

  const stats = loanStatistics?.allLoansStatistics?.data;

  useEffect(() => {
    dispatch(getAllTopDealsStores());
    dispatch(fetchAllLoansStatistics());
  }, []);
  return (
    <div className="flex lg:flex-row flex-col ">
      <div className="lg:w-7/12 w-full mr-4">
        <div className="flex justify-between items-center">
          <div className="text-xl">Payments</div>{" "}
          <Button onClick={() => router.push("/dashboard/payments")}>
            Go to Payments
          </Button>
        </div>
        {/* Payments */}
        <div className="flex lg:flex-row flex-col flex-wrap">
          <div className=" lg:w-1/2 w-full h-40 mb-6 pr-4">
            <div
              className="relative  h-full rounded-lg p-4"
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/payout.svg" />
                <div className="ml-2">
                  <p className="text-sm">Total loans due</p>
                  <p className="text-lg">N {stats?.total_loan_due} </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/2 w-full h-40 mb-6 pl-4">
            <div
              className="relative  h-full rounded-lg p-4 "
              style={{ background: background.apacegray4 }}
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
          <div className=" lg:w-1/2 w-full h-40 mb-6 pr-4">
            <div
              className="relative  h-full rounded-lg p-4"
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/lending-limit.svg" />
                <div className="ml-2">
                  <p className="text-sm">Total payments made</p>
                  <p className="text-lg"> N {stats?.total_payment_made} </p>
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
        {/* Payments */}
      </div>
      <div className="lg:w-5/12 w-full">
        <div className="flex justify-between items-center">
          <div className="text-xl ml-2">Top deals</div>{" "}
          <Button onClick={() => router.push("/dashboard/payments")}>
            View all
          </Button>
        </div>
        <div className="flex flex-wrap">
          <DashboardTopDealstore items={allTopDealsStores} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default OverviewPayment;
