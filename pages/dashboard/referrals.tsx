import React from "react";
import type { NextPage } from "next";
import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";
import { background } from "../../utils/background";
import Table from "../../components/dashboard/table";
import {
  InstagramIcon,
  LinkednIcon,
  TwitterIcon,
} from "../../components/icons/social-media";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllReferrals,
  fetchReferralsActivities,
  fetchReferralsStatistics,
} from "../../store/actions/user.action";
import { useEffect } from "react";
import { Column } from "react-table";
import PaginationTable from "../../components/dashboard/table/pagination-table";
import Loader from "../../components/loader";
import withAuth from "../../route/with-auth";

const Referrals: NextPage = () => {
  const referrals = useSelector((state: any) => state.auth);
  const loader = useSelector((state: any) => state.loader);
  const loaderOpened = loader.LoaderOpened;

  const allReferrals = referrals?.referrals?.data;
  const allReferallsPage = allReferrals?.page;
  const referralActivities = referrals?.referralActivities?.data;
  const referallsActivitiesPage = referralActivities?.page;
  const referralStatistics = referrals?.referralStatistics?.data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllReferrals());
    dispatch(fetchReferralsStatistics());
    dispatch(fetchReferralsActivities());
  }, []);

  type DataReferral = {
    customer_name: string;
    total_point: string;
  };

  const dataReferral = React.useMemo<DataReferral[]>(
    () =>
      allReferrals?.items?.map((a: any) => {
        return {
          customer_name: `${a?.customer_name} `,
          total_point: `${a?.total_point} points`,
        };
      }),
    [allReferrals]
  );

  const columnsReferral = [
    {
      Header: "Your referrals",
      columns: [
        {
          Header: "Name",
          accessor: "customer_name",
        },

        {
          Header: "Referral earnings",
          accessor: "total_point",
        },
      ],
    },
  ];

  type DataReferralActivities = {
    customer_id: number;
    item_name: string;
    point_used: number;
    discount: number;
    point_balance: number;
  };

  const dataReferralActivities = React.useMemo<DataReferralActivities[]>(
    () =>
      referralActivities?.items.map((a: any) => {
        return {
          item_name: `${a?.item_name} `,
          point_used: `${a?.point_used} points `,
          discount: `${a?.discount}% off`,
          point_balance: `${a?.point_balance} points `,
        };
      }),
    [referralActivities]
  );

  const columnsReferralActivities = [
    {
      Header: "Referral activity",
      columns: [
        {
          Header: "Items",
          accessor: "item_name",
        },

        {
          Header: "Point used",
          accessor: "point_used",
        },
        {
          Header: "Discount",
          accessor: "discount",
        },

        {
          Header: "Point balance",
          accessor: "point_balance",
        },
      ],
    },
  ];

  console.log(dataReferralActivities, dataReferral);

  return (
    <div>
      <DashboardLayout>
        {!loaderOpened && dataReferralActivities && dataReferral ? (
          <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
            <Container>
              <div>
                <h1 className="text-lg mb-4">Referrals</h1>
                <div className="flex lg:flex-row flex-col ">
                  <div className="lg:w-8/12 w-full mr-4">
                    {/* Payments */}
                    <div className="flex lg:flex-row  flex-col flex-wrap">
                      <div className=" lg:w-1/2 w-full h-32 mb-6 pl-4">
                        <div
                          className="relative  h-full rounded-lg p-4"
                          style={{ background: background.apacegray6 }}
                        >
                          <div className="flex">
                            <img src="/icons/payout.svg" />
                            <div className="ml-2">
                              <p className="text-sm">
                                Current available points
                              </p>
                              <p className="text-lg">
                                {referralStatistics?.current_available_point ||
                                  0}{" "}
                                Points
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
                              <p className="text-sm">All time points earned</p>
                              <p className="text-lg">
                                {referralStatistics?.all_time_earned_point || 0}{" "}
                                points
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
                              <p className="text-sm"># of shoppers referred</p>
                              <p className="text-lg">
                                {referralStatistics?.number_of_customer_referred ||
                                  0}{" "}
                                shoppers
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
                              <p className="text-sm">Points used</p>
                              <p className="text-lg">
                                {" "}
                                {referralStatistics?.point_used || 0} points
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Payments */}
                  </div>
                  <div className="lg:w-4/12 w-full">
                    <div className="flex lg:flex-row flex-col flex-wrap">
                      <div className=" lg:w-full w-full h-auto mb-6 pr-2">
                        <div
                          className="relative h-full rounded-lg p-4 "
                          style={{ background: background.apacegray6 }}
                        >
                          <div className="h-10 w-10 mx-auto mt-2">
                            <img src="/icons/reward-illustration.png" />
                          </div>
                          <div className="text-sm text-center pt-4">
                            Refer a friend
                          </div>

                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="flex bg-gray-600 px-2 py-2 rounded-full ">
                              <p className="pr-2"> ADE23DRAX </p>
                              <img src="/icons/copy.svg" />
                            </div>
                          </div>
                          <div className="flex flex-col justify-center items-center m-1">
                            <div className="flex  mt-4 lg:mt-0 mb-2 ">
                              <div>
                                <InstagramIcon />
                              </div>
                              <div className="ml-8">
                                <LinkednIcon />
                              </div>

                              <div className="ml-8">
                                <TwitterIcon />
                              </div>
                            </div>
                          </div>

                          <div className="relative flex flex-col items-center justify-center p-4">
                            <div className="flex bg-gray-600 px-3 py-1 rounded-full ">
                              <p className="text-xs pr-2">
                                apace.com/referralcode/ade23drax
                              </p>
                              <img src="/icons/copy.svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-lg">
                <div>
                  <div className="flex ">
                    <div className="w-5/12 mr-4 ">
                      <PaginationTable
                        data={dataReferral ? dataReferral : []}
                        columns={columnsReferral ? columnsReferral : []}
                        tablePage={allReferallsPage && allReferallsPage}
                      />
                    </div>
                    <div className="w-7/10 flex-1 ">
                      <PaginationTable
                        data={
                          dataReferralActivities ? dataReferralActivities : []
                        }
                        columns={
                          columnsReferralActivities
                            ? columnsReferralActivities
                            : []
                        }
                        tablePage={
                          referallsActivitiesPage && referallsActivitiesPage
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        ) : (
          <Loader />
        )}
      </DashboardLayout>
    </div>
  );
};

export default withAuth(Referrals);
