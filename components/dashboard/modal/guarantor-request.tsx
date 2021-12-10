import Button from "../../button";
import { background } from "../../../utils/background";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/actions/modal/modalActions";
import TextArea from "../../text-area";
import Input from "../../input";
import { useState } from "react";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";
import { fetchUserProfile } from "../../../store/actions/user.action";
import { openToastAndSetContent } from "../../../store/actions/toast/toastActions";

const GuarantorRequest = () => {
  const dispatch = useDispatch();

  const initialState = {
    identifier: "",
    message: "",
  };
  const [guarantorMessage, setGuarantorMessage] = useState<any>(initialState);

  const handleChange = (e: any) => {
    setGuarantorMessage({
      ...guarantorMessage,
      [e.target.name]: e.target.value,
    });
  };

  const { identifier, message } = guarantorMessage;

  const sendguarantorRequest = async () => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headersRequest = {
        Authorization: `Bearer ${token}`,
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };
      dispatch(LoadingStart());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/verification/guarantor/request/send`,
        guarantorMessage,
        { headers: headersRequest }
      );
      dispatch(fetchUserProfile());
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

  const onSubmit = (e: any) => {
    e.preventDefault();
    sendguarantorRequest();
  };

  return (
    <div className="text-white">
      <div
        className="py-3 pl-4 text-lg text-left "
        style={{ background: background.apacegray2 }}
      >
        <h1> Guarantor Request </h1>
      </div>
      <form onSubmit={onSubmit}>
        <div
          style={{ background: background.apacegray3 }}
          className="px-4 py-4"
        >
          <Input
            className="w-full mb-4"
            placeholder="Email address *"
            name="identifier"
            value={identifier}
            onChange={handleChange}
            required
          />
          <TextArea
            placeholder="Message *"
            className=" w-full"
            name="message"
            value={message}
            onChange={handleChange}
            required
          />
        </div>
        <div
          className="flex justify-center"
          style={{ background: background.apacegray2 }}
        >
          <Button className="mx-2  w-3/5 bg-apace-orange-dark border-apace-orange-dark text-black">
            Send Request{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GuarantorRequest;
