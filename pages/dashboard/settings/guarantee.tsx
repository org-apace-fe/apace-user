import { NextPage } from "next";
import DashboardLayout from "../../../components/dashboard/layout";
import withAuth from "../../../route/with-auth";
import { useDispatch } from "react-redux";
import SettingsLayout from "../../../components/dashboard/settings/layout";
import { useEffect, useState } from "react";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";
import isEmpty from "is-empty";
import moment from "moment";

const SettingsGuarantee: NextPage = () => {
  const dispatch = useDispatch();
  const [guarantors, setGuarantors] = useState<any[]>();

  const fetchGuarantors = async () => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headersRequest = {
        Authorization: `Bearer ${token}`,
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      dispatch(LoadingStart());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verification/guarantors`,
        { headers: headersRequest }
      );
      setGuarantors(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  useEffect(() => {
    fetchGuarantors();
  }, []);

  return (
    <div>
      <DashboardLayout>
        <div className="relative bg-apace-black text-white min-h-full py-8 overflow-hidden text-sm ">
          <SettingsLayout>
            <>
              <div className="flex">
                <p className="mr-1"> Guaranteeing </p>
                <img src="/icons/settings/info-outlined.svg" />
              </div>
              <div className="flex items-baseline flex-wrap">
                {isEmpty(guarantors) ? (
                  <p className="mt-4">
                    You’re not guaranteeing anyone on Apace yet. When you do,
                    they’ll show up here.
                  </p>
                ) : (
                  <>
                    {guarantors?.map((guarantor) => {
                      <div className="w-1/3">
                        <div className="w-20 h-20 mr-4 my-4 rounded-full overflow-hidden">
                          <img
                            src={guarantor?.customer_avatar}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <h1> Name </h1>
                        <p className="font-black text-base mb-5">
                          {guarantor?.customer_first_name}{" "}
                          {guarantor?.customer_last_name}{" "}
                        </p>

                        <h1> Email </h1>
                        <p className="font-black text-base mb-5">
                          {guarantor?.customer_email}
                        </p>

                        <h1> Expires </h1>
                        <p className="font-black text-base mb-5">
                          {" "}
                          {moment(guarantor?.expiry_date).format("LL")}{" "}
                        </p>
                      </div>;
                    })}
                  </>
                )}
              </div>
            </>
          </SettingsLayout>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default SettingsGuarantee;
