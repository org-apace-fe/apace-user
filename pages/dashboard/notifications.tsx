import isEmpty from "is-empty";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/container";
import DashboardLayout from "../../components/dashboard/layout";
import { fetchAllNotifications } from "../../store/actions/notification.action";
import Link from "next/link";
import withAuth from "../../route/with-auth";
import { NextPage } from "next";

const Notifications: NextPage = () => {
  const dispatch = useDispatch();

  const notif = useSelector((state: any) => state.notification);

  const allNotifications = notif.allNotifications.data;

  useEffect(() => {
    dispatch(fetchAllNotifications());
  }, []);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden ">
          <Container>
            <h1 className="text-2xl">Notifications</h1>

            <div className="mt-6 pb-4 border-b border-gray-600">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox bg-black mr-6 "
                />
                <span className="ml-2 mr-6">Mark all as read</span>
                <img src="/icons/settings.svg" />
              </label>
            </div>

            {!isEmpty(allNotifications) ? (
              <div>
                <div className="relative ">
                  {allNotifications?.map((notif: any) => (
                    <>
                      <div className="mb-6 py-4 hover:bg-apace-gray ">
                        <div className="flex justify-between items-center ">
                          <div className="flex">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox bg-black mr-3 "
                              />
                              <span className="w-2 h-2 bg-apace-orange-dark rounded-full "></span>
                            </label>
                            <div>
                              <span className="ml-2 mr-6">
                                {" "}
                                {notif?.subject}{" "}
                              </span>
                              <p className="ml-2 mr-6 text-sm">
                                {notif?.message}{" "}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm">
                            {moment(notif?.date_created).format("lll")}
                          </p>
                        </div>

                        <Link href="/dashboard/notifications">
                          <a className="text-apace-orange-dark ml-10 mt-2">
                            Take action{" "}
                          </a>
                        </Link>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-4">
                <img src="/icons/success.svg" />
                <div> You are all good</div>
              </div>
            )}
          </Container>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default withAuth(Notifications);
