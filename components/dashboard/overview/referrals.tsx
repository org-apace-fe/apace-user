import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopDealsStores } from "../../../store/actions/apaceStore.action";
import { background } from "../../../utils/background";
import Button from "../../button";
import { DashboardTopDealstore } from "../dashboard-top-deals";
import router from "next/router";

const OverviewReferrals = ({ miscellaneous }: any) => {
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
          <Button onClick={() => router.push("/dashboard/referrals")}>
            Go to Referrals
          </Button>
        </div>
        {/* Payments */}
        <div className="flex flex-wrap">
          <div className=" lg:w-1/2 w-full h-40 mb-6 lg:pr-2 pr-0">
            <div
              className="relative  h-full rounded-lg p-4 "
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/refer-a-friend.svg" />
                <div className="ml-4">
                  <p className="text-sm">Current points earned</p>
                  <p className="text-lg ">
                    {" "}
                    {miscellaneous?.current_points_earned || 0} Points
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/2 w-full h-40 mb-6 lg:pl-2 pl-0 ">
            <div
              className="relative  h-full rounded-lg p-4"
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/refer-a-friend.svg" />
                <div className="ml-2">
                  <p className="text-sm">All time points</p>
                  <p className="text-lg">
                    {" "}
                    {miscellaneous?.all_time_points || 0} points{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/2 w-full h-40 mb-6 lg:pr-2 pr-0">
            <div
              className="relative  h-full rounded-lg p-4 "
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/users-referred.svg" />
                <div className="ml-4">
                  <p className="text-sm"># of users referred</p>
                  <p className="text-lg ">
                    {" "}
                    {miscellaneous?.number_of_referred_customers || 0} shoppers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/2 w-full h-40 mb-6 lg:pl-2 pl-0">
            <div
              className="relative  h-full rounded-lg p-4"
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/refer-a-friend.svg" />
                <div className="ml-2">
                  <p className="text-sm">Points used</p>
                  <p className="text-lg">
                    {" "}
                    {miscellaneous?.points_used || 0} points
                  </p>
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
          <Button onClick={() => router.push("/dashboard/referrals")}>
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

export default OverviewReferrals;
