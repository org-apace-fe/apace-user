import axios from "axios";
import { LoadingStart, LoadingStop } from "./loader/loaderActions";

export const fetchAllLoans = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/loan/all`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_ALL_LOANS",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};

export const fetchAllLoansDue = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/loan/due`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_ALL_LOANS_DUE",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};

export const fetchAllLoansStatistics = () => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/loan/statistics`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_ALL_LOANS_STATISTICS",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};

export const fetchSingleLoan = (loanId: any) => async (dispatch: any) => {
  dispatch(LoadingStart());
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headersRequest = {
      Authorization: `Bearer ${token}`,
      "auth-key": `${process.env.NEXT_PUBLIC_ENV_AUTH_KEY}`,
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENV_API_AUTH_URL}/api/v1/customer/loan/${loanId}/detail`,
      { headers: headersRequest }
    );

    const response = res?.data;

    dispatch({
      type: "SET_ONE_LOAN",
      payload: res?.data,
    });

    if (response) dispatch(LoadingStop());
  } catch (error) {
    dispatch(LoadingStop());
  }
};
