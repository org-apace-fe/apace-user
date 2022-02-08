import React from "react";
import { background } from "../../../utils/background";
import Button from "../../button";
import {
  LoadingStart,
  LoadingStop,
} from "../../../store/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../../store/actions/toast/toastActions";
import { closeModal } from "../../../store/actions/modal/modalActions";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  logoutUser,
} from "../../../store/actions/user.action";
import { useRouter } from "next/router";

function AddCard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headersRequest = {
    Authorization: `Bearer ${token}`,
    "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
  };

  const addCard = async () => {
    try {
      dispatch(LoadingStart());
      dispatch(closeModal());

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/saved-card/add`,
        {},
        { headers: headersRequest }
      );
      const cardData = res?.data?.data;

      if (cardData) {
        window.open(cardData?.payment_link, "_self");
      }
      dispatch(
        openToastAndSetContent({
          toastContent: res?.data?.message,
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      dispatch(fetchUserProfile());

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
    <div>
      <div
        className="flex flex-col justify-center h-56 rounded-lg items-center px-4 "
        style={{ background: background.apacegray3 }}
      >
        <p>
          You currently have no cards, Kindly add your card before advancing{" "}
        </p>
        <div className="btn-group">
          <Button
            onClick={() => dispatch(logoutUser(router))}
            className="border-apace-orange-dark text-white  mr-2"
          >
            Log out
          </Button>
          <Button
            onClick={addCard}
            className=" bg-apace-orange-dark border-apace-orange-dark text-black"
          >
            Add Card +{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
