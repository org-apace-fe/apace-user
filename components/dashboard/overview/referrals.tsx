import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopDealsStores } from "../../../store/actions/apaceStore.action";
import { background } from "../../../utils/background";
import Button from "../../button";
import { DashboardTopDealstore } from "../dashboard-top-deals";
import Link from "next/link";

const OverviewReferrals = () => {
  const dispatch = useDispatch();

  const stores = useSelector((state: any) => state.stores);
  const loading = useSelector((state: any) => state.loading);

  const allTopDealsStores = stores.topDealsStores?.items;

  useEffect(() => {
    dispatch(getAllTopDealsStores());
  }, []);
  return (
    <div className="flex lg:flex-row flex-col">
      <div className="lg:w-7/12 w-full mr-4">
        <div className="flex justify-between items-center">
          <div className="text-xl">Referrals</div>{" "}
          <Button>Go to Referrals</Button>
        </div>
        {/* Payments */}
        <div className="flex flex-wrap">
          <div className=" lg:w-1/2 w-full h-40 mb-6 pr-2">
            <div
              className="relative  h-full rounded-lg p-4 "
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/refer-a-friend.svg" />
                <div className="ml-4">
                  <p className="text-sm">Current points earned</p>
                  <p className="text-lg ">65 points</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/2 w-full h-40 mb-6 pl-4">
            <div
              className="relative  h-full rounded-lg p-4"
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/refer-a-friend.svg" />
                <div className="ml-2">
                  <p className="text-sm">All time points</p>
                  <p className="text-lg"> 65 points </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/2 w-full h-40 mb-6 pr-2">
            <div
              className="relative  h-full rounded-lg p-4 "
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/users-referred.svg" />
                <div className="ml-4">
                  <p className="text-sm"># of users referred</p>
                  <p className="text-lg ">10 shoppers</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/2 w-full h-40 mb-6 pl-4">
            <div
              className="relative  h-full rounded-lg p-4"
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/refer-a-friend.svg" />
                <div className="ml-2">
                  <p className="text-sm">Points used</p>
                  <p className="text-lg"> 14 shoppers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Payments */}
      </div>
      <div className="lg:w-5/12 w-full">
        <div className="flex justify-between items-center">
          <div className="text-xl ml-2">Top Categories</div>{" "}
          <Button>View all</Button>
        </div>
        <div className="flex flex-wrap">
          <DashboardTopDealstore items={allTopDealsStores} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default OverviewReferrals;
