import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import { numberWithCommas } from "../../../utils/formatNumber";

const CreditLimitComponent = () => {
  const dispatch = useDispatch();
  const [miscellaneousStatistics, setMiscellaneousStatistics] = useState<any>();

  const fetchMiscellaneousStatistics = async () => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headersRequest = {
        Authorization: `Bearer ${token}`,
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      dispatch(LoadingStart());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/miscellaneous/statistics/general`,
        { headers: headersRequest }
      );
      setMiscellaneousStatistics(res?.data?.data);
      dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };

  useEffect(() => {
    fetchMiscellaneousStatistics();
  }, []);
  return (
    <div>
      <div className="flex items-center ">
        <div className="w-8 h-8">
          <img
            className="w-full h-full"
            src="/icons/settings/credit-limit.svg"
          />
        </div>
        <div className="ml-2">
          <p className="text-base">Credit limit</p>
          <p className="text-base text-green-600 ">
            &#8358;
            {numberWithCommas(miscellaneousStatistics?.current_credit_limit)}
          </p>
        </div>
      </div>

      <p className="text-xs my-4 ">
        Apace Plus allows a credit limit of N200,000.00.
      </p>

      <p className="text-apace-orange-light text-xs underline my-2">
        Increase limit
      </p>
    </div>
  );
};

export default CreditLimitComponent;
