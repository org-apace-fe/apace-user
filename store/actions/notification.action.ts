import axios from "axios";
import { LoadingStart, LoadingStop } from "./loading.action";

export const fetchAllNotifications = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `https://apace-api-staging.azurewebsites.net/api/v1/customer/notification/all`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_ALL_NOTIFICATIONS",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};

export const readaNotifications =
  (notificationId: any) => async (dispatch: any) => {
    dispatch(LoadingStart());
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headersRequest = {
        Authorization: `Bearer ${token}`,
        "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
      };

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}​/api/v1/customer/notification/${notificationId}/read`,
        { headers: headersRequest }
      );

      const response = res?.data;

      //   dispatch({
      //     type: "READ_NOTIFICATION",
      //     payload: res?.data,
      //   });

      if (response) dispatch(LoadingStop());
    } catch (error) {
      dispatch(LoadingStop());
    }
  };
