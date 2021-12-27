import Button from "../../button";
import { background } from "../../../utils/background";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/actions/modal/modalActions";
import Input from "../../input";
import TextArea from "../../text-area";
import { useEffect, useState } from "react";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../../store/actions/toast/toastActions";

type AskRefundProps = {
  id: number;
  reference: any;
};

const AskRefund = ({ id, reference }: Partial<AskRefundProps>) => {
  const dispatch = useDispatch();
  const initialState = { message: "", referenceId: "" };
  const [data, setData] = useState(initialState);
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const askForRefund = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(LoadingStart());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/purchase/refund/log-request`,
        {
          reference: referenceId,
          message,
        },
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

  useEffect(() => {
    setData({
      ...data,
      referenceId: reference,
    });
  }, []);

  const { message, referenceId } = data;
  return (
    <div className="text-white">
      <div
        className="py-3 pl-4 text-lg text-left "
        style={{ background: background.apacegray2 }}
      >
        <h1> Ask for a refund </h1>
      </div>
      <div
        className="text-sm py-4 px-4 text-left border-b border-gray-600 "
        style={{ background: background.apacegray3 }}
      >
        <p className="text-base">Shoot us an email</p>
        <p className="mt-3">
          Send us an email explaining your reason for a refund request and our
          support team will get back to you
        </p>
      </div>
      <form onSubmit={askForRefund}>
        <div
          style={{ background: background.apacegray3 }}
          className="px-4 py-4"
        >
          <TextArea
            placeholder="Message *"
            className=" w-full"
            name="message"
            value={message}
            onChange={handleChange}
          />
          <Input
            className="w-full mb-8"
            placeholder="Ref ID *"
            name="referenceId"
            value={referenceId}
            onChange={handleChange}
            readOnly={true}
          />
        </div>
        <div
          className="flex justify-center"
          style={{ background: background.apacegray2 }}
        >
          <Button
            className="mx-2 w-full"
            onClick={() => dispatch(closeModal())}
          >
            Cancel{" "}
          </Button>
          <Button className="mx-2  w-full bg-apace-orange-dark border-apace-orange-dark text-black">
            Send{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AskRefund;
