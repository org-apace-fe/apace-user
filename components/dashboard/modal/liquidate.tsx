import Button from "../../button";
import { background } from "../../../utils/background";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/actions/modal/modalActions";

import axios from "axios";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../../store/actions/toast/toastActions";

type LiquidateProps = {
  id: number;
  amount: string;
};

const Liquidate = ({ id, amount }: Partial<LiquidateProps>) => {
  const dispatch = useDispatch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const LiquidateLoans = async () => {
    try {
      dispatch(LoadingStart());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/loan/${id}/liquidate`,
        { amount },
        { headers: headersRequest }
      );
      dispatch(
        openToastAndSetContent({
          toastContent: res?.data?.message,
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );

      dispatch(LoadingStop());
    } catch (error: any) {
      dispatch(
        openToastAndSetContent({
          toastContent: error?.response?.data?.message,
          toastStyles: {
            backgroundColor: "red",
          },
        })
      );
      dispatch(LoadingStop());
    }
  };

  return (
    <div className="text-white">
      <div
        className="py-3 pl-2 text-lg text-left "
        style={{ background: background.apacegray2 }}
      >
        <h1> Liquidate Loan </h1>
      </div>
      <div
        className="text-base py-4"
        style={{ background: background.apacegray3 }}
      >
        <p>
          {" "}
          Do you want to liquidate this loan before due date? This should free
          up more funds into your limit as well as help toward credit rating.{" "}
        </p>
        <p className="mt-3">
          If you proceed your card will be charged the entire amount due plus
          interest and this loan closed.
        </p>
      </div>
      <div
        className="flex justify-center"
        style={{ background: background.apacegray2 }}
      >
        <Button className="mx-2 w-full" onClick={() => dispatch(closeModal())}>
          Cancel{" "}
        </Button>
        <Button
          onClick={() => LiquidateLoans()}
          className="mx-2  w-full bg-apace-orange-dark border-apace-orange-dark text-black"
        >
          Proceed{" "}
        </Button>
      </div>
    </div>
  );
};

export default Liquidate;
