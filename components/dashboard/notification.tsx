import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotifications } from "../../store/actions/notification.action";
import { background } from "../../utils/background";
import isEmpty from "is-empty";
import moment from "moment";

const Notification = () => {
  const dispatch = useDispatch();

  const notif = useSelector((state: any) => state.notification);

  const allNotifications = notif.allNotifications.data;

  useEffect(() => {
    dispatch(fetchAllNotifications());
  }, []);

  return (
    <div
      className=" rounded-lg overflow-hidden"
      style={{
        background: background.apacegray3,
      }}
    >
      <div
        className="flex justify-between py-4 px-4"
        style={{
          background: background.apacegray2,
        }}
      >
        <span>Notifications</span>
        <div className="text-apace-orange-light">Mark as read</div>
      </div>
      {!isEmpty(allNotifications) ? (
        <div className="p-4 ">
          <div className="relative ">
            {allNotifications?.map((notif: any) => (
              <div className="flex justify-between mb-4">
                <div>
                  <div className="flex">
                    <img
                      src={`/icons/${notif?.read ? "unread" : "read"}.svg`}
                    />
                    <p className="text-sm ml-2"> {notif?.subject} </p>
                  </div>
                  <p className="text-xs">{notif?.message}</p>
                </div>
                <p className="text-sm">
                  {" "}
                  {moment(notif?.date_created).fromNow()}{" "}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-4">
          <img src="/icons/success.svg" />
          <div> You are all good</div>
        </div>
      )}

      <div
        className=" flex flex-col justify-center items-center py-4"
        style={{
          background: background.apacegray2,
        }}
      >
        <Link href="/dashboard/notifications">
          <a> See all</a>
        </Link>
      </div>
    </div>
  );
};

export default Notification;
