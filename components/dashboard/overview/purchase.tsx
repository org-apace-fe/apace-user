import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopDealsStores } from "../../../store/actions/apaceStore.action";
import { background } from "../../../utils/background";
import Button from "../../button";
import { DashboardTopDealstore } from "../dashboard-top-deals";
import Link from "next/link";
import { numberWithCommas } from "../../../utils/formatNumber";

const OverviewPurchase = ({ miscellaneous }: any) => {
  const dispatch = useDispatch();

  const stores = useSelector((state: any) => state.stores);
  const allTopDealsStores = stores.topDealsStores?.items;
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    dispatch(getAllTopDealsStores());
  }, []);
  return (
    <div className="flex lg:flex-row flex-col">
      <div className="lg:w-7/12 w-full mr-4">
        <div className="flex justify-between items-center">
          <div className="text-xl">Purchases</div>{" "}
          <Button>Go to Purchases</Button>
        </div>
        {/* Payments */}
        <div className="flex flex-wrap">
          <div className=" lg:w-1/2 w-full h-40 mb-6 lg:pr-2 pr-0">
            <div
              className="relative  h-full rounded-lg p-4 "
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/revenue.svg" />
                <div className="ml-4">
                  <p className="text-sm">Total amount spent</p>
                  <p className="text-lg ">
                    &#8358;{" "}
                    {numberWithCommas(miscellaneous?.total_amount_spent)}
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
                <img src="/icons/cart.svg" />
                <div className="ml-2">
                  <p className="text-sm">Total items purchased</p>
                  <p className="text-lg">
                    {" "}
                    {miscellaneous?.total_items_purchased}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:w-1/2 w-full h-40 mb-6 lg:pr-2 pr-0 ">
            <div
              className="relative  h-full rounded-lg p-4 "
              style={{ background: background.apacegray4 }}
            >
              <div className="flex">
                <img src="/icons/category.svg" />
                <div className="ml-4">
                  <p className="text-sm">Most purchased category</p>
                  <p className="text-lg ">
                    {" "}
                    {miscellaneous?.most_purchased_category}{" "}
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
          <div className="text-xl ml-2 my-5">Recently visited</div>{" "}
        </div>
        <div className="flex flex-wrap">
          <DashboardTopDealstore items={allTopDealsStores} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default OverviewPurchase;
