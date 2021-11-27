import axios from "axios";
import { LoadingStart, LoadingStop } from "./loading.action";

export const fetchAllPurchases = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/purchase/all`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_ALL_PURCHASES",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};

export const fetchAllPurchaseStatistics = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}​​/api​/v1​/customer​/purchase​/statistics`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_ALL_PURCHASES_STATISTICS",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};

export const fetchPurchaseCharts = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}​​​​/​api​/v1​/customer​/purchase​/charts`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_ALL_PURCHASE_CHARTS",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};
